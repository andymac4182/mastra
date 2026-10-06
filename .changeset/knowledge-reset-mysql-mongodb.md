---
'@mastra/mysql': patch
'@mastra/mongodb': patch
---

Knowledge storage now supports an explicit Knowledge-only reset. When `init()` rejects an incompatible Knowledge schema, call `dangerouslyReset()` on the Knowledge domain to drop only Knowledge tables or collections, including the retired `mastra_knowledge_cursors`, and reinitialize. Threads, messages, and other storage stay untouched.
