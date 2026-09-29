<script setup lang="ts">
import { safety } from '#shared/site'
</script>

<template>
  <section id="safety" class="section safety">
    <div class="wrap">
      <h2 class="title">{{ safety.title }}</h2>
      <div class="rule" />
      <p class="intro" style="max-width: 600px">{{ safety.intro }}</p>

      <div class="safety__grid">
        <div v-for="q in safety.items" :key="q.title" class="tile">
          <h3>{{ q.title }}</h3>
          <p>{{ q.body }}</p>
        </div>
      </div>

      <div class="practitioner">
        <h3>{{ safety.practitioner.title }}</h3>
        <div v-for="[label, value] in safety.practitioner.fields" :key="label" class="practitioner__field">
          <div class="practitioner__label">{{ label }}</div>
          {{ value }}
        </div>
      </div>

      <p class="safety__note">{{ safety.note }}</p>
    </div>
  </section>
</template>

<style scoped>
.safety {
  background: var(--color-beige);
}

.safety__grid {
  margin-top: 56px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: 16px;
}

.tile {
  background: #fff;
  border-radius: 22px;
  padding: 32px;
}

.tile h3 {
  font-size: 19px;
  font-weight: 600;
  letter-spacing: -0.015em;
}

.tile p {
  margin-top: 10px;
  font-size: 15px;
  line-height: 1.55;
  color: var(--color-muted);
}

.practitioner {
  margin-top: 16px;
  background: var(--color-navy);
  color: #fff;
  border-radius: 22px;
  padding: 36px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 24px;
  align-items: center;
}

.practitioner h3 {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.25;
}

.practitioner__field {
  font-size: 15px;
  line-height: 1.5;
}

.practitioner__label {
  color: var(--color-gold-light);
  font-size: 13px;
  font-weight: 600;
}

.safety__note {
  margin-top: 20px;
  font-size: 12px;
  color: var(--color-faint);
}

@media (max-width: 479px) {
  .tile {
    padding: 26px 24px;
  }

  .practitioner {
    padding: 28px 24px;
    gap: 18px;
  }
}
</style>
