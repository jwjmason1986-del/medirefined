# Architecture

A lean, single-page Nuxt 4 app with no database. It uses the same skeleton as the Phuket Dirtbike and Uniplumb sites.

```
shared/site.ts            ALL copy + business data (nav, sections, zones + star coords, FAQs, placeholders)
shared/booking.ts         booking validation, shared by the client (inline errors) and the server (authority)
app/layouts/default.vue   SiteFrame + SiteHeader + <main id="top"> + SiteFooter
app/pages/index.vue       Home* sections in design order
app/components/site/      Frame (fixed gold double frame), Header, MobileMenu, Footer
app/components/home/      Hero, Compare, Zones, Process, Qualifications, Reviews, Faq, BookForm
app/assets/css/main.css   @theme tokens, base type, .wrap/.section/.btn, frame + gutter tokens
server/api/booking.post.ts  validate → rate-limit → email clinic (reply-to visitor) + acknowledgement
server/utils/mailer.ts    nodemailer transport from runtime config, branded emailLayout()
scripts/brand-assets.mjs  favicons + OG card from public/images/logo-mark.png
```

Each component carries its own scoped CSS, ported from the original stylesheet. `main.css` only holds the shared tokens and primitives.

## Gotchas
- **Mobile menu:** keep `SiteMobileMenu` in `<Teleport to="body">`. The header's `backdrop-filter` would otherwise
  become its containing block. The full nav shows from **1200px**. Below that, the hamburger is used, and the header
  Book button stays until 420px.
- **`body`:** always `overflow-x: clip`, never `hidden`. `hidden` breaks the sticky header while the menu locks `<html>`.
- **Frame:** the gold frame's size comes from the `--frame-*` tokens, which shrink below 640px. The header top
  padding, the footer bottom padding and `--gutter` are all derived from them, so text never touches the lines. The
  `.face` outer rule and swash on Zones are tightened on phones for the same reason.
- **Zones:** the stars sit in a 300×300 SVG over the square `face.jpg`. Star coordinates live in
  `shared/site.ts > zones.items`. The chips are the accessible control; the stars are a pointer shortcut
  (`aria-hidden`, with r=22 hit circles).
- **Booking form:**
  - `method="post"` and a submit button disabled until hydration mean personal data can never end up in a URL.
  - The honeypot field is `website`.
  - The rate limit is in memory, 5 requests per 10 minutes per IP.
- **Pinned config:** keep `nitro.externals.inline: ['unhead']` and keep the favicon links in `nuxt.config` (not in `app.vue`).
- **Brand assets:** the container has no fonts, so `scripts/brand-assets.mjs` must not use SVG `<text>`.
- **Testing in the hidden Browser pane:** CSS transitions and `requestAnimationFrame` freeze while the pane is hidden,
  so the menu can look invisible or stuck. This is a test-harness artefact. Inject
  `*{transition:none!important}` for the test.
