<script setup lang="ts">
import { site } from '#shared/site'

usePageSeo({ title: site.title, description: site.description, og: 'home' })
</script>

<template>
  <div>
    <HomeHero />
    <HomeTreatments />
    <HomeAreas />
    <HomeExpect />
    <HomeSafety />
    <HomeReviews />
    <HomeFaq />
    <HomeBookForm />
  </div>
</template>
