<script setup lang="ts">
import { reviews } from '#shared/site'

const show = useShowReviews() // sample reviews never render on the live (indexable) site
const initials = (name: string) => name.split(/\s+/).map(p => p[0]).join('').replace('.', '')
</script>

<template>
  <section v-if="show" id="reviews" class="section reviews">
    <div class="wrap">
      <h2 class="title reviews__title">{{ reviews.title }}</h2>
      <div class="rule" />
      <p class="reviews__intro">{{ reviews.intro }}</p>
      <div class="reviews__row">
        <figure v-for="r in reviews.items" :key="r.name">
          <div class="reviews__stars" role="img" :aria-label="`Rated ${r.rating} out of 5`">
            <svg v-for="n in 5" :key="n" viewBox="0 0 20 20" aria-hidden="true" :class="{ off: n > r.rating }">
              <path d="M10 1.6l2.47 5.2 5.7.72-4.18 3.94 1.06 5.64L10 14.35 4.95 17.1l1.06-5.64L1.83 7.52l5.7-.72z" />
            </svg>
          </div>
          <blockquote>&ldquo;{{ r.quote }}&rdquo;</blockquote>
          <figcaption>
            <span class="reviews__avatar" aria-hidden="true">{{ initials(r.name) }}</span>
            <span>
              <span class="reviews__who">{{ r.name }}</span>
              <span class="reviews__what">{{ r.treatment }}</span>
            </span>
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

.reviews__stars {
  display: flex;
  gap: 4px;
}

.reviews__stars svg {
  width: 16px;
  height: 16px;
  fill: var(--color-gold);
}

.reviews__stars svg.off {
  fill: rgba(255, 255, 255, 0.2);
}

blockquote {
  flex: 1 1 auto;
  font-family: var(--font-serif);
  font-size: clamp(22px, 2.2vw, 26px);
  font-weight: 400;
  line-height: 1.4;
  color: #fff;
  text-wrap: pretty;
}

figcaption {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  line-height: 1.5;
}

.reviews__avatar {
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(168, 137, 95, 0.18);
  border: 1px solid rgba(201, 177, 142, 0.5);
  color: var(--color-gold-light);
  font: 500 15px/1 var(--font-serif);
  letter-spacing: 0.04em;
}

.reviews__who {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
}

.reviews__what {
  display: block;
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
