---
'@mastra/core': patch
'@mastra/memory': patch
---

Editing a Subconscious pin is now a single atomic Knowledge replacement: the new pin exists only if the original was retired, so a permission change during an edit can no longer duplicate or lose a pin. Added `Knowledge.replaceRecord()` for this single-record replacement. Retiring or restoring a Knowledge record now also requires access-management authority on every scope the record is stamped in, not only on its node's scopes.
