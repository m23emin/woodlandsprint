# Woodlands Print

Next.js website for **Woodlands Print** — DTF transfers, gang sheets, custom shirts, and bulk apparel in North Houston.

## Features

- Gang sheet builder, mockup tool, blanks catalog, shopping cart
- Quote & contact forms with email notifications (Resend)
- Customer accounts (Supabase Auth) with quote tracking
- Admin panel for quote management and status emails
- Local SEO pages, JSON-LD structured data, GA4 analytics

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment variables**

   Copy `.env.example` to `.env.local` and fill in values:

   ```bash
   cp .env.example .env.local
   ```

   Required for quotes: `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL`  
   Required for admin: `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` (recommended)  
   Required for accounts + quote storage: Supabase keys (see below)

3. **Supabase** (optional but recommended)

   Run in Supabase SQL Editor, in order:

   - `supabase/schema.sql`
   - `supabase/schema-customers.sql`
   - `supabase/schema-quote-updates.sql`

   Create a **private** storage bucket named `quote-designs`.

   Add redirect URL in Supabase Auth: `https://www.woodlandsprint.com/auth/callback`

4. **Run locally**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## Deploy

Deploy to Vercel. Set the same environment variables in the Vercel project settings (Production).

Use `https://www.woodlandsprint.com` as `NEXT_PUBLIC_SITE_URL` for consistent SEO and email links.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — start production server
- `node scripts/fetch-ss-images.mjs` — fetch blank catalog images from S&S Activewear (requires API keys)

## Project structure

| Path | Purpose |
|------|---------|
| `app/` | Pages, API routes, components |
| `lib/` | Business logic, config, Supabase clients |
| `supabase/` | SQL schema migrations |
| `public/` | Static assets |
