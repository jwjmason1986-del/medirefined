# Design system (v2)

**Source of truth:** `../design_handoff_medirefined_home/` (read its `README.md` and `MediRefined Home.dc.html`).
It's hi-fi, so match it pixel-accurately. The look is navy and gold on alternating white, cream and beige bands,
with pill buttons and softly rounded cards. It's light only.

## Tokens (`app/assets/css/main.css` @theme)
| Token | Value | Use |
|---|---|---|
| navy | #231d6f | primary actions, navy bands (Reviews, Book, practitioner banner) |
| navy-hover | #2f2890 | button hover |
| navy-deep | #15123f | footer |
| ink | #1f1a4d | headings and body headings |
| gold | #a8895f | accent italics, rules, numerals, eyebrow |
| gold-light | #c9b18e | labels on navy |
| badge / badge-bg | #6b5436 / #f1e7d6 | area badge |
| muted / secondary / faint | #6b6478 / #4a4468 / #8a8398 | text tiers |
| on-navy / -soft / -faint | #c8c4e6 / #d6d3ef / #a9a4d0 | text on navy |
| cream / beige | #faf8f4 / #f1ebe1 | section bands |
| line | #e2d8c8 | borders |

Areas uses a gradient band, `#f3ede3 → #e9dfcf`.

**Type:**
- Cormorant Garamond 300/400/500 plus italic, for headings, numbers, quotes and FAQ questions.
- Jost 300–600, for body text and UI.
- Pinyon Script, only for the "Refined" part of the wordmark.

All three are self-hosted via @nuxt/fonts.

**Radii:** 980px for pills, 28px for cards and panels, 22px for tiles and the banner, 12px for inputs.

## Shared classes
- `.wrap`: max 1080px of content plus 22px gutters. Don't call it `.container`, because Tailwind v4 has a
  `container` utility that overrides it.
- `.section`: `clamp(96px, 12vw, 160px)` vertical padding.
- Title pattern: `.title` (H2) + `.rule` (48×1 gold, 22px below) + `.intro` (20px below). Wrap them in `.is-center`
  to centre the title.
- `.pill` with `--solid`, `--outline` and `--lg`. Both variants have a 1px border, so they're the same size.
- `.wordmark`: renders `Medi<span>Refined</span>`.

## Responsive decisions beyond the handoff
The handoff's auto-fit grids leave orphans on tablet, so the layouts below are fixed on purpose.

| Area | Behaviour |
|---|---|
| Nav | links from 900px up; below that, a menu button opens a drop-down panel. The Book pill is always visible. |
| Hero | auto-fit with 300px columns (two columns at 768); logo capped at 340px below 700px |
| Treatments | auto-fit with 420px columns; below 480px the fact rows stack label above value |
| Areas | 2 columns from 700px up, stacked below. The photo panel is **square** so the % markers stay on the right features. When stacked it's capped at 440px. The markers have a 44px hit area. The segmented control becomes a rounded block below 700px. |
| Expect | 4 → 2 (below 960) → 1 (below 520) columns |
| Safety | auto-fit with 320px tiles; the practitioner banner is auto-fit with 220px columns |
| Reviews | 3 columns; on tablet (640–899) 2 columns plus the third full width; 1 column on phones |
| Book | auto-fit with 400px columns; fields are auto-fit with 200px columns (2 on desktop, 3 on tablet, 1 on phones) |
| Footer | 4 → 2 (below 900) → 1 (below 480) columns |
