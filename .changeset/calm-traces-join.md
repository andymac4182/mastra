---
'@mastra/mcp': minor
---

Added trace propagation across MCP calls. A tool call an agent makes through `MCPClient` and the work an `MCPServer` does for it now share one trace, with no setup.

`MCPClient` sends the W3C `traceparent` of the tool call span with each tool call. `MCPServer` continues the trace of any request that carries a `traceparent`, in the request `_meta` or as an HTTP header, so callers that are not built with Mastra are linked too.

When the caller marks its trace as not sampled, the server does not trace the request. Set `followCallerSampling: false` to let the server's own sampling decide:

```ts
const server = new MCPServer({
  id: 'orders-server',
  name: 'Orders Server',
  version: '1.0.0',
  tools: { lookupOrder },
  followCallerSampling: false,
});
```

To send your own trace context, or none, keep using the `traceContext` option on the server definition in `MCPClient`.
