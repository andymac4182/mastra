---
'@mastra/factory': patch
---

Agentic import transcripts in the Knowledge Imports view are now returned only to host operators. A transcript reflects everything the importer could read, so showing it to any project reader could reveal content that reader cannot otherwise see. Set `importOperator: true` on a caller's Knowledge access profile to include transcripts in import run details; other callers still see run status and their own authorized activity.
