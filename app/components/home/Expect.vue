<script setup lang="ts">
import { expect } from '#shared/site'
</script>

<template>
  <section id="expect" class="section expect">
    <div class="wrap">
      <h2 class="title">{{ expect.title }}</h2>
      <div class="rule" />
      <p class="intro">{{ expect.intro }}</p>
      <ol class="steps">
        <li v-for="s in expect.steps" :key="s.n">
          <span class="steps__n" aria-hidden="true">{{ s.n }}</span>
          <h3>{{ s.title }}</h3>
          <p>{{ s.body }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.expect {
  background: var(--color-cream);
}

/* 4 → 2 → 1 columns (no orphaned 4th step on tablet). */
.steps {
  list-style: none;
  margin: 64px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 40px 32px;
}

li {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.steps__n {
  font-family: var(--font-serif);
  font-size: 56px;
  font-weight: 300;
  line-height: 1;
  color: var(--color-gold);
}

h3 {
  margin-top: 8px;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

p {
  font-size: 16px;
  line-height: 1.55;
  color: var(--color-muted);
}

@media (max-width: 959px) {
  .steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 519px) {
  .steps {
    grid-template-columns: 1fr;
    gap: 36px;
    margin-top: 48px;
  }
}
</style>
