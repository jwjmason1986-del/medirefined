<script setup lang="ts">
import { site } from '#shared/site'

useHead({
  meta: [{ name: 'theme-color', content: '#ffffff' }],
})
const siteUrl = useSiteConfig().url
useSeoMeta({
  title: site.title,
  titleTemplate: '%s',
  description: site.description,
  ogType: 'website',
  ogSiteName: site.name,
  ogImage: `${siteUrl}/og/home.jpg`,
  ogImageAlt: `${site.name} — Botox and dermal filler consultations`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogLocale: 'en_GB',
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator color="#a8895f" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
