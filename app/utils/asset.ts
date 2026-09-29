// Public-folder URL that respects app.baseURL. The site is served from "/" on Coolify but from "/medirefined/" on
// GitHub Pages, and Vue does not prefix absolute "/images/…" paths in templates. Use for every public asset.
export function asset(path: string): string {
  const base = useRuntimeConfig().app.baseURL || '/'
  return base.replace(/\/+$/, '') + (path.startsWith('/') ? path : `/${path}`)
}
