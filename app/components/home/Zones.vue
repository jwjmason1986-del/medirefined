<script setup lang="ts">
import { zones } from '#shared/site'

// Interactive face: the gold stars on the photo and the chip buttons select the same area.
// The chips are the keyboard / screen-reader path; the stars are a pointer shortcut (hit circles ≥ 44px on phones).
const active = ref(0)
const current = computed(() => zones.items[active.value]!)

// 4-point star centred on (x, y) in the 300×300 photo space.
function star(x: number, y: number) {
  return `M${x} ${y - 12}L${x + 2} ${y - 2}L${x + 12} ${y}L${x + 2} ${y + 2}L${x} ${y + 12}L${x - 2} ${y + 2}L${x - 12} ${y}L${x - 2} ${y - 2}Z`
}
</script>

<template>
  <section id="areas" class="section zones">
    <div class="wrap zones__grid">
      <div class="face">
        <div class="face__stage">
          <img class="face__img" src="/images/face.jpg" alt="Portrait showing common treatment areas" width="686" height="686" loading="lazy">
          <svg class="face__dots" viewBox="0 0 300 300" aria-hidden="true">
            <g
              v-for="(z, i) in zones.items"
              :key="z.name"
              class="face__spot"
              :class="{ on: i === active }"
              @click="active = i"
            >
              <circle :cx="z.x" :cy="z.y" r="22" fill="transparent" />
              <path class="face__star" :d="star(z.x, z.y)" />
            </g>
          </svg>
        </div>
      </div>

      <div>
        <h2>{{ zones.title }}</h2>
        <p>{{ zones.intro }}</p>
        <ul class="zones__chips">
          <li v-for="(z, i) in zones.items" :key="z.name">
            <button type="button" :aria-pressed="i === active" @click="active = i">{{ z.name }}</button>
          </li>
        </ul>
        <div class="zones__panel" aria-live="polite">
          <span class="zones__tag">{{ current.tag }}</span>
          <h3>{{ current.name }}</h3>
          <p>{{ current.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.zones {
  background: linear-gradient(180deg, var(--color-mist), #e9e1d0);
}

.zones__grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 64px;
  align-items: center;
}

/* Photo in a gold-bordered square, an outer gold rule, and a gold swash below-right. */
.face {
  position: relative;
  justify-self: center;
  width: 100%;
  max-width: 440px;
}

.face::before {
  content: "";
  position: absolute;
  inset: -16px;
  border: 2.5px solid var(--color-gold);
  border-radius: 36px;
  pointer-events: none;
}

.face::after {
  content: "";
  position: absolute;
  right: 6px;
  bottom: -46px;
  width: 190px;
  height: 84px;
  pointer-events: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 190 84' fill='none' stroke='%23B9A487' stroke-width='3' stroke-linecap='round'%3E%3Cpath d='M4 64C30 12 62 10 64 42C66 74 30 68 42 44C54 20 104 30 126 54C142 70 168 58 186 30'/%3E%3C/svg%3E") no-repeat center / contain;
}

.face__stage {
  position: relative;
  aspect-ratio: 1;
  border: 4px solid var(--color-gold);
  border-radius: 24px;
  overflow: hidden;
  background: var(--color-blush);
  box-shadow: 0 30px 60px -30px rgba(27, 24, 99, 0.5);
}

.face__img,
.face__dots {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.face__img {
  object-fit: cover;
  object-position: center 22%;
}

.face__spot {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.face__star {
  fill: #d8b45c;
  stroke: #8a7550;
  stroke-width: 0.8;
  stroke-linejoin: round;
  filter: drop-shadow(0 0 3px rgba(255, 235, 170, 0.9));
  transform-box: fill-box;
  transform-origin: center;
  transition: fill 0.2s, transform 0.2s, filter 0.2s;
}

.face__spot:hover .face__star {
  transform: scale(1.15);
}

.face__spot.on .face__star {
  fill: #f3d27a;
  transform: scale(1.25);
  filter: drop-shadow(0 0 7px rgba(255, 214, 107, 0.95));
}

.zones__chips {
  list-style: none;
  padding: 0;
  margin: 26px 0 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.zones__chips button {
  min-height: 44px;
  font: inherit;
  font-weight: 500;
  background: #fff;
  color: var(--color-ink);
  border: 1.5px solid var(--color-line);
  border-radius: 999px;
  padding: 8px 18px;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
}

.zones__chips button:hover {
  border-color: var(--color-ink);
}

.zones__chips button[aria-pressed="true"] {
  background: var(--color-ink);
  border-color: var(--color-ink);
  color: #fff;
}

.zones__panel {
  background: #fff;
  border-left: 3px solid var(--color-gold);
  padding: 22px 26px;
  border-radius: 0 12px 12px 0;
  min-height: 190px;
}

.zones__tag {
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 600;
  background: var(--color-blush);
  color: #6b5a3c;
  padding: 2px 12px;
  border-radius: 999px;
  margin-bottom: 8px;
}

@media (max-width: 899px) {
  .zones__grid {
    grid-template-columns: 1fr;
    gap: 88px; /* room for the swash under the photo */
  }

  .face {
    max-width: 400px;
  }
}

/* Keep the outer rule + swash inside the gutters (clear of the viewport frame). */
@media (max-width: 639px) {
  .zones__grid {
    gap: 72px;
  }

  .face {
    width: calc(100% - 28px);
  }

  .face::before {
    inset: -12px;
    border-radius: 30px;
    border-width: 2px;
  }

  .face::after {
    right: 0;
    bottom: -40px;
    width: 150px;
    height: 66px;
  }

  .zones__chips button {
    padding: 8px 16px;
  }

  .zones__panel {
    padding: 20px 22px;
    min-height: 0;
  }

  .zones__panel h3 {
    font-size: 1.75rem;
  }
}
</style>
