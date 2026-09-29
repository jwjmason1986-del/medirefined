<script setup lang="ts">
import { areas } from '#shared/site'

// Interactive treatment map (handoff §4): the segmented control and the photo markers select the same area.
const active = ref(0)
</script>

<template>
  <section id="areas" class="section areas">
    <div class="wrap">
      <div class="is-center">
        <h2 class="title">{{ areas.title }}</h2>
        <div class="rule" />
        <p class="intro" style="max-width: 520px">{{ areas.intro }}</p>
      </div>

      <div class="areas__seg" role="group" aria-label="Treatment areas">
        <button
          v-for="(a, i) in areas.items"
          :key="a.label"
          type="button"
          :aria-pressed="i === active"
          :class="{ on: i === active }"
          @click="active = i"
        >
          {{ a.label }}
        </button>
      </div>

      <div class="areas__grid">
        <div class="areas__photo">
          <picture>
            <source type="image/webp" :srcset="asset(areas.imageWebp)">
            <img :src="asset(areas.image)" :alt="areas.imageAlt" width="686" height="686" loading="lazy" decoding="async">
          </picture>
          <!-- Pointer shortcut; the segmented control above is the keyboard / screen-reader path. -->
          <button
            v-for="(a, i) in areas.items"
            :key="a.label"
            type="button"
            tabindex="-1"
            aria-hidden="true"
            class="areas__marker"
            :class="{ on: i === active }"
            :style="{ left: `${a.x}%`, top: `${a.y}%` }"
            @click="active = i"
          />
        </div>

        <div class="areas__card">
          <!-- Side by side (≥1000px) all five texts share one grid cell, so the card never jumps when switching areas.
               Stacked (<1000px) only the active one is laid out, so the card hugs its text. -->
          <div class="areas__text" aria-live="polite">
            <div
              v-for="(a, i) in areas.items"
              :key="a.label"
              class="areas__entry"
              :class="{ on: i === active }"
              :aria-hidden="i !== active"
            >
              <span class="areas__badge">{{ a.treatment }}</span>
              <h3>{{ a.label }}</h3>
              <p v-for="(para, j) in a.desc" :key="j">{{ para }}</p>
              <dl class="areas__facts">
                <div v-for="[term, value] in a.facts" :key="term">
                  <dt>{{ term }}</dt>
                  <dd>{{ value }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.areas {
  background: linear-gradient(180deg, #f3ede3 0%, #e9dfcf 100%);
}

/* Segmented control. */
.areas__seg {
  margin: 48px auto 0;
  width: fit-content;
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  padding: 5px;
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(168, 137, 95, 0.25);
  border-radius: 980px;
}

.areas__seg button {
  border: 0;
  border-radius: 980px;
  padding: 10px 18px;
  background: transparent;
  color: var(--color-secondary);
  font: 500 14px/1.2 var(--font-sans);
  transition: background-color 0.25s, color 0.25s;
}

.areas__seg button:hover:not(.on) {
  color: var(--color-navy);
}

.areas__seg button.on {
  background: var(--color-navy);
  color: #fff;
}

.areas__grid {
  margin-top: 48px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  align-items: stretch;
}

/* Square panel so the markers (placed by %) stay on the right features at every width. */
.areas__photo {
  position: relative;
  align-self: start; /* never stretch: a stretched height would widen the square past its column */
  width: 100%;
  aspect-ratio: 1;
  border-radius: 28px;
  overflow: hidden;
  background: #e4d8c5;
  border: 1px solid rgba(168, 137, 95, 0.45);
  box-shadow:
    0 0 0 8px rgba(255, 255, 255, 0.55),
    0 0 0 9px rgba(168, 137, 95, 0.35),
    0 30px 60px -30px rgba(80, 60, 30, 0.35);
}

.areas__photo img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.areas__marker {
  position: absolute;
  width: 22px;
  height: 22px;
  margin: -11px 0 0 -11px;
  padding: 0;
  border: 2px solid #fff;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.22);
  transition: all 0.3s;
}

/* 44px touch target around the 22px dot. */
.areas__marker::before {
  content: "";
  position: absolute;
  inset: -12px;
  border-radius: 50%;
}

.areas__marker.on {
  background: var(--color-gold);
  box-shadow: 0 0 0 10px rgba(255, 255, 255, 0.22);
}

/* Active marker: a soft ring that breathes out from the halo and fades (off under prefers-reduced-motion). */
.areas__marker.on::after {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.25);
  pointer-events: none;
  animation: marker-pulse 2s ease-out infinite;
}

@keyframes marker-pulse {
  0% {
    transform: scale(1);
    opacity: 0.9;
  }

  70%,
  100% {
    transform: scale(2.6);
    opacity: 0;
  }
}

.areas__card {
  background: #fff;
  border-left: 3px solid var(--color-gold);
  border-radius: 28px;
  padding: clamp(32px, 4vw, 48px);
  min-height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 24px 50px -30px rgba(80, 60, 30, 0.3);
}

/* Entries stretch to the card's height (set by the square photo): badge at the top, text at the bottom. */
.areas__text {
  flex: 1 1 auto;
  display: grid;
}

.areas__entry {
  grid-area: 1 / 1;
  display: flex;
  flex-direction: column;
  visibility: hidden;
}

.areas__entry.on {
  visibility: visible;
}

.areas__badge {
  align-self: flex-start;
  padding: 5px 11px;
  border-radius: 980px;
  background: var(--color-badge-bg);
  color: var(--color-badge);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

h3 {
  margin-top: 20px;
  font-family: var(--font-serif);
  font-size: clamp(32px, 4vw, 44px);
  font-weight: 500;
  letter-spacing: -0.005em;
  line-height: 1.1;
}

.areas__card p {
  margin-top: 16px;
  max-width: 44ch;
  font-size: 19px;
  line-height: 1.5;
  color: var(--color-muted);
  text-wrap: pretty;
}

.areas__facts {
  margin: auto 0 0; /* pinned to the card bottom; any spare height sits above it, not as an empty band */
  padding-top: 18px;
  border-top: 1px solid var(--color-line);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.areas__facts dt {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-gold-text);
}

.areas__facts dd {
  margin: 4px 0 0;
  font-size: 15px;
  line-height: 1.45;
  color: var(--color-ink);
}

/* Small laptops: slightly smaller text so the card matches the square photo's height. */
@media (min-width: 1000px) and (max-width: 1199px) {
  .areas__card p {
    font-size: 17px;
  }

  .areas__facts dd {
    font-size: 14px;
  }
}

/* Tablets and phones: stack, photo capped and centred above a full-width card. */
@media (max-width: 999px) {
  .areas__grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .areas__photo {
    width: calc(100% - 18px); /* room for the 9px halo */
    max-width: 440px;
    margin: 9px auto 0;
  }

  .areas__card {
    min-height: 0;
    padding: 28px 24px;
  }

  .areas__card p {
    font-size: 17px;
    max-width: 60ch;
  }

  /* Stacked: only the active entry takes space, so the card hugs its text (no spare height at all). */
  .areas__entry:not(.on) {
    display: none;
  }

  .areas__facts {
    margin-top: 24px;
  }
}

/* Phones: segmented control becomes a rounded block with finger-sized options. */
@media (max-width: 699px) {
  .areas__seg {
    border-radius: 24px;
  }

  .areas__seg button {
    min-height: 44px;
    padding: 10px 16px;
  }

  .areas__facts dd {
    font-size: 14px;
  }
}
</style>
