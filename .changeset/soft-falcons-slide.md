---
'@mastra/core': patch
---

Fixed unnecessary workspace tool construction for disabled tools. Grep and search schemas and AST availability checks now run only for enabled tools. Shared read tracking and write locks are created on demand, while per-tool overrides and dynamic configuration remain supported.
