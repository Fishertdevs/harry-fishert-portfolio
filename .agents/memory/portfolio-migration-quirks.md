---
name: Portfolio migration quirks
description: Missing project preview images and icon library gotchas found in the Harry Fishert portfolio (artifacts/portfolio)
---

When a project's `image` field in `experience.tsx` points to `/projects/*.png` but the file doesn't exist under `public/projects/`, the preview renders as a broken image with no console error in the app itself — always check `ls public/projects/` against the referenced filenames before assuming a CSS/render bug.

**Why:** Two client projects (Dr. Mario Sánchez, My Memorial Forever) had code referencing screenshot files that were never actually created during a prior migration, so nothing was broken in the render logic — the assets were just absent.

**How to apply:** For deployed demo sites with missing preview screenshots, use the `screenshot` tool (`type: external_url`) against the live `demo` URL to generate a fresh preview image instead of trying to reconstruct one from scratch.

`react-icons/si` (Simple Icons set) does not export `SiOpenai` — there is no generic "AI" simple-icon. Use a `lucide-react` icon (e.g. `Sparkles`) as a fallback for generic/AI-labeled tech tags instead.
