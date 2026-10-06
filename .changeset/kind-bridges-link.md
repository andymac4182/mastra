---
'@mastra/otel-bridge': patch
---

Fixed runs started with `tracingOptions.traceId` and `tracingOptions.parentSpanId` starting a new OpenTelemetry trace. They now continue the given trace as a child of the given span.
