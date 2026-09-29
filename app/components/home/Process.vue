<script setup lang="ts">
import { process } from '#shared/site'
</script>

<template>
  <section id="process" class="section">
    <div class="wrap">
      <h2>{{ process.title }}</h2>
      <p>{{ process.intro }}</p>
      <ol class="steps">
        <li v-for="s in process.steps" :key="s.title">
          <h3>{{ s.title }}</h3>
          <p>{{ s.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.steps {
  list-style: none;
  padding: 0;
  margin: 48px 0 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  counter-reset: step;
}

.steps li {
  counter-increment: step;
  padding-top: 20px;
  border-top: 2px solid var(--color-ink);
}

.steps li::before {
  content: counter(step);
  display: block;
  font-family: var(--font-serif);
  font-size: 2rem;
  line-height: 1;
  color: var(--color-gold-dark);
  margin-bottom: 10px;
}

h3 {
  font-family: var(--font-sans);
  font-size: 1.25rem;
  font-weight: 600;
}

@media (max-width: 959px) {
  .steps {
    grid-template-columns: 1fr 1fr;
    gap: 36px 32px;
  }
}

@media (max-width: 519px) {
  .steps {
    grid-template-columns: 1fr;
    gap: 28px;
    margin-top: 36px;
  }
}
</style>
