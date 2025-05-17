<template>
  <div>{{ route.params.group }}</div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'side-nav',
})
const route = useRoute()
</script>
<style></style>
