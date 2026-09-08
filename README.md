# Felix Mari Tolero - Pixel Portfolio

A pixel-art portfolio built on a strict 12-column grid. Static HTML, no
build step.

## Run it

Open `index.html`, or serve the folder:

    npx serve .

## Structure

    index.html                 home: hero, work index, capabilities, about, contact
    work/<id>.html             one case-study page per project (8 of them)
    assets/css/style.css       design system: tokens, 12-col grid, components
    assets/js/pixel.js         pixel-art drawing engine (integer grid -> canvas)
    assets/js/sprites.js       artwork: hero CRT, desk flat-lay, icons, logo
    assets/js/data.js          projects, case studies, capabilities, experience
    assets/js/app.js           shared: nav, grid overlay, reveal, contact form
    assets/js/case.js          case-study page renderer + gallery lightbox
    assets/fonts/              Oughter (display) + Clemente PD (body)
    assets/work/<project>/     optimised WebP galleries

The home page lists work as rows, not cards. "View case study" goes to a
real page at `work/<id>.html` with the brief, the approach and the full
output.

## The 12-column grid

`.grid` is the only layout container: 12 equal columns, 24px gutter,
1360px max width, centred.

    .c1 - .c12    column span on desktop
    .s2 - .s9     explicit start column on desktop
    .t2 - .t12    span below 1024px (reads as an 8-column layout)
    .m6 / .m12    span below 640px (reads as a 4-column layout)
    .t-auto / .m-auto   drop an explicit start column at that breakpoint

Spans use `grid-column-end: span N` so they can be combined with a start
column - do not switch them to the `grid-column` shorthand, it silently
collapses any element that also sets a start.

Press **G** to overlay the live columns and read the current column
count, gutter and viewport width. It is a design aid with no button in
the UI - delete the `.gridlines` markup from the pages to drop it.

## Adding a project

1. Drop optimised WebPs in `assets/work/<id>/`.
2. Append an entry to `window.PROJECTS` in `assets/js/data.js`:

       {
         id:'slug', idx:'09', ratio:'16/10',
         title:'...', client:'...', desc:'...', tags:['...'],
         cover:'assets/work/slug/cover.webp',
         items:[{src:'...', cap:'...', href:'optional link'}]
       }

   `ratio` accepts `16/10`, `1/1`, `4/3` or `4/5`; add `tall:true` for
   full-page mockups so the lightbox scrolls them at full width.
3. Add the matching case-study copy to `window.CASES` (same `id`):
   `year`, `role`, `discipline`, `summary`, `tools`, and `sections`
   (brief / approach / output).
4. Copy any `work/*.html` to `work/<id>.html` and change the one line
   near the bottom: `window.PROJECT_ID='<id>'`.

Experience, capabilities and the ticker live in the same data file. The
"Worked with" marquee is generated from the experience list, so it always
shows exactly the companies listed there - nothing to keep in sync.

## Contact form and the email rate limit

The site is static, so the form composes the message and hands it to the
visitor's own mail app (`mailto:`). It goes to **felixmaritolero@gmail.com**
- change `MAILTO` in `assets/js/app.js` to point somewhere else.

Every send passes through one gate, `limitEmailSending()` in `app.js`. Call
it once per request: it either grants a slot and records it, or refuses with
a reason to show the visitor.

    var gate = limitEmailSending();
    // -> { allowed:true,  remaining:4 }
    // -> { allowed:false, reason:"Just sent one. Please wait 62 seconds..." }

Retune it in one place, the `EMAIL_LIMIT` object:

    gapMs:    90 * 1000   minimum spacing between two messages
    perDay:   5           ceiling per rolling 24 hours
    windowMs: 24h         the rolling window itself

A hidden honeypot field catches bots before the gate is reached. Nothing is
shown to the visitor unless they are actually refused - there is no running
counter on the form.

The send log lives in `localStorage`, so this throttles one browser: a
courtesy guard against repeat sends, not server-side protection. For hard
limits and real inbox delivery, point the form at a form backend (Formspree,
Web3Forms) and keep `limitEmailSending()` in front of it.

## Pixel art

Nothing is a bitmap. `pixel.js` exposes a small grid API - `rect`, `frame`,
`disc`, `ring`, `dither` - and `sprites.js` composes the artwork from it.
Sprites render to `<canvas>` with image smoothing off, so every pixel
stays a hard square at any scale.

## Fonts - licensing note

`Oughter.otf` ships as **free for personal use only**. This site promotes
freelance services, which is commercial use, so a licence is needed before
launch: https://thehungryjpeg.com/product/4438755-oughter
Clemente PD is used for body text.
