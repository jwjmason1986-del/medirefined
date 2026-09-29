<script setup lang="ts">
import { hero } from '#shared/site'
</script>

<template>
  <div class="hero">
    <div class="wrap hero__grid">
      <div>
        <h1>{{ hero.title }}</h1>
        <p class="hero__lead">{{ hero.lead }}</p>
        <div class="hero__actions">
          <a class="btn" href="#book">Book a consultation</a>
          <a class="btn btn--ghost" href="#compare">Compare treatments</a>
        </div>
      </div>
      <div class="hero__art">
        <img src="/images/logo-mark.png" alt="MediRefined logo: a line drawing of a face in profile" width="1000" height="626" fetchpriority="high">
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  padding: clamp(48px, 8vw, 88px) 0 clamp(56px, 9vw, 96px);
}

.hero__grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 56px;
  align-items: center;
}

.hero__lead {
  font-size: clamp(1.08rem, 1.6vw, 1.2rem);
  margin: 24px 0 32px;
}

.hero__actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.hero__art {
  justify-self: center;
  width: 100%;
  max-width: 520px;
}

.hero__art img {
  display: block;
  width: 100%;
  height: auto;
}

@media (max-width: 899px) {
  .hero__grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .hero__art {
    max-width: 420px;
  }
}

@media (max-width: 639px) {
  .hero__art {
    max-width: 320px;
  }
}

@media (max-width: 419px) {
  .hero__actions .btn {
    flex: 1 1 100%;
  }
}
</style>
