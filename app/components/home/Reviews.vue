<script setup lang="ts">
import { reviews } from '#shared/site'
</script>

<template>
  <section id="reviews" class="section reviews">
    <div class="wrap">
      <h2 class="title reviews__title">{{ reviews.title }}</h2>
      <div class="rule" />
      <p class="reviews__intro">{{ reviews.intro }}</p>
      <div class="reviews__row">
        <figure v-for="(r, i) in reviews.items" :key="i">
          <span class="reviews__mark" aria-hidden="true">&ldquo;</span>
          <blockquote>{{ r.quote }}</blockquote>
          <figcaption>
            <div class="reviews__who">{{ r.who }}</div>
            <div v-if="r.sample" class="reviews__sample">Sample text, replace with real client reviews</div>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviews {
  background: var(--color-navy);
  color: #fff;
  padding-block: clamp(96px, 12vw, 140px);
}

.reviews__title {
  font-size: clamp(40px, 5vw, 56px);
}

.reviews__intro {
  margin-top: 20px;
  font-size: 17px;
  color: var(--color-on-navy);
}

/* A row of columns, no cards: 3 on desktop, 2 + 1 full-width on tablet, stacked on phones. */
.reviews__row {
  margin-top: 56px;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

figure {
  padding: 40px 32px 8px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

figure:first-child {
  padding-left: 0;
}

figure + figure {
  border-left: 1px solid rgba(255, 255, 255, 0.12);
}

figure:last-child {
  padding-right: 0;
}

.reviews__mark {
  height: 24px;
  font-family: var(--font-serif);
  font-size: 56px;
  line-height: 0.6;
  color: var(--color-gold);
}

blockquote {
  font-family: var(--font-serif);
  font-size: clamp(22px, 2.2vw, 26px);
  font-weight: 400;
  line-height: 1.4;
  color: #fff;
  text-wrap: pretty;
}

figcaption {
  font-size: 13px;
  line-height: 1.6;
}

.reviews__who {
  font-weight: 500;
  color: var(--color-gold-light);
}

.reviews__sample {
  color: var(--color-on-navy-faint);
}

@media (min-width: 640px) and (max-width: 899px) {
  .reviews__row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  figure:nth-child(2) {
    padding-right: 0;
  }

  figure:nth-child(3) {
    grid-column: 1 / -1;
    padding: 40px 0 8px;
    margin-top: 32px;
    border-left: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
  }

  figure:nth-child(3) blockquote {
    max-width: 30ch;
  }
}

@media (max-width: 639px) {
  .reviews__row {
    grid-template-columns: 1fr;
  }

  figure,
  figure + figure {
    padding: 36px 0 12px;
    border-left: 0;
  }

  figure + figure {
    margin-top: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
  }
}
</style>
