# [Project name]

_Replace the heading above with the project's name, and this line with one sentence describing what this app does for users._

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Reviews now require moderation: `POST /api/reviews` always inserts with `approved: false`, regardless of what the client sends. A review only becomes public after being approved via the Telegram bot notification (button "✅ Aprobar"). There is no delete/approve control on the public website by design — control lives only in Telegram.
- Two backends implement review CRUD + Telegram notify/webhook in parallel and must be kept in sync: `artifacts/api-server` (Express, used by the Replit dev preview) and `api/index.ts` (Vercel serverless function, used by the published/production site). A change to one (new field, new action, new endpoint) needs the same change mirrored in the other.
- Telegram requires `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` as env vars. These are set as Replit secrets/env vars for the dev environment; when deploying to Vercel, the same two values must be added separately in the Vercel project's environment variables (Vercel doesn't read Replit secrets).
- The Telegram webhook (`setWebhook`) points to exactly one URL at a time. It's currently set to the Replit dev domain for testing. After publishing to Vercel, re-run `setWebhook` pointing to the production domain's `/api/telegram-webhook` endpoint, or approvals/deletes from Telegram won't reach production.
- After editing `artifacts/api-server` source, the workflow must be restarted — its dev command runs a one-shot `pnpm run build && pnpm run start`, it does not watch/rebuild automatically.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
