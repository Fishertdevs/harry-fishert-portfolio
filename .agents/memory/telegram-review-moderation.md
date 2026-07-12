---
name: Telegram review moderation
description: How the Harry Fishert portfolio moderates reviews via a Telegram bot instead of WhatsApp/website controls, and setup gotchas encountered.
---

## Decision
User wanted WhatsApp-based moderation (approve/delete reviews from their phone, no delete control on the public site). Twilio (the only Replit WhatsApp-capable connector) was rejected — no budget for a paid plan. Settled on a free Telegram bot (Bot API) as the equivalent: inline "Aprobar"/"Eliminar" buttons on a message sent for every new review; the public site has no delete/approve UI at all.

**Why:** Telegram's Bot API is free with no business-account approval process (unlike WhatsApp Cloud API) and natively supports inline keyboard buttons, unlike plain WhatsApp text replies.

## Setup gotchas
- Bot tokens from @BotFather are case-sensitive. A user typing/pasting on mobile can get autocapitalized to all-lowercase by the keyboard, producing a token that looks plausible but returns `401 Unauthorized` from `getMe`/`getUpdates`. If a freshly-issued token 401s, suspect mangled casing before assuming the bot was deleted — ask the user to copy (not retype) it.
- To get a chat ID for a private bot conversation, the target user must message the bot first (e.g. `/start`), then `getUpdates` returns `message.chat.id`. There is no way to get it from the token alone.
- `getUpdates` returns `409 Conflict` once a webhook is registered via `setWebhook` — that's expected/correct, not an error to debug.

## editMessageText drops the inline keyboard
Calling Telegram's `editMessageText` without an explicit `reply_markup` clears any existing inline keyboard buttons on that message — it does not preserve them. If a bot edits a message's text after one button press (e.g. "approved") but wants a different button still available afterward (e.g. "delete" even after approval), it must explicitly re-send `reply_markup` with just the buttons that should remain, or an empty `inline_keyboard: []` to remove them all. Omitting it silently strips all buttons, which looks like "the button click did nothing" on the next tap.

## Environment split
This project ships two independent backends that must stay behaviorally in sync for any review/notification change: the Replit dev Express server (`artifacts/api-server`) and the Vercel serverless function (`api/index.ts`) used in production. `setWebhook` only points at one URL at a time — switch it when moving from dev testing to a real Vercel deploy, and duplicate `TELEGRAM_BOT_TOKEN`/`TELEGRAM_CHAT_ID` into Vercel's own env var settings (separate from Replit secrets).
