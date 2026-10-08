---
'@mastra/core': patch
---

Reduced unnecessary memory allocations for agents with workspace tools. Workspaces now set up only enabled tools and skip tool setup when all tools are disabled. Per-tool `enabled` overrides and dynamic `enabled` functions continue to work as before.
