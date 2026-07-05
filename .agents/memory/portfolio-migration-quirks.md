---
name: Portfolio migration quirks
description: Missing project preview images, icon library gotchas, and testing-timing pitfalls found in the Harry Fishert portfolio (artifacts/portfolio)
---

When a project's `image` field in `experience.tsx` points to `/projects/*.png` but the file doesn't exist under `public/projects/`, the preview renders as a broken image with no console error in the app itself — always check `ls public/projects/` against the referenced filenames before assuming a CSS/render bug.

**Why:** Two client projects (Dr. Mario Sánchez, My Memorial Forever) had code referencing screenshot files that were never actually created during a prior migration, so nothing was broken in the render logic — the assets were just absent.

**How to apply:** For deployed demo sites with missing preview screenshots, use the `screenshot` tool (`type: external_url`) against the live `demo` URL to generate a fresh preview image instead of trying to reconstruct one from scratch.

`react-icons/si` (Simple Icons set) does not export `SiOpenai` — there is no generic "AI" simple-icon. Use a `lucide-react` icon (e.g. `Sparkles`) as a fallback for generic/AI-labeled tech tags instead.

The `.migration-backup/artifacts/*` workflows are a stale pre-existing backup directory with missing `node_modules` — they always fail on `vite`/`esbuild` not found and are unrelated to the live app. Ignore them; only `artifacts/*` workflows matter.

Direct `fetch()` to seeklogo.com image URLs returns 503 (hotlink protection), even with browser-like `User-Agent`/`Referer` headers. For official/brand logos, prefer scraping the organization's own homepage HTML for a `logo*.png`/`.svg` asset path and fetching that directly, over using image-search result URLs from seeklogo/kindpng-style mirrors.

## Testing-agent carousel timing artifact
Both the Experience and Education sections use auto-advancing carousels (Framer Motion `AnimatePresence mode="wait"`, `setInterval` every 5-7s) with pagination dots that call `setCurrentSlide(index)` directly.

The Playwright `runTest()` subagent repeatedly and consistently reports "clicked dot N but content shows a different slide" on BOTH of these independent carousels, even with explicit fast waits and single-click test plans. Manual verification via the `screenshot` tool (fresh page load) shows the correct slide/content every time.

**Why:** This is very likely a `runTest` subagent timing/snapshot artifact when interacting with fast auto-advancing `AnimatePresence` carousels, not a real app bug — the same "mismatch" pattern reproduced identically across two unrelated components, ruling out a shared code bug.

**How to apply:** When testing these carousels, prefer a fresh `screenshot` (app_preview, no clicks) to confirm the *initial* slide renders correctly, since pagination-click verification via `runTest` is unreliable here. Don't sink more time chasing "slide mismatch" bug reports from `runTest` on these carousels without also cross-checking via a plain screenshot.
