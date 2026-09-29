<script setup lang="ts">
import { site } from '#shared/site'

usePageSeo({ title: site.title, description: site.description, og: 'home' })
</script>

<template>
  <div>
    <HomeHero />
    <HomeCompare />
    <HomeZones />
    <HomeProcess />
    <HomeQualifications />
    <HomeReviews />
    <HomeFaq />
    <HomeBookForm />
  </div>
</template>
