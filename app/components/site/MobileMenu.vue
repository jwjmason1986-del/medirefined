<script setup lang="ts">
import { nav as allNav } from '#shared/site'

const showReviews = useShowReviews()
const nav = computed(() => allNav.filter(l => showReviews.value || l.href !== '#reviews'))

// Drop-down menu below the nav for widths under 900px. Teleported to <body>: the nav's backdrop-filter would
// otherwise become the containing block of this fixed panel. Esc / backdrop / link click close it; <html> scroll locks.
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
  if (props.open && window.innerWidth >= 900)
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
          aria-label="Menu"
          tabindex="-1"
        >
          <nav aria-label="Mobile" class="wrap">
            <a v-for="l in nav" :key="l.href" :href="l.href" class="menu__link" @click="emit('close', false)">{{ l.label }}</a>
            <a href="#book" class="pill pill--solid pill--lg menu__book" @click="emit('close', false)">Book a consultation</a>
          </nav>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.menu {
  position: fixed;
  inset: var(--nav-h) 0 0;
  z-index: 49;
  background: rgba(21, 18, 63, 0.35);
}

.menu__panel {
  max-height: 100%;
  overflow-y: auto;
  overscroll-behavior: contain;
  background: #fff;
  border-bottom: 1px solid rgba(168, 137, 95, 0.22);
  padding: 8px 0 28px;
  outline: none;
  box-shadow: 0 30px 60px -30px rgba(21, 18, 63, 0.4);
}

.menu__link {
  display: block;
  padding: 16px 0;
  border-bottom: 1px solid var(--color-line);
  font-family: var(--font-serif);
  font-size: 26px;
  font-weight: 500;
  line-height: 1.2;
  color: var(--color-navy);
}

.menu__link:hover {
  color: var(--color-gold);
}

.menu__book {
  display: flex;
  margin-top: 24px;
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.2s ease;
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
  transform: translateY(-12px);
}
</style>
