---
'@mastra/factory': patch
---

Fixed the Knowledge view returning 503 when an access profile lists a child scope before its parent on a fresh store. Missing profile scopes are now created parent-first.
