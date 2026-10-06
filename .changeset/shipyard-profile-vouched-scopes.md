---
'@mastra/factory': patch
---

Knowledge access profiles can now vouch for existing scopes through `vouchedScopeAddresses`, and their root can be any existing scope the caller can read. The Shipyard access profile depends on this. Before, the route rejected it with `knowledge_profile_unavailable`, because its principal scopes and root were not listed in `baselineScopes`. Vouched scopes are resolved but never created; if any is missing, the profile is unavailable.
