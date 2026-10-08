---
'@mastra/core': patch
---

Reduced memory allocations during workflow and agent execution by creating each step writer only when the step uses it. Writing custom output and retry behavior remain unchanged.
