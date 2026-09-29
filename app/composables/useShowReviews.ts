import { reviews } from '#shared/site'

// Sample (placeholder) reviews may be shown while the site is in noindex preview, never once it is live/indexable.
export function useShowReviews() {
  const site = useSiteConfig()
  return computed(() => !site.indexable || reviews.items.every(r => !r.sample))
}
