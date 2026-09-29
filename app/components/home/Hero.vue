<script setup lang="ts">
import { hero } from '#shared/site'
</script>

<template>
  <header id="top" class="hero">
    <div class="wrap hero__grid">
      <div class="hero__copy">
        <p class="hero__eyebrow">{{ hero.eyebrow }}</p>
        <h1>{{ hero.title }} <em>{{ hero.titleAccent }}</em></h1>
        <p class="hero__lead">{{ hero.lead }}</p>
        <div class="hero__actions">
          <a href="#book" class="pill pill--solid pill--lg">Book a consultation</a>
          <a href="#treatments" class="pill pill--outline pill--lg">Compare treatments</a>
        </div>
      </div>
      <div class="hero__art">
        <picture>
          <source
            type="image/webp"
            :srcset="`${asset('/images/medirefined-logo-520.webp')} 520w, ${asset('/images/medirefined-logo-1000.webp')} 1000w`"
            sizes="(min-width: 700px) 520px, 340px"
          >
          <img :src="asset('/images/medirefined-logo.png')" alt="MediRefined" width="1000" height="626" fetchpriority="high">
        </picture>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* White on purpose, to stand out from the cream sections below. */
.hero {
  background: #fff;
  padding: clamp(64px, 9vw, 120px) 0 clamp(72px, 9vw, 120px);
}

.hero__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
}

.hero__copy {
  max-width: 520px;
}

.hero__eyebrow {
  margin-bottom: 18px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-gold-text);
}

h1 {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: clamp(44px, 5.6vw, 76px);
  line-height: 1.04;
  letter-spacing: -0.015em;
  color: var(--color-navy);
  text-wrap: balance;
}

h1 em {
  color: var(--color-gold);
}

.hero__lead {
  margin-top: 24px;
  max-width: 500px;
  font-size: clamp(17px, 1.8vw, 20px);
  line-height: 1.5;
  color: var(--color-muted);
  text-wrap: pretty;
}

.hero__actions {
  margin-top: 36px;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.hero__art {
  display: flex;
  justify-content: center;
}

.hero__art picture {
  display: contents;
}

.hero__art img {
  display: block;
  width: 100%;
  max-width: 520px;
  height: auto;
}

@media (max-width: 699px) {
  .hero__art img {
    max-width: 340px;
  }
}

@media (max-width: 419px) {
  .hero__actions .pill {
    flex: 1 1 100%;
  }
}
</style>
