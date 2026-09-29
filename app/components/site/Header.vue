<script setup lang="ts">
import { nav } from '#shared/site'

// Full nav from 1200px up; below that a hamburger opens <SiteMobileMenu>. The Book button stays in the header
// down to 400px (then it lives in the menu only).
const open = ref(false)
const toggle = useTemplateRef<HTMLButtonElement>('toggle')
function close(returnFocus = true) {
  open.value = false
  if (returnFocus)
    nextTick(() => toggle.value?.focus())
}
</script>

<template>
  <header class="site-header">
    <div class="wrap site-header__bar">
      <a class="site-header__logo" href="#top" aria-label="MediRefined home">
        <img src="/images/logo-wordmark.png" alt="MediRefined" width="800" height="215">
      </a>

      <nav class="site-header__nav" aria-label="Main">
        <a v-for="l in nav" :key="l.href" :href="l.href">{{ l.label }}</a>
      </nav>

      <div class="site-header__actions">
        <a class="btn btn--sm site-header__book" href="#book">Book a consultation</a>
        <button
          ref="toggle"
          type="button"
          class="site-header__toggle"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          :aria-label="open ? 'Close menu' : 'Open menu'"
          @click="open ? close(false) : (open = true)"
        >
          <UIcon :name="open ? 'i-lucide-x' : 'i-lucide-menu'" class="size-6" />
        </button>
      </div>
    </div>
    <SiteMobileMenu :open="open" @close="close" />
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(249, 247, 241, 0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-gold);
}

/* Top padding clears the fixed frame lines. */
.site-header__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: var(--header-h);
  padding-top: calc(var(--frame-inset) + 4px);
}

.site-header__logo {
  flex: none;
  display: block;
}

.site-header__logo img {
  display: block;
  height: 50px;
  width: auto;
}

.site-header__nav {
  display: none;
  align-items: center;
  gap: clamp(16px, 1.5vw, 22px);
  font-size: 0.92rem;
  white-space: nowrap;
}

.site-header__nav a {
  text-decoration: none;
  padding-block: 10px;
  transition: color 0.2s;
}

.site-header__nav a:hover {
  color: var(--color-gold-dark);
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.site-header__book {
  white-space: nowrap;
}

.site-header__toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border: 1.5px solid var(--color-ink);
  border-radius: 999px;
  background: transparent;
  color: var(--color-ink);
  transition: background-color 0.2s, color 0.2s;
}

.site-header__toggle:hover {
  background: var(--color-ink);
  color: #fff;
}

@media (min-width: 1200px) {
  .site-header__nav {
    display: flex;
  }

  .site-header__toggle {
    display: none;
  }
}

@media (max-width: 639px) {
  .site-header__logo img {
    height: 42px;
  }
}

@media (max-width: 419px) {
  .site-header__book {
    display: none;
  }

  .site-header__logo img {
    height: 40px;
  }
}
</style>
