# Architecture

A lean, single-page Nuxt 4 app with no database. It uses the same skeleton as the Phuket Dirtbike and Uniplumb sites.

```
shared/site.ts            ALL copy + business data (nav, sections, area markers x/y %, FAQs, placeholders)
shared/booking.ts         booking validation, shared by the client (inline errors) and the server (authority)
app/layouts/default.vue   SiteHeader + <main> + SiteFooter (Hero is the #top <header>)
app/pages/index.vue       Home* sections in design order
app/components/site/      Header (sticky nav), MobileMenu, Footer
app/components/home/      Hero, Treatments, Areas, Expect, Safety, Reviews, Faq, BookForm
app/assets/css/main.css   @theme tokens, base, .wrap/.section/.title/.rule/.intro/.pill/.wordmark
server/api/booking.post.ts  validate → rate-limit → email clinic (reply-to visitor) + acknowledgement
server/utils/mailer.ts    nodemailer transport from runtime config, branded emailLayout()
scripts/brand-assets.mjs  favicons + OG card from public/images/medirefined-logo.png
```

Each component carries its own scoped CSS, ported from the handoff's inline styles. `main.css` only holds the shared tokens and primitives.

## Gotchas
- **Mobile menu:** keep `SiteMobileMenu` in `<Teleport to="body">`. The nav's `backdrop-filter` would otherwise become
  its containing block. The nav links show from **900px**; below that, the menu button opens a drop-down panel under
  the 52px nav.
- **`body`:** always `overflow-x: clip`, never `hidden`.
- **Content container:** use `.wrap`, never `.container`. Tailwind v4's `container` utility sits in a later layer and
  overrides max-width.
- **Areas:** the photo panel is `aspect-ratio: 1` over the square `face.jpg`, so the %-positioned markers line up.
  If a non-square portrait is supplied, re-tune `areas.items` x/y (or keep the square crop). The segmented control is
  the accessible path; the markers are `aria-hidden`.
- **FAQ:** one row open at a time. Answers use `v-show`, so they stay in the DOM for crawlers and the FAQPage schema.
- **Booking form:**
  - `method="post"` and a submit button disabled until hydration mean personal data can never end up in a URL.
  - On success the form is swapped for the success state, and "Send another request" resets it.
  - The honeypot field is `website`.
  - The rate limit is in memory, 5 requests per 10 minutes per IP.
- **Pinned config:** keep `nitro.externals.inline: ['unhead']` and keep the favicon links in `nuxt.config`.
- **Brand assets:** `scripts/brand-assets.mjs` must not use SVG `<text>` (the container has no fonts).
- **Testing in the hidden Browser pane:** CSS transitions and rAF freeze while it's hidden. Inject
  `*{transition:none!important}` before judging the menu.
