# Felix Tolero — Portfolio

Graphic designer and video editor based in Cebu City, working remotely.

Built with Next.js 16 on top of the Isak portfolio template.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Editing content

| What | Where |
|---|---|
| Profile, projects, services, experience, tools | `src/data/felix.ts` |
| YouTube case-study pages (`/work/<slug>`) | `src/data/cases.ts` |
| B3 Podcast episode and Shorts list | `src/data/b3.ts` |
| Styles added on top of the template | `src/app/felix.scss` |
| Images and videos | `public/felix/work/` |

## Contact form

There is no backend: a valid submission opens the visitor's email app.
Spam protection (in `src/components/sections/Contact.tsx`): the address is
assembled in the browser so it never appears in the HTML, plus a honeypot
field, a minimum fill time, a 10-minute cooldown, and message checks.
