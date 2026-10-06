---
'@mastra/factory': patch
---

Fixed the Knowledge Imports view hiding importers bound to project-owned scopes. Imports bound to any readable scope the access profile vouches for under the project, such as a repository scope, now appear alongside project and current-thread imports. Other threads' imports stay hidden.
