---
'@mastra/core': patch
---

Knowledge access no longer escalates a readonly or suggest grant to owner when the shared scope owns itself. A scope's grant to itself now applies only to callers vouched as that scope; anyone reaching the scope through another grant gets that grant's role.
