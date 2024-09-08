<template>
  <article-component :title="$route.params.title as string" />
</template>

<script setup lang="ts">
import { definePageMeta } from "#imports";

definePageMeta({
  layout: "nav-layout",
});
</script>

<style scoped></style>
