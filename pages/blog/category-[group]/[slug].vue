<template>
  <div>{{ route.params.group }}</div>
  <div>{{ route.params.slug }}</div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'side-nav',
})
const route = useRoute()
</script>
<style></style>
