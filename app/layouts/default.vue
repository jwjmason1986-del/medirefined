<template>
  <div class="flex min-h-dvh flex-col">
    <SiteFrame />
    <SiteHeader />
    <main id="top" class="flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
