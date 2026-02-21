# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint (eslint-config-next with core-web-vitals + TypeScript rules)
npm run start    # Start production server (requires build first)
```

No test framework is configured yet.

## Architecture

Single-page Next.js 16 app using the App Router. The entire landing page lives in `app/page.tsx` — there are no additional routes or components files yet.

**Page structure** (`app/page.tsx`):
- Marked `"use client"` because it uses React state and refs
- Four sections rendered in sequence: Hero → Problem → Solution → Waitlist form → Bottom CTA
- The bottom CTA button scrolls back up to the waitlist form via a `useRef`

**Waitlist form**:
- Rider/Driver role toggle (radio buttons), plus name, email, phone fields
- `handleSubmit` currently only `console.log`s the payload — Supabase integration is the intended next step (see comment in code)
- On submit, flips `submitted` state to show a confirmation message

**Styling**: Tailwind CSS v4 (configured via `@tailwindcss/postcss` in `postcss.config.mjs`). Dark mode is supported via the `dark:` variant throughout.

**Fonts**: Geist Sans and Geist Mono loaded via `next/font/google` in `app/layout.tsx`, exposed as CSS variables `--font-geist-sans` and `--font-geist-mono`.
