# Inhouse Projects – Villas in Kochi landing page

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Where things live
- `src/lib/site.ts` – all copy and data: projects, comparison rows, tab details, map locations, contact numbers. Edit content here.
- `src/components/` – one component per section (Hero, Projects, CompareTable, ProjectDetails, WhyUs, LocationMaps, Closing, FloatingContact).
- `src/app/api/lead/route.ts` – lead endpoint. Validates, drops honeypot bots, emails the lead via Resend (`src/lib/lead-email.ts`) and/or POSTs JSON to `LEAD_WEBHOOK_URL`.
- `src/app/globals.css` – brand tokens (`@theme`) and button/field classes.

## Setup before going live
1. Copy `.env.example` to `.env.local` and set `RESEND_API_KEY`, `LEAD_TO_EMAIL` and `LEAD_FROM_EMAIL` so each lead is emailed via [Resend](https://resend.com) (reply-to is the visitor's email). The sender must be on a domain verified in Resend. Optionally also set `LEAD_WEBHOOK_URL` (CRM, Zapier, Google Apps Script…). With none of these set, leads are only logged on the server.
2. Set `NEXT_PUBLIC_SITE_URL` to the production URL (used for OG image URLs).
3. Brochures: put PDFs in `public/brochures/` and set `brochureUrl` on each project in `src/lib/site.ts`. Until then, brochure requests capture the lead and tell the visitor the team will send it.
4. Analytics: successful submits push `{ event: "lead_submit", form_location, project, intent }` to `window.dataLayer` for GTM. UTM params and gclid/fbclid are captured with each lead.
