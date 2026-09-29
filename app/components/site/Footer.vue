<script setup lang="ts">
import { contact, site } from '#shared/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer id="contact" class="site-footer">
    <div class="wrap">
      <div class="site-footer__grid">
        <div>
          <div class="wordmark site-footer__mark">Medi<span>Refined</span></div>
          <p class="site-footer__tag">{{ site.tagline }}</p>
        </div>
        <div>
          <h2>Contact</h2>
          <ul>
            <li>Phone: {{ contact.phone }}</li>
            <li>Email: {{ contact.email }}</li>
            <li>Address: {{ contact.address }}</li>
          </ul>
        </div>
        <div>
          <h2>Opening hours</h2>
          <ul>
            <li v-for="[day, hours] in contact.hours" :key="day">{{ day }}: {{ hours }}</li>
          </ul>
        </div>
        <div>
          <h2>Follow us</h2>
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
  background: var(--color-navy-deep);
  padding: 56px 0 40px;
  font-size: 12px;
  color: var(--color-on-navy-faint);
}

.site-footer__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 32px;
  padding-bottom: 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.site-footer__mark {
  /* Same wordmark as the nav (Cormorant "Medi" + Pinyon Script "Refined"), a touch larger; white on navy. */
  font-size: 22px;
  color: #fff;
}

.site-footer__tag {
  margin-top: 8px;
  line-height: 1.5;
}

h2 {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-gold-light);
  line-height: 1.9;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  line-height: 1.9;
}

li {
  overflow-wrap: anywhere;
}

.site-footer__legal {
  margin-top: 20px;
  line-height: 1.6;
}

@media (max-width: 899px) {
  .site-footer__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 479px) {
  .site-footer__grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
