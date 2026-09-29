# Build log

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
- [ ] Practitioner name, profession/registration number and qualifications (`qualifications.practitioner`)
- [ ] Real client reviews: replace the samples and set `sample: false`
- [ ] Contact phone, email, address, opening hours and socials (`contact`)
- [ ] The clinic's SMTP credentials and notification address
- [ ] Production domain (`site.url`, `NUXT_SITE_URL`), Coolify deploy, DNS
- [ ] Go indexable (`NUXT_PUBLIC_SITE_INDEXABLE=true`) once the placeholders are filled
- [ ] Decide whether this app should be pushed to the owner's GitHub repo (it currently has no remote)
