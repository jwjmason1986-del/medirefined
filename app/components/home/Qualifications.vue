<script setup lang="ts">
import { qualifications as q } from '#shared/site'
</script>

<template>
  <section id="qualifications" class="section">
    <div class="wrap">
      <h2>{{ q.title }}</h2>
      <p>{{ q.intro }}</p>
      <div class="quals">
        <div v-for="item in q.items" :key="item.title">
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </div>
      </div>
      <div class="practitioner">
        <h3>{{ q.practitioner.title }}</h3>
        <dl>
          <div v-for="[label, value] in q.practitioner.rows" :key="label">
            <dt>{{ label }}:</dt>
            <dd>{{ value }}</dd>
          </div>
        </dl>
      </div>
      <p class="note">{{ q.note }}</p>
    </div>
  </section>
</template>

<style scoped>
.quals {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px 56px;
  margin-top: 40px;
}

.quals > div {
  padding-top: 18px;
  border-top: 1px solid var(--color-gold);
}

.quals h3 {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 6px;
}

.practitioner {
  margin-top: 40px;
  padding: 26px 30px;
  border: 1px solid var(--color-gold);
  border-radius: 14px;
  background: #fff;
}

.practitioner h3 {
  font-size: 1.4rem;
}

.practitioner dl {
  margin: 0;
}

.practitioner dl > div {
  display: flex;
  flex-wrap: wrap;
  column-gap: 6px;
}

.practitioner dt,
.practitioner dd {
  margin: 0;
}

.note {
  font-size: 0.88rem;
  margin-top: 24px;
}

@media (max-width: 767px) {
  .quals {
    grid-template-columns: 1fr;
  }

  .practitioner {
    padding: 22px;
  }
}
</style>
