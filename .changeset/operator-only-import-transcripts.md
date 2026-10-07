---
'@mastra/factory': patch
---

The Knowledge Imports view is now for host operators only. Importer status, run history, run errors and agentic import transcripts reflect what the importer can read rather than what the viewer can read, so returning them to any project reader could reveal content that reader cannot otherwise see.

By default, organization administrators are import operators. Set `importOperator` on a caller's Knowledge access profile to decide explicitly. Other callers receive `403` from the import routes, and the Imports tab explains that imports are visible to instance operators. Activity entries still link to their import run; following the link requires operator access.
