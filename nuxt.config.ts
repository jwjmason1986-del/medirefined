// MediRefined — public website (single page). v2 design: ../design_handoff_medirefined_home (hi-fi handoff).
// Mirrors the Phuket Dirtbike / Uniplumb setup: Nuxt 4 + Nuxt UI v4 + Tailwind v4 + @nuxtjs/seo, Docker locally,
// Coolify for production. No database; the booking form emails the clinic over SMTP (server/api/booking.post.ts).
import { site } from './shared/site'

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

  robots: { groups: [{ userAgent: ['*'], disallow: ['/api/'] }] },
  ogImage: { enabled: false }, // static /og/home.jpg instead
  seo: { canonicalLowercase: false },

  schemaOrg: {
    identity: {
      type: 'LocalBusiness',
      '@type': ['LocalBusiness', 'MedicalBusiness'],
      name: site.name,
      url: site.url,
      logo: `${site.url}/icon-512.png`,
      image: [`${site.url}/og/home.jpg`],
      address: { addressCountry: 'GB' },
      knowsAbout: ['Botox', 'Botulinum toxin', 'Dermal fillers', 'Hyaluronic acid fillers', 'Aesthetic consultations'],
    },
  },

  site: {
    url: site.url, // overridden by NUXT_SITE_URL
    name: site.name,
    description: site.description,
    defaultLocale: 'en',
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
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon-48.png?v=1' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png?v=1' },
        { rel: 'manifest', href: '/site.webmanifest?v=1' },
      ],
    },
  },
})
