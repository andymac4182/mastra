---
'@mastra/core': patch
---

Knowledge access no longer escalates through grant chains. Only a scope the host vouches for passes a grant's full role. A scope you reach through another grant passes on at most the access you hold there, so a readonly or suggest share stays readonly or suggest on everything the shared scope owns or is granted, including its own self-owner grant.
