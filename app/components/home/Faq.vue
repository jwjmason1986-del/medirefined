<script setup lang="ts">
import { faqs } from '#shared/site'

// Accordion: one row open at a time, clicking the open row closes it, all start closed (handoff §8).
const open = ref(-1)
function toggle(i: number) {
  open.value = open.value === i ? -1 : i
}

useSchemaOrg([
  defineWebPage({ '@type': 'FAQPage' }),
  ...faqs.items.map(f => defineQuestion({ name: f.q, acceptedAnswer: f.a })),
])
</script>

<template>
  <section id="faq" class="section faq">
    <div class="wrap faq__wrap">
      <div class="is-center">
        <h2 class="title">{{ faqs.title }}</h2>
        <div class="rule" style="margin-bottom: 48px" />
      </div>
      <div class="faq__list">
        <div v-for="(f, i) in faqs.items" :key="f.q" class="faq__row">
          <h3>
            <button
              :id="`faq-q-${i}`"
              type="button"
              :aria-expanded="open === i"
              :aria-controls="`faq-a-${i}`"
              @click="toggle(i)"
            >
              <span>{{ f.q }}</span>
              <span class="faq__plus" :class="{ on: open === i }" aria-hidden="true">+</span>
            </button>
          </h3>
          <!-- v-show keeps answers in the DOM (crawlable, matches the FAQPage schema). -->
          <p v-show="open === i" :id="`faq-a-${i}`" role="region" :aria-labelledby="`faq-q-${i}`">{{ f.a }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq {
  background: var(--color-beige);
}

.faq__wrap {
  max-width: calc(820px + 44px);
}

.faq__list {
  border-top: 1px solid var(--color-line);
}

.faq__row {
  border-bottom: 1px solid var(--color-line);
}

h3 {
  margin: 0;
}

button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 26px 0;
  border: 0;
  background: none;
  text-align: left;
  font-family: var(--font-serif);
  font-size: 25px;
  font-weight: 500;
  line-height: 1.25;
  color: var(--color-navy);
}

.faq__plus {
  flex: none;
  font-family: var(--font-sans);
  font-size: 26px;
  font-weight: 300;
  line-height: 1;
  transition: transform 0.3s;
}

.faq__plus.on {
  transform: rotate(45deg);
}

p {
  padding: 0 48px 28px 0;
  font-size: 17px;
  line-height: 1.55;
  color: var(--color-secondary);
}

@media (max-width: 479px) {
  button {
    font-size: 22px;
    padding: 22px 0;
    gap: 16px;
  }

  p {
    padding-right: 8px;
    font-size: 16px;
  }
}
</style>
