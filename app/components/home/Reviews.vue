<script setup lang="ts">
import { reviews } from '#shared/site'
</script>

<template>
  <section id="reviews" class="section reviews">
    <div class="wrap">
      <h2>{{ reviews.title }}</h2>
      <p>{{ reviews.intro }}</p>
      <div class="reviews__grid">
        <figure v-for="(r, i) in reviews.items" :key="i">
          <blockquote>{{ r.quote }}</blockquote>
          <figcaption>
            {{ r.name }}, {{ r.treatment }}
            <span v-if="r.sample" class="reviews__sample">Sample text: replace with a real client review</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviews {
  background: var(--color-ink);
  color: var(--color-on-ink);
}

h2 {
  color: #fff;
}

.reviews__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 48px;
  border-top: 1px solid var(--color-gold);
}

figure {
  margin: 0;
  padding: 36px 32px 12px 0;
}

figure + figure {
  padding-left: 32px;
  border-left: 1px solid rgba(255, 255, 255, 0.18);
}

figure:last-child {
  padding-right: 0;
}

blockquote {
  font-family: var(--font-serif);
  font-size: clamp(1.4rem, 2vw, 1.6rem);
  line-height: 1.35;
  color: #f4f0e6;
  margin: 0 0 20px;
}

blockquote::before {
  content: "\201C";
  display: block;
  font-size: 4.2rem;
  line-height: 0.6;
  color: var(--color-gold);
  margin-bottom: 12px;
}

figcaption {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--color-gold-soft);
}

.reviews__sample {
  display: block;
  font-weight: 400;
  font-size: 0.8rem;
  color: #a9a8c8;
  margin-top: 2px;
}

/* Tablet: two columns, the third review runs full width underneath. */
@media (min-width: 640px) and (max-width: 899px) {
  .reviews__grid {
    grid-template-columns: 1fr 1fr;
  }

  figure:nth-child(3) {
    grid-column: 1 / -1;
    padding: 28px 0 12px;
    margin-top: 12px;
    border-left: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.18);
  }

  figure:nth-child(3) blockquote {
    max-width: 34ch;
  }
}

@media (max-width: 639px) {
  .reviews__grid {
    grid-template-columns: 1fr;
  }

  figure,
  figure + figure {
    padding: 28px 0 8px;
    border-left: 0;
  }

  figure + figure {
    border-top: 1px solid rgba(255, 255, 255, 0.18);
    margin-top: 16px;
  }
}
</style>
