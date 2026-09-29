<script setup lang="ts">
import { treatments } from '#shared/site'
</script>

<template>
  <section id="treatments" class="section treatments">
    <div class="wrap">
      <div class="is-center">
        <h2 class="title">{{ treatments.title }}<br><em>{{ treatments.titleAccent }}</em></h2>
        <div class="rule" />
        <p class="intro" style="margin-top: 24px">{{ treatments.intro }}</p>
      </div>

      <div class="treatments__grid">
        <article v-for="t in treatments.items" :key="t.name" class="card">
          <div>
            <p class="card__tag">{{ t.tag }}</p>
            <h3>{{ t.name }}</h3>
            <p class="card__desc">{{ t.desc }}</p>
          </div>
          <dl>
            <div v-for="[label, value] in t.facts" :key="label" class="card__fact">
              <dt>{{ label }}</dt>
              <dd>{{ value }}</dd>
            </div>
          </dl>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.treatments {
  background: var(--color-cream);
}

.treatments__grid {
  margin-top: 64px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr));
  gap: 20px;
}

.card {
  background: var(--color-beige);
  border-radius: 28px;
  padding: clamp(32px, 4vw, 48px);
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.card__tag {
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-gold);
}

h3 {
  font-family: var(--font-serif);
  font-size: 40px;
  font-weight: 500;
  letter-spacing: -0.005em;
  line-height: 1.1;
}

.card__desc {
  margin-top: 14px;
  font-size: 17px;
  line-height: 1.5;
  color: var(--color-secondary);
}

dl {
  margin: 0;
}

.card__fact {
  padding: 18px 0;
  border-top: 1px solid var(--color-line);
  display: grid;
  grid-template-columns: minmax(0, 140px) minmax(0, 1fr);
  gap: 16px;
}

dt {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-ink);
}

dd {
  margin: 0;
  font-size: 15px;
  line-height: 1.5;
  color: var(--color-secondary);
}

/* Narrow phones: label above value so the value column isn't squeezed. */
@media (max-width: 479px) {
  .card {
    border-radius: 22px;
    padding: 28px 22px;
  }

  h3 {
    font-size: 34px;
  }

  .card__fact {
    grid-template-columns: 1fr;
    gap: 4px;
    padding: 14px 0;
  }
}
</style>
