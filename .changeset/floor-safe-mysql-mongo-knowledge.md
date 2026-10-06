---
'@mastra/mysql': patch
'@mastra/mongodb': patch
---

MySQL and MongoDB Knowledge storage keeps the existing `@mastra/core` peer range. With an older `@mastra/core`, the adapters still load, and Knowledge storage reports which core feature it needs instead of failing at import time.
