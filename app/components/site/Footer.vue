<script setup lang="ts">
import { contact, site } from '#shared/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer id="contact" class="site-footer">
    <div class="wrap">
      <div class="site-footer__grid">
        <div>
          <h3>{{ site.name }}</h3>
          <p>{{ site.tagline }}</p>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>Phone: {{ contact.phone }}</li>
            <li>Email: {{ contact.email }}</li>
            <li>Address: {{ contact.address }}</li>
          </ul>
        </div>
        <div>
          <h4>Opening hours</h4>
          <ul>
            <li v-for="[day, hours] in contact.hours" :key="day">{{ day }}: {{ hours }}</li>
          </ul>
        </div>
        <div>
          <h4>Follow us</h4>
          <ul>
            <li v-for="[network, handle] in contact.social" :key="network">{{ network }}: {{ handle }}</li>
          </ul>
        </div>
      </div>
      <p class="site-footer__legal">&copy; {{ year }} {{ site.name }}. {{ contact.disclaimer }}</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  background: var(--color-ink-deep);
  color: var(--color-on-ink-muted);
  font-size: 0.88rem;
  /* Bottom padding clears the fixed frame lines. */
  padding: 44px 0 calc(var(--frame-inset) + 36px);
}

.site-footer__grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 1fr;
  gap: 36px;
  padding-bottom: 28px;
  margin-bottom: 24px;
  border-bottom: 1px solid rgba(185, 164, 135, 0.3);
  font-size: 0.95rem;
}

h3 {
  font-weight: 300;
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 8px;
}

h4 {
  margin: 0 0 12px;
  font-family: var(--font-sans);
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-gold);
  font-weight: 600;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 6px;
  overflow-wrap: anywhere;
}

.site-footer__legal {
  max-width: 80ch;
}

@media (max-width: 899px) {
  .site-footer__grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 519px) {
  .site-footer__grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
</style>
