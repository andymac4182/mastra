---
'@mastra/libsql': patch
---

Fixed explicit Knowledge activation on recognized experimental v1 schemas: the v1 tables are replaced, discarding their rows, inside the initialization transaction, while unknown schemas and unrelated data are preserved.
