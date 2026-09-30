// MediRefined — public website (single page). v2 design: ../design_handoff_medirefined_home (hi-fi handoff).
// Mirrors the Phuket Dirtbike / Uniplumb setup: Nuxt 4 + Nuxt UI v4 + Tailwind v4 + @nuxtjs/seo, Docker locally,
// Coolify for production. No database; the booking form emails the clinic over SMTP (server/api/booking.post.ts).
import { contact, site } from './shared/site'

// Business details only reach the JSON-LD once they are real (not "[Add …]" placeholders). Never invent them.
const real = (v: string) => (v && !v.startsWith('[Add') ? v : undefined)
const telephone = real(contact.phone)
const email = real(contact.email)
const streetAddress = real(contact.address)

// '/' on Coolify, '/medirefined/' for the GitHub Pages build (set by .github/workflows/pages.yml).
const base = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxtjs/seo'],
  css: ['~/assets/css/main.css'],

  // Server-only SMTP settings, overridden at runtime by NUXT_SMTP_HOST etc. (see docker-compose.yml / .env.example).
  runtimeConfig: {
    smtpHost: '',
    smtpPort: '587',
    smtpSecure: 'false',
    smtpIgnoreTls: 'false',
    smtpUser: '',
    smtpPass: '',
    mailFrom: '',
    formNotify: '',
    public: {
      // true only for the static GitHub Pages build (no server → the booking form hands off to WhatsApp instead).
      staticSite: false,
    },
  },

  routeRules: {
    '/images/**': { headers: { 'Cache-Control': 'public, max-age=2592000, stale-while-revalidate=86400' } },
    '/og/**': { headers: { 'Cache-Control': 'public, max-age=604800' } },
    '/**': {
      headers: {
        'Strict-Transport-Security': 'max-age=31536000',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'X-Frame-Options': 'SAMEORIGIN',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
      },
    },
  },

  // KEEP: without this the prod node server crashes with ERR_MODULE_NOT_FOUND unhead/dist/legacy.mjs.
  nitro: {
    externals: { inline: ['unhead'] },
    compressPublicAssets: { brotli: true, gzip: true },
  },

  // Light only (the design has no dark theme).
  colorMode: { preference: 'light', fallback: 'light', classSuffix: '', storageKey: 'mr-color-mode' },

  // robots.txt only means anything at a domain root, so it's skipped for the /medirefined/ GitHub Pages build (the
  // noindex meta tag still applies there).
  robots: { robotsTxt: base === '/', groups: [{ userAgent: ['*'], disallow: ['/api/'] }] },
  ogImage: { enabled: false }, // static /og/home.jpg instead
  seo: { canonicalLowercase: false },

  schemaOrg: {
    identity: {
      type: 'LocalBusiness',
      '@type': ['LocalBusiness', 'MedicalBusiness'],
      name: site.name,
      // Root-relative: nuxt-schema-org resolves these against the RUNTIME site URL (NUXT_SITE_URL). Never build them
      // from site.url, which is baked in at build time.
      logo: '/icon-512.png',
      image: '/og/home.jpg',
      address: { addressCountry: 'GB', ...(streetAddress ? { streetAddress } : {}) },
      ...(telephone ? { telephone } : {}),
      ...(email ? { email } : {}),
      knowsAbout: ['Botox', 'Botulinum toxin', 'Dermal fillers', 'Hyaluronic acid fillers', 'Aesthetic consultations'],
    },
  },

  site: {
    url: site.url, // overridden by NUXT_SITE_URL
    name: site.name,
    description: site.description,
    defaultLocale: 'en-GB',
    indexable: false, // noindex until launch — set NUXT_PUBLIC_SITE_INDEXABLE=true (runtime) in Coolify to go live
  },

  // Self-hosted Google Fonts via @nuxt/fonts (bundled with Nuxt UI).
  fonts: {
    families: [
      { name: 'Cormorant Garamond', provider: 'google', weights: [300, 400, 500], styles: ['normal', 'italic'] },
      { name: 'Jost', provider: 'google', weights: [300, 400, 500, 600], styles: ['normal'] },
      { name: 'Pinyon Script', provider: 'google', weights: [400], styles: ['normal'] },
    ],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en-GB' },
      // Declared here (not in app.vue) so nuxt-seo-utils doesn't also inject un-versioned copies.
      // Bump ?v= whenever the icon changes — browsers cache favicons hard.
      link: [
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: `${base}favicon-48.png?v=3` },
        { rel: 'apple-touch-icon', sizes: '180x180', href: `${base}apple-touch-icon.png?v=3` },
        { rel: 'manifest', href: `${base}site.webmanifest?v=3` },
      ],
    },
  },
})
