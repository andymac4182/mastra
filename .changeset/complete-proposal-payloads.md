---
'@mastra/core': patch
'@mastra/libsql': patch
'@mastra/pg': patch
---

Knowledge proposals are now visible only when the caller can read their complete payload, including embedded records and the nodes those records mention. Approval authority still makes a proposal visible without proposer-context access, but no longer exempts the caller from payload visibility. Single-proposal lookups and list cursors use the same current-state check as proposal lists.
