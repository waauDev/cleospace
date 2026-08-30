# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Single user: the creator (William), building this as a personal project for their own use only. Not designed for other users, teams, or a public audience.

## Product Purpose

CleoSpace is a personal, voice-first space where the user has spoken conversations with an AI. Sessions are structured using an "interview" mechanic (a topic/question flow, a live voice call, then generated feedback and a score), but the underlying purpose is not job-interview prep for a market of candidates — it's a private space for the user to talk through whatever is on their mind. Success is having a responsive AI to talk to out loud and a history of past sessions to look back on.

## Positioning

The "interview" is the container, not the goal: real-time spoken back-and-forth with an AI (not a text Q&A bank), reformulated by the user as their personal space rather than as competitive job-interview-prep software. The user confirmed this framing directly ("es la entrevista, reformulada como 'espacio'") — future work should keep the interview/session mechanic rather than inventing new topic modes unless the user asks.

## Operating Context

- Single authenticated user (Firebase auth: sign-in/sign-up).
- Home page lists past sessions ("Your Interviews") and available/latest sessions ("Take Interviews") as cards with cover art, date, and score.
- A session is a live voice call via the Vapi SDK (`@vapi-ai/web`); after the call ends, feedback and a score are generated and attached to that session.
- Each session/card carries a type (Behavioral / Technical / Mixed) and a tech-stack tag list, inherited from the original interview-prep template this project was built from.
- Copy is currently a mix of English UI strings and informal Spanish copy (e.g. "Desahógate...", "No tienes entrevistas realizadas") — language consistency is not yet decided; do not standardize on one language without asking.

## Capabilities and Constraints

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 with a custom dark-first token theme (`app/globals.css`).
- Firebase (`firebase`, `firebase-admin`) for auth and data.
- Voice AI via `@vapi-ai/web` (Vapi); text/feedback generation via the `ai` SDK with `@ai-sdk/google`.
- UI primitives from shadcn/Radix (`components/ui/*`), `lucide-react` icons, `sonner` toasts, `react-hook-form` + `zod` for forms.
- Undecided: whether the product will ever add conversation modes beyond the interview/session mechanic (currently: no plan to).

## Brand Commitments

- Confirmed product name: **CleoSpace**.
- The codebase still carries leftover placeholders from the template this was built from: the interviewer is displayed as "Fella AI" in [Agent.tsx](components/Agent.tsx), and the logo's alt text reads "MockMate Logo" in [layout.tsx](app/(root)/layout.tsx). The user confirmed these are template leftovers to be reconciled to "CleoSpace," not intentional secondary brand names.

## Evidence on Hand

- Existing assets: `public/logo.svg`, `public/robot.png`, `public/ai-avatar.png`, `public/user-avatar.png`, `public/pattern.png` (background), `public/covers/*` (random interview cover art).
- No testimonials, case studies, pricing, or external evidence exist or apply — this is a personal, non-commercial project; do not fabricate any.

## Product Principles

1. This is a single-user personal tool, not a product being designed for scale, growth, or multiple audiences — don't add multi-tenant, marketing, or acquisition-oriented design.
2. Voice-first, real-time conversation is the core mechanism; the interface should support a live spoken call, not read like a text-based quiz.
3. The "interview" framing is the deliberate container for a personal, open-ended space — keep this mechanic rather than introducing new topic modes without the user's direction.
4. Session history and feedback are meaningful to the user (they revisit past sessions and scores) — preserve and surface this rather than treating it as disposable.
