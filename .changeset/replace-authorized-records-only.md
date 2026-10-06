---
'@mastra/core': patch
'@mastra/libsql': patch
'@mastra/pg': patch
---

Knowledge record replacement now retires only the exact records the caller was authorized to remove. Each retired record is version-checked and the access epoch is verified in the same transaction, so records added or access changed after authorization can no longer be deleted by a replacement.
