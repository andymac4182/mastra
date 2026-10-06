---
'@mastra/libsql': patch
'@mastra/pg': patch
---

Fixed Knowledge scope-restoration proposals being hidden from their approvers. A deleted scope is now judged visible by its parent memberships, so an approver who can read the parent can find and approve the restoration. Callers who can't read the parent still see nothing.
