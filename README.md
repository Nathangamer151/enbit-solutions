# Enbit Solutions

MVP website for Enbit Solutions, built with Vite, React, TypeScript, Tailwind CSS, shadcn/ui, and Supabase.

## Local Development

This workspace includes a local Node.js runtime at:

`C:\Users\nnesb\OneDrive\Documents\Enbit\.tools\node-v22.22.3-win-x64`

Use these commands from the project folder:

```sh
npm install
npm run dev
npm run build
npm run lint
npm test
```

If `npm` is not available globally on this machine, use the bundled runtime directly:

```sh
C:\Users\nnesb\OneDrive\Documents\Enbit\.tools\node-v22.22.3-win-x64\npm.cmd run dev
```

## Environment

The local app reads Supabase settings from `.env.local`.

Required variables:

```sh
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Server-side variables for Vercel deployment:

```sh
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
RESEND_API_KEY=
RESEND_FROM_EMAIL=Enbit Website <onboarding@resend.dev>
NEWSLETTER_NOTIFY_TO=enbit.solutions@gmail.com
```

`OPENAI_API_KEY` powers the Enbot LLM endpoint. `RESEND_API_KEY` sends an email notification when someone subscribes to the newsletter.

## Deployment

The hosted Lovable project URL is:

https://lovable.dev/projects/e7e9e684-aed8-4c11-afab-8da26df3ea5f

The published site is:

https://enbit-solutions.lovable.app/

For static hosts such as Netlify or Vercel:

- Build command: `npm run build`
- Publish/output directory: `dist`
- SPA routing is configured through `public/_redirects` and `vercel.json`.

Recommended deployment: Vercel. This project includes `/api/chat` and `/api/newsletter` serverless functions, which Vercel will deploy automatically alongside the static site.
