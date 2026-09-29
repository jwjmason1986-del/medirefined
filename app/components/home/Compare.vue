<script setup lang="ts">
import { compare } from '#shared/site'
</script>

<template>
  <section id="compare" class="section">
    <div class="wrap">
      <h2>{{ compare.title }}</h2>
      <p>{{ compare.intro }}</p>
      <div class="compare">
        <div v-for="item in compare.items" :key="item.name" class="compare__col">
          <h3>{{ item.name }}</h3>
          <p>{{ item.summary }}</p>
          <dl>
            <template v-for="[term, detail] in item.facts" :key="term">
              <dt>{{ term }}</dt>
              <dd>{{ detail }}</dd>
            </template>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid var(--color-line);
  margin-top: 48px;
}

.compare__col {
  padding: 36px 40px 12px 0;
}

.compare__col + .compare__col {
  padding-left: 40px;
  padding-right: 0;
  border-left: 1px solid var(--color-line);
}

dl {
  margin: 22px 0 0;
}

dt {
  font-weight: 600;
  color: var(--color-ink);
  margin-top: 18px;
}

dd {
  margin: 2px 0 0;
}

@media (max-width: 767px) {
  .compare {
    grid-template-columns: 1fr;
    margin-top: 36px;
  }

  .compare__col,
  .compare__col + .compare__col {
    padding: 28px 0 8px;
    border-left: 0;
  }

  .compare__col + .compare__col {
    margin-top: 20px;
    border-top: 1px solid var(--color-line);
  }
}
</style>
