# Design system

This is ported 1:1 from `../design-source/index.html`: calm, editorial and clinical-luxury, with warm paper, deep
ink navy and gold hairlines. It's light only.

## Tokens (`app/assets/css/main.css` @theme)
| Token | Value | Use |
|---|---|---|
| ink | #1B1863 | headings, primary buttons, Reviews/Book bands |
| ink-deep | #100F3A | footer |
| text | #3A3952 | body copy |
| paper | #F9F7F1 | page ground (plus two soft radial washes and 5% grain) |
| mist → #E9E1D0 | gradient | Zones band |
| blush | #EFE6D6 | FAQ band, tags |
| gold | #B9A487 | frame, h2 rule, hairlines |
| gold-dark | #8A7550 | button hover, step numerals |
| line | #E2D9C8 | dividers, input borders |

## Type and components
- **Type:** Cormorant Garamond (serif) for h1–h3 and quotes; Figtree (sans) for body text at 17px/1.65. The
  fonts are self-hosted via @nuxt/fonts. `h1` is `clamp(2.75rem, 6.5vw, 5.2rem)` and `h2` is
  `clamp(2.2rem, 4.4vw, 3.3rem)`, and every h2 has a 56px gold rule under it.
- **Buttons:** `.btn` is a solid ink pill that turns gold-dark on hover. `.btn--ghost` is outlined, `.btn--light`
  is white on ink, and `.btn--sm` is the header size. Every button has a minimum tap height of 44–48px.
- **Content width:** `.wrap` is capped at 1120px, with `--gutter` side padding (24px, or 22px on phones).
  `.section` has `clamp(64px, 9vw, 96px)` vertical padding.

## Breakpoints
| Width | Behaviour |
|---|---|
| ≥ 1200 | full header nav |
| < 900 | hero, zones and CTA stack into one column; footer uses 2 columns |
| 640–899 | reviews in 2 columns, the third full width |
| < 768 | compare and qualifications use 1 column |
| < 960 / < 520 | steps go 4 → 2 → 1 columns |
| < 640 | thinner frame, smaller logo, reviews in 1 column |
| < 560 | form fields in 1 column, full-width submit |
| < 420 | hero buttons full width; the Book button moves into the menu |
