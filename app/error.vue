<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const is404 = computed(() => props.error.statusCode === 404)
useSeoMeta({ title: is404.value ? 'Page not found | MediRefined' : 'Something went wrong | MediRefined', robots: 'noindex' })
</script>

<template>
  <UApp>
    <NuxtLayout>
      <section class="section flex min-h-[60vh] items-center bg-cream">
        <div class="wrap flex w-full flex-col items-center gap-6 text-center">
          <p class="text-sm font-semibold uppercase tracking-[0.14em] text-gold">{{ is404 ? 'Error 404' : `Error ${error.statusCode}` }}</p>
          <h1 class="title">{{ is404 ? 'This page could not be found.' : 'Something went wrong.' }}</h1>
          <p class="max-w-[520px] text-lg text-muted">
            {{ is404 ? 'The page you were looking for has moved or no longer exists.' : 'Please try again in a moment.' }}
          </p>
          <a :href="asset('/')" class="pill pill--solid pill--lg" @click.prevent="clearError({ redirect: '/' })">Back to home</a>
        </div>
      </section>
    </NuxtLayout>
  </UApp>
</template>
