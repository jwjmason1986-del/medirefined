<script setup lang="ts">
import { nav } from '#shared/site'

// Slide-over menu for widths below 1200px. Teleported to <body>: the header's backdrop-filter would otherwise
// become the containing block of this fixed panel. Esc / backdrop / link click close it; <html> scroll locks.
const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [returnFocus?: boolean] }>()

const panel = useTemplateRef<HTMLElement>('panel')

function onKey(e: KeyboardEvent) {
  if (!props.open)
    return
  if (e.key === 'Escape')
    emit('close')
  // Keep Tab inside the panel while it is open.
  if (e.key === 'Tab' && panel.value) {
    const items = panel.value.querySelectorAll<HTMLElement>('a, button')
    const first = items[0]
    const last = items[items.length - 1]
    if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.value)) {
      e.preventDefault()
      last?.focus()
    }
    else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first?.focus()
    }
  }
}

watch(() => props.open, (v) => {
  document.documentElement.style.overflow = v ? 'hidden' : ''
  if (v)
    nextTick(() => panel.value?.focus())
})

// Close if the viewport grows past the breakpoint while open.
function onResize() {
  if (props.open && window.innerWidth >= 1200)
    emit('close', false)
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
  window.addEventListener('resize', onResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('resize', onResize)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="menu">
      <div v-if="open" class="menu" @click.self="emit('close')">
        <div
          id="mobile-menu"
          ref="panel"
          class="menu__panel"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
          aria-label="Menu"
        >
          <div class="menu__top">
            <img src="/images/logo-wordmark.png" alt="" width="800" height="215" class="menu__logo">
            <button type="button" class="menu__close" aria-label="Close menu" @click="emit('close')">
              <UIcon name="i-lucide-x" class="size-6" />
            </button>
          </div>
          <nav aria-label="Mobile">
            <a v-for="l in nav" :key="l.href" :href="l.href" class="menu__link" @click="emit('close', false)">{{ l.label }}</a>
          </nav>
          <a class="btn menu__book" href="#book" @click="emit('close', false)">Book a consultation</a>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.menu {
  position: fixed;
  inset: 0;
  z-index: 70;
  background: rgba(16, 15, 58, 0.45);
  display: flex;
  justify-content: flex-end;
}

.menu__panel {
  width: min(420px, 100%);
  height: 100%;
  overflow-y: auto;
  overscroll-behavior: contain;
  background: var(--color-paper);
  border-left: 1px solid var(--color-gold);
  padding: calc(var(--frame-inset) + 18px) calc(var(--gutter) + 4px) 40px;
  display: flex;
  flex-direction: column;
  box-shadow: -30px 0 60px -30px rgba(27, 24, 99, 0.45);
  outline: none;
}

.menu__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.menu__logo {
  height: 42px;
  width: auto;
}

.menu__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border: 1.5px solid var(--color-ink);
  border-radius: 999px;
  background: transparent;
  color: var(--color-ink);
}

.menu__link {
  display: block;
  padding: 14px 0;
  border-bottom: 1px solid var(--color-line);
  font-family: var(--font-serif);
  font-size: 1.75rem;
  line-height: 1.2;
  color: var(--color-ink);
  text-decoration: none;
}

.menu__link:hover {
  color: var(--color-gold-dark);
}

.menu__book {
  margin-top: 32px;
  align-self: stretch;
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.22s ease;
}

.menu-enter-active .menu__panel,
.menu-leave-active .menu__panel {
  transition: transform 0.25s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

.menu-enter-from .menu__panel,
.menu-leave-to .menu__panel {
  transform: translateX(100%);
}
</style>
