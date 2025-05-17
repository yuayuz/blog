<template>
  <div class="dark:text-gray-400">
    <div>blog 页面</div>
    <ContentRenderer v-if="home" :value="home" />
  <div v-else>Home not found</div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'side-nav',
})
const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())


useSeoMeta({
  title: home.value?.title,
  description: home.value?.description
})
</script>
<style></style>
