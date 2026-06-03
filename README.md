# Realwave Enablement Portal

Internal seller enablement portal for **ePlus Realwave** sellers. Built with Next.js 15 (App Router), TypeScript, and Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

One-command deploy (requires [Vercel CLI](https://vercel.com/docs/cli)):

```bash
npx vercel --prod
```

Or connect the repo in the [Vercel dashboard](https://vercel.com/new) — zero config needed.

## Project Structure

```
app/
  layout.tsx          # Root layout with nav + footer
  page.tsx            # Dashboard home
  library/page.tsx    # Content Library
  weekly-brief/page.tsx
components/
  content/            # Library grid, cards, modal
  layout/             # Header nav
  ui/                 # Button, Badge, Input, Dialog
  weekly-brief/
content/              # Future MDX / HTML one-pagers
lib/
  content.ts          # ContentItem data array
  utils.ts
```

## Environment Variables (Phase 2)

No env vars required for Phase 1. When Clerk auth is added:

```env
# .env.local (Phase 2 — not required yet)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_ALLOWED_EMAIL_DOMAINS=eplus.com
```

Copy `.env.example` to `.env.local` when ready.

## Adding Content

Edit `lib/content.ts` to add or update enablement assets. Each `ContentItem` supports:

- `title`, `description`, `type`, `category[]`
- `keyMessage` + `highlights[]` for the detail modal
- `slug` for future detail pages / HTML one-pager links

The dashboard highlight is controlled by `HIGHLIGHT_ID` (currently `spatial-1`).

Future: drop HTML one-pagers into `content/` and reference via `slug`.

## Brand Colors

| Token | Hex |
|-------|-----|
| Navy (primary) | `#12498a` |
| Teal (accent) | `#00d4a6` |

## Phase 1 Notes

- No authentication — header displays "Internal Tool – Authorized ePlus Sellers Only"
- Weekly Brief is a mock workflow
- "Download PDF" and "Copy Link" patterns are in place for future wiring
