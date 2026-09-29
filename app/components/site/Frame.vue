<!-- Decorative gold double frame fixed around the viewport (the original html::after). Sizes come from the
     --frame-* tokens in main.css, which shrink on phones so the lines never cross text. -->
<template>
  <div class="site-frame" aria-hidden="true" />
</template>

<style scoped>
.site-frame {
  position: fixed;
  inset: var(--frame-inset);
  border: var(--frame-width) solid var(--color-gold);
  outline: var(--frame-outline) solid var(--color-gold);
  outline-offset: var(--frame-gap);
  pointer-events: none;
  z-index: 60; /* above the sticky header (50), below the mobile menu (70) */
}
</style>
