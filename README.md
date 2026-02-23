# CampusCabs — Landing Page

## Project Overview

CampusCabs is a student-focused rideshare app built for Penn State's State College campus. It's designed to be cheaper for riders and fairer for drivers by replacing the percentage-per-ride model used by Uber and Lyft with a flat driver subscription.

- **Riders** get lower prices because drivers aren't forced to inflate fares to cover platform fees.
- **Drivers** keep 80–100% of every fare (100% during the pilot) and drive on their own schedule.
- **Geographic focus:** State College, PA only — a tight zone built around the Penn State campus.

The landing page collects waitlist signups from both riders and drivers via a short form (name, email, phone), with separate flows and benefit messaging for each role. Submissions are stored in Supabase.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) — App Router, single-page |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/postcss` |
| Database / Backend | [Supabase](https://supabase.com) — Postgres + auto-generated REST API |
| Hosting | [Vercel](https://vercel.com) |
| Fonts | Geist Sans & Geist Mono via `next/font/google` |

## Environment Variables

Create a `.env.local` file in the `campuscabs-landing/` directory with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```
