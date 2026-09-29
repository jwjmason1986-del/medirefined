# Run

```bash
cd ~/Documents/medirefined/medirefined-website
docker compose up -d --build                  # http://localhost:3600  (container: medirefined)
docker compose exec -T web pnpm lint
docker compose exec -T web pnpm typecheck     # the "vue-router/volar" plugin warning is harmless; exit code 0 = clean
docker compose logs -f web
```

- **Mailpit** (http://localhost:8027) catches every booking-form email in dev. SMTP is on `mailpit:1025` inside
  Docker, or `localhost:1027` from the host.
- **Brand assets:** after changing the logo, run `docker compose exec web node scripts/brand-assets.mjs`. It
  rebuilds the favicons and `public/og/home.jpg`. Then bump `?v=` in `nuxt.config.ts` and `public/site.webmanifest`.
- **After adding a NEW component file,** run `docker compose restart web`. The macOS bind-mount watcher misses
  new files.
- **Original design for side-by-side comparison:** `python3 -m http.server 3601 --directory ../design-source`
  (also listed in `../.claude/launch.json` as `medirefined-original`).

## Production (Coolify, not yet deployed)
- Build pack: Dockerfile, location `/Dockerfile.prod`, port 3600.
- Env vars (see `.env.example`): `NUXT_SITE_URL`, `NUXT_PUBLIC_SITE_INDEXABLE` (set it to `true` at launch; it's a
  runtime variable), and the `NUXT_SMTP_*`, `NUXT_MAIL_FROM` and `NUXT_FORM_NOTIFY` settings.
- If SMTP isn't configured, the form returns a 503 "temporarily unavailable" error rather than a false success.
