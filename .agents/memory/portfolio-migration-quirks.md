---
name: Portfolio migration quirks
description: Quirks and pre-existing issues discovered during the Harry Fishert portfolio Vercel→Replit migration.
---

# Portfolio Migration Quirks

**Why:** Documents what was pre-existing vs. introduced, so future agents don't try to "fix" things that were always broken, or re-migrate what's already done.

**How to apply:** Before touching admin, reviews, or social-link data flow, read this file.

## Pre-existing issues (do NOT treat as regressions)

- **Admin auth is client-side only** — `sessionStorage.setItem("adminAuth", "true")` with an email check. Any user can bypass via devtools. This was the original Vercel design. A real server-side session (using `SESSION_SECRET`) would be the proper fix.
- **Missing review management endpoints** — `GET /api/reviews` and `POST /api/reviews` exist; update/delete/approve do not. The `Settings` component in `artifacts/portfolio/src/components/settings.tsx` calls `reviewsStorage.updateReview`, `.deleteReview`, `.setApproved` which are not implemented in `lib/reviews-storage.ts`. Pre-existing breakage from the original app.
- **Social link data source conflict** — `PortfolioContext` loads social links from `/api/social-links` on mount, but admin edits in `Settings` write only to `localStorage`. Changes are not persisted to the backend. Pre-existing.
- **Duplicate keys in translations.ts** — `experience`, `all`, `currentSemester`, `projects` keys appear twice in both ES and EN objects. Vite warns but doesn't fail.

## Migration-specific notes

- `settings.tsx` was only in `.migration-backup/artifacts/portfolio/src/components/` — NOT in the pre-deletion `artifacts/portfolio/src/components/`. Must be copied manually from the backup.
- The migration backup registers duplicate artifacts (`.migration-backup/artifacts/api-server` etc.) when `createArtifact` is called — rename backup `package.json` name fields to avoid pnpm workspace conflicts.
- `"use client"` directives were stripped from all component files (Next.js-only, harmless in Vite).
- `@vercel/node` and `@neondatabase/serverless` were runtime dependencies in the original portfolio `package.json` — removed since the portfolio is a pure Vite frontend.
- The built-in Replit `DATABASE_URL` works without `NEON_DATABASE_URL` — `lib/db/src/index.ts` already falls back correctly.
