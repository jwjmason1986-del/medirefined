<script setup lang="ts">
import { faqs } from '#shared/site'

useSchemaOrg([
  defineWebPage({ '@type': 'FAQPage' }),
  ...faqs.items.map(f => defineQuestion({ name: f.q, acceptedAnswer: f.a })),
])
</script>

<template>
  <section id="faq" class="section faq">
    <div class="wrap faq__wrap">
      <h2>{{ faqs.title }}</h2>
      <details v-for="f in faqs.items" :key="f.q">
        <summary>{{ f.q }}</summary>
        <p>{{ f.a }}</p>
      </details>
    </div>
  </section>
</template>

<style scoped>
.faq {
  background: var(--color-blush);
}

.faq__wrap {
  max-width: 820px;
}

details {
  border-bottom: 1px solid rgba(27, 24, 99, 0.2);
  padding: 20px 0;
}

summary {
  cursor: pointer;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 20px;
  font-family: var(--font-serif);
  font-size: clamp(1.35rem, 2.4vw, 1.6rem);
  line-height: 1.25;
  color: var(--color-ink);
}

summary::-webkit-details-marker {
  display: none;
}

summary::after {
  content: "+";
  flex: none;
  font-family: var(--font-sans);
  font-size: 1.6rem;
  line-height: 1;
  color: var(--color-ink);
  transition: transform 0.2s;
}

details[open] summary::after {
  transform: rotate(45deg);
}

details p {
  margin-top: 12px;
}
</style>
