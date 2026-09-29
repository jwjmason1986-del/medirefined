# Build log

## 2026-09-30: v2, redesign from `design_handoff_medirefined_home`
- Rebuilt every section to the hi-fi handoff:
  - New palette: navy #231d6f and gold #a8895f on white, cream and beige bands.
  - New type: Cormorant Garamond, Jost, and a Pinyon Script wordmark.
  - Pill buttons, rounded cards, a 52px translucent nav, a segmented area picker, a single-open FAQ accordion, and a
    "Request received." success state on the form.
  - The v1 gold viewport frame and paper grain are gone.
- **Content:** copy updated to the handoff (area descriptions, FAQ answers, headings with full stops). The nav anchors
  are now #treatments, #areas, #expect, #safety, #reviews and #faq. Treatment options are Botox, Dermal fillers
  and Not sure yet; time options are Morning, Afternoon and Evening.
- **Portrait:** the handoff asks the client for a portrait for the area map. The existing `face.jpg` is used for
  now, with markers re-tuned to it and the panel made square so the markers stay aligned.
- **Kept from v1:** the SMTP booking backend, validation, honeypot, rate limit, POST-only and hydration guard, the
  SEO/schema set-up and the mobile menu (restyled as a drop-down).
- **Verified:**
  - No overflow, no nav overlap and no text within 16px of an edge at 1440, 1280, 1024, 900, 899, 768, 700, 640,
    414, 390, 360 and 320px.
  - Menu, area picker, FAQ and the booking success state all work, and both emails reached Mailpit.
  - Lint, typecheck and the production build are clean.

## 2026-09-29: v1, Nuxt rebuild of the static site
- The static `index.html` from github.com/jwjmason1986-del/medirefined (commit bd39948) was moved to `../design-source/`
  and kept as the design reference. It's still a git clone, so `git pull` there picks up the owner's changes.
- The same page was rebuilt in Nuxt 4 with the same sections, copy, palette and imagery. Content lives in
  `shared/site.ts`.
- **Responsive fixes over the original:**
  - There's now a real mobile/tablet menu. The original hid the nav links below 860px with no way to reach them.
  - The desktop nav no longer overflows between 860 and 1200px.
  - The gold frame is thinner on phones and never crosses text.
  - The Zones photo's outer rule and swash stay inside the gutters.
  - Reviews use 2 columns on tablet.
  - Tap targets are at least 44px, and inputs use a 16px font so iOS doesn't zoom.
- **Booking form:** it now emails over SMTP from `/api/booking` (clinic notification with reply-to, plus a visitor
  acknowledgement), replacing mailto. It has server and client validation, a honeypot and a rate limit. Mailpit catches
  the emails in dev.
- **SEO:** noindex until launch, LocalBusiness + MedicalBusiness identity, FAQPage + Question schema, and a static OG
  card and favicon set generated from the logo.
- **Verified:**
  - No horizontal scroll, no header collisions and no text in the frame at 1440, 1280, 1200, 1199, 1024, 900, 768,
    640, 414, 390, 360 and 320px.
  - Menu, anchors, zones and FAQ all work, and a form submission reached Mailpit.
  - Lint, typecheck and the production build are clean.

## Open TODOs (placeholders are visible on the page)
- [ ] Practitioner name, profession/registration number and qualifications (`safety.practitioner`)
- [ ] Real client reviews: replace the samples and set `sample: false`
- [ ] Contact phone, email, address, opening hours and socials (`contact`)
- [ ] The clinic's SMTP credentials and notification address
- [ ] Production domain (`site.url`, `NUXT_SITE_URL`), Coolify deploy, DNS
- [ ] Go indexable (`NUXT_PUBLIC_SITE_INDEXABLE=true`) once the placeholders are filled
- [ ] Client portrait for the area map (then re-tune `areas.items` x/y)
- [ ] Clinical review of the FAQ answers (written for the prototype)
- [ ] Decide whether this app should be pushed to the owner's GitHub repo (it currently has no remote)
