---
'@mastra/core': patch
---

Added an opt-in workspace tools optimization that skips preparation when every tool is statically disabled. Enable it with tools: { enabled: false, experimentalSkipDisabledToolPreparation: true }. The option defaults to false and preserves per-tool enabled overrides and dynamic configuration.
