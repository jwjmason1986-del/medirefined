# MediRefined website

A one-page site for MediRefined: plain-English information on Botox and dermal fillers, plus a consultation
booking form. It's a Nuxt 4 rebuild of the static design in `../design-source/index.html` (a clone of
github.com/jwjmason1986-del/medirefined).

**Stack:** Nuxt 4, Nuxt UI v4 (Tailwind v4), @nuxtjs/seo, pnpm, and nodemailer. There's no database.

```bash
docker compose up -d --build   # site http://localhost:3600 · Mailpit http://localhost:8027
```

See `docs/RUN.md` for how to run it, `docs/ARCHITECTURE.md` for how it's built, `docs/DESIGN-SYSTEM.md` for the look, and `docs/BUILD-LOG.md` for history and open TODOs.
