---
'@mastra/mysql': patch
'@mastra/mongodb': patch
---

Knowledge import runs on MySQL and MongoDB now remove their lease and stored payload once a run finishes or is recovered, so finished imports no longer leave stale import state behind.
