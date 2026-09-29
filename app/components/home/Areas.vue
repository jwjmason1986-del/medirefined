<script setup lang="ts">
import { areas } from '#shared/site'

// Interactive treatment map (handoff §4): the segmented control and the photo markers select the same area.
const active = ref(0)
const current = computed(() => areas.items[active.value]!)
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
          <img :src="areas.image" :alt="areas.imageAlt" width="686" height="686" loading="lazy">
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

        <div class="areas__card" aria-live="polite">
          <span class="areas__badge">{{ current.treatment }}</span>
          <h3>{{ current.label }}</h3>
          <p>{{ current.desc }}</p>
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
  font-size: 19px;
  line-height: 1.5;
  color: var(--color-muted);
  text-wrap: pretty;
}

/* Phones: stack, photo capped, control becomes a rounded block with finger-sized options. */
@media (max-width: 699px) {
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
  }

  .areas__seg {
    border-radius: 24px;
  }

  .areas__seg button {
    min-height: 44px;
    padding: 10px 16px;
  }
}
</style>
