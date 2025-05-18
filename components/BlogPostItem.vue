<template>
  <NuxtLink
    :to="`/blog/category-${props.post.category}/${props.post.stem.split('/').pop()}`"
    class="text-xl hover:underline"
  >
    {{ props.post.title }}
  </NuxtLink>
  <p class="mt-1 text-sm text-gray-500">
    {{ props.post.description || '无简介' }}
  </p>
  <p class="mt-1 text-xs text-gray-400">{{ props.post.date }}</p>
</template>
<script setup lang="ts">
import type { ContentCollectionItem } from '@nuxt/content'
interface Props {
  post: ContentCollectionItem
}

const props = defineProps<Props>()
</script>
<style></style>
