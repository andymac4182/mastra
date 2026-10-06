---
'@mastra/core': patch
---

`Knowledge.replaceRecord()` now fences the replacement on the node version it authorized, instead of re-reading the node after the capability checks.
