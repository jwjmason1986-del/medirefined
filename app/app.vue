<script setup lang="ts">
import { site } from '#shared/site'

useHead({
  meta: [{ name: 'theme-color', content: '#f9f7f1' }],
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
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator color="#b9a487" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
