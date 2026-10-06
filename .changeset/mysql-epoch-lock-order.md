---
'@mastra/mysql': patch
---

Concurrent Knowledge scope deletes, scope restores, and proposal approvals that delete or restore nodes on MySQL now fail with a Knowledge conflict instead of a raw lock deadlock. These operations take the exclusive access-state lock before checking the access epoch.
