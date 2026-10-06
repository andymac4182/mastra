import { resolveExportedSpanId } from '@mastra/core/observability';
import type { AnySpan } from '@mastra/core/observability';

/**
 * W3C trace fields carried in MCP request `_meta` (SEP-414).
 *
 * `tracestate` and `baggage` are passed through as opaque strings. Treat inbound
 * values, especially `baggage`, as untrusted observability data: never use them
 * for authentication or authorization.
 */
export interface MCPTraceContext {
  traceparent: string;
  tracestate?: string;
  baggage?: string;
}

/** `_meta` keys defined by the MCP specification for W3C trace propagation. */
const TRACEPARENT_META_KEY = 'traceparent';
const TRACESTATE_META_KEY = 'tracestate';
const BAGGAGE_META_KEY = 'baggage';

/**
 * Reads the W3C trace fields out of request metadata. Only string values are
 * accepted; a request without a `traceparent` carries no trace context.
 */
export function traceContextFromMeta(meta: Record<string, unknown> | undefined): MCPTraceContext | undefined {
  const traceparent = meta?.[TRACEPARENT_META_KEY];
  if (typeof traceparent !== 'string') return undefined;
  const tracestate = meta?.[TRACESTATE_META_KEY];
  const baggage = meta?.[BAGGAGE_META_KEY];
  return {
    traceparent,
    ...(typeof tracestate === 'string' ? { tracestate } : {}),
    ...(typeof baggage === 'string' ? { baggage } : {}),
  };
}

/** Projects a trace context onto the `_meta` keys the specification defines. */
export function traceContextToMeta(traceContext: MCPTraceContext): Record<string, string> {
  return {
    [TRACEPARENT_META_KEY]: traceContext.traceparent,
    ...(traceContext.tracestate !== undefined ? { [TRACESTATE_META_KEY]: traceContext.tracestate } : {}),
    ...(traceContext.baggage !== undefined ? { [BAGGAGE_META_KEY]: traceContext.baggage } : {}),
  };
}

/**
 * Request params without the W3C trace fields in `_meta`. A span that continues
 * the caller's trace already records them as its own trace and parent ids.
 */
export function withoutTraceContext(params: Record<string, unknown> | undefined): Record<string, unknown> | undefined {
  const meta = params?._meta as Record<string, unknown> | undefined;
  if (!traceContextFromMeta(meta)) return params;
  const {
    [TRACEPARENT_META_KEY]: _traceparent,
    [TRACESTATE_META_KEY]: _tracestate,
    [BAGGAGE_META_KEY]: _baggage,
    ...restMeta
  } = meta!;
  const { _meta, ...rest } = params!;
  return Object.keys(restMeta).length > 0 ? { ...rest, _meta: restMeta } : rest;
}

const TRACEPARENT_RE = /^([0-9a-f]{2})-([0-9a-f]{32})-([0-9a-f]{16})-([0-9a-f]{2})$/;

/** The span a `traceparent` names, and whether its trace is sampled. */
export interface RemoteParentSpan {
  traceId: string;
  spanId: string;
  sampled: boolean;
}

/** Parses a W3C `traceparent`. Malformed values and all-zero ids yield `undefined`. */
export function parseTraceparent(value: unknown): RemoteParentSpan | undefined {
  const match = typeof value === 'string' ? TRACEPARENT_RE.exec(value.trim()) : null;
  if (!match) return undefined;
  const [, version, traceId, spanId, flags] = match as unknown as [string, string, string, string, string];
  if (version === 'ff' || /^0+$/.test(traceId) || /^0+$/.test(spanId)) return undefined;
  return { traceId, spanId, sampled: (parseInt(flags, 16) & 1) === 1 };
}

/**
 * The trace context that makes `span` the parent of an outgoing request. A span
 * that is not recorded, or whose ids are not W3C-sized, propagates nothing. A
 * span hidden from exporters is replaced by its closest exported ancestor.
 */
export function traceContextFromSpan(span: AnySpan | undefined): MCPTraceContext | undefined {
  if (!span?.isValid) return undefined;
  const traceparent = `00-${span.traceId}-${resolveExportedSpanId(span)}-01`;
  return parseTraceparent(traceparent) ? { traceparent } : undefined;
}
