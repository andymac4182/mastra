---
'@mastra/core': patch
'@mastra/observability': patch
---

Added a `parentSampled` option for starting a root span that continues a trace from another service. When it is `false`, the trace is not recorded, so an unsampled caller stays unsampled.
