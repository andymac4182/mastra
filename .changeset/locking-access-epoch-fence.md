---
'@mastra/mysql': patch
'@mastra/mongodb': patch
---

Knowledge mutations on MySQL and MongoDB no longer commit under access that a concurrent grant change has just revoked. MySQL now reads the access epoch with a shared lock, and MongoDB writes to the access-state document, so a concurrent grant change either waits or makes the mutation fail with a conflict. This matches PostgreSQL.
