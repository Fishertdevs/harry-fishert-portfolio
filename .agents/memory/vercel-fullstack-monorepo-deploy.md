---
name: Deploying pnpm monorepo (Vite + Express + Neon) fully on Vercel
description: How to configure vercel.json + a serverless entry so a Replit pnpm-workspace app (Vite frontend + Express API + Neon/drizzle db) deploys entirely on Vercel, and what only the user can fix in the Vercel dashboard.
---

## Rule
When a user wants frontend + API + DB all on Vercel (not Replit publishing) for a pnpm-workspace project structured like `artifacts/<web>` (Vite) + `artifacts/api-server` (Express) + `lib/db` (drizzle, source-only exports):
- Add a root-level `vercel.json` with `buildCommand` scoped to the frontend package (`pnpm --filter <pkg> run build`), `outputDirectory` pointing at its Vite `outDir`, and `rewrites` sending `/api/(.*)` to a single serverless function while falling back everything else to `/index.html` (SPA routing).
- Add a root-level `api/index.ts` that just does `export default app;` re-exporting the Express app's default export directly — Vercel's Node runtime accepts a plain `(req,res)` handler, and an Express app already satisfies that signature. No need for `serverless-http` or a rewritten Express instance.
- If the Vite config throws at module-eval time when required env vars (e.g. `PORT`, `BASE_PATH`) are missing, supply dummy values via `vercel.json`'s `build.env` — they're only needed to satisfy the config, not for correctness of a static build.

**Why:** This mirrors the "Express on Vercel" pattern and avoids introducing a second server framework or bundler step; it reuses the exact same Express app that runs in the Replit dev workflow.

## Things that CANNOT be fixed via repo files — must tell the user explicitly
- If the Vercel project was originally scaffolded via v0.dev/Next.js, its dashboard "Framework Preset" is stuck on Next.js and causes a build failure ("No Next.js version detected") no matter what `vercel.json` says. The user must manually change Framework Preset to "Other" in Vercel Project Settings.
- The user must confirm Root Directory is the repo root (not a subdirectory) so pnpm workspace resolution works.
- Any DB connection string (e.g. `NEON_DATABASE_URL`) must be added by the user directly in Vercel Project Settings → Environment Variables (Production/Preview/Development) — the agent cannot access the Vercel dashboard.
- Vercel only redeploys on a `git push` to the connected GitHub repo — local Replit commits sitting only on the Replit git remote won't trigger a Vercel build until pushed to `origin`.

## Stale TS project-reference builds
Editing a workspace package's schema/exports (e.g. `lib/db/src/schema`) can leave a stale `tsconfig.tsbuildinfo` / `dist/*.d.ts` for that package, making dependent packages' `tsc --noEmit` falsely report "has no exported member" even though the source is correct. Fix with `tsc --build <pkg-dir> --force` (or delete the `.tsbuildinfo`) rather than assuming the export is actually missing.
