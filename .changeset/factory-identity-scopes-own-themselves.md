---
'@mastra/factory': patch
---

Factory's built-in project and thread Knowledge scopes now own themselves instead of granting ownership to their parent organization or project. When Factory created a project scope first, the scope gave the organization owner access, so Subconscious curation in that project could not read it and failed to save captured knowledge.
