<script setup lang="ts">
import { nav as allNav } from '#shared/site'

const showReviews = useShowReviews()
const nav = computed(() => allNav.filter(l => showReviews.value || l.href !== '#reviews'))

// Sticky 52px translucent nav (handoff §1). The link row shows from 900px; below that a menu button opens
// <SiteMobileMenu>. The "Book" pill is always visible.
const open = ref(false)
const toggle = useTemplateRef<HTMLButtonElement>('toggle')
function close(returnFocus = true) {
  open.value = false
  if (returnFocus)
    nextTick(() => toggle.value?.focus())
}
</script>

<template>
  <nav class="site-nav" aria-label="Main">
    <div class="wrap site-nav__bar">
      <a href="#top" class="wordmark site-nav__logo" aria-label="MediRefined home">Medi<span>Refined</span></a>

      <div class="site-nav__links">
        <a v-for="l in nav" :key="l.href" :href="l.href">{{ l.label }}</a>
      </div>

      <div class="site-nav__actions">
        <a href="#book" class="pill pill--solid site-nav__book">Book</a>
        <button
          ref="toggle"
          type="button"
          class="site-nav__toggle"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          :aria-label="open ? 'Close menu' : 'Open menu'"
          @click="open ? close(false) : (open = true)"
        >
          <UIcon :name="open ? 'i-lucide-x' : 'i-lucide-menu'" class="size-5" />
        </button>
      </div>
    </div>
    <SiteMobileMenu :open="open" @close="close" />
  </nav>
</template>

<style scoped>
.site-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(168, 137, 95, 0.22);
}

.site-nav__bar {
  height: var(--nav-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.site-nav__logo {
  font-size: 19px;
}

.site-nav__links {
  display: none;
  align-items: center;
  gap: 26px;
  font-size: 12.5px;
}

.site-nav__links a {
  color: var(--color-ink);
  opacity: 0.8;
  padding-block: 8px;
  transition: opacity 0.2s;
}

.site-nav__links a:hover {
  opacity: 1;
  text-decoration: underline;
}

.site-nav__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.site-nav__book {
  position: relative;
  padding: 6px 14px;
  font-size: 12.5px;
  font-weight: 500;
}

/* Small pill, full-size hit area. */
.site-nav__book::before {
  content: "";
  position: absolute;
  inset: -8px -4px;
}

/* 36px visual, 44px hit area. */
.site-nav__toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin-right: -6px;
  border: 0;
  border-radius: 980px;
  background: transparent;
  color: var(--color-navy);
}

.site-nav__toggle::before {
  content: "";
  position: absolute;
  inset: -4px;
}

.site-nav__toggle:hover {
  background: rgba(35, 29, 111, 0.06);
}

@media (min-width: 900px) {
  .site-nav__links {
    display: flex;
  }

  .site-nav__toggle {
    display: none;
  }
}
</style>
