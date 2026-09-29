// Per-page SEO: title, description and Open Graph (1200×630 share card from public/og/).
interface PageSeo {
  title: string
  description: string
  og: string // share-card file in public/og/ (without .jpg)
}

export function usePageSeo(o: PageSeo) {
  const siteUrl = useSiteConfig().url
  useSeoMeta({
    title: o.title,
    description: o.description,
    ogTitle: o.title,
    ogDescription: o.description,
    ogImage: `${siteUrl}/og/${o.og}.jpg`,
    ogImageAlt: o.title,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/jpeg',
  })
}
