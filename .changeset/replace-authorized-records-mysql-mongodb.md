---
'@mastra/mysql': patch
'@mastra/mongodb': patch
---

Knowledge record replacement on MySQL and MongoDB now retires only the exact, version-checked records the caller authorized and verifies the access epoch in the same transaction, matching the LibSQL and PostgreSQL adapters.
