<template>
  <NuxtLink
    :to="`/blog/category-${post.type}/${post.id}`"
    class="text-xl hover:underline"
  >
    {{ post.title }}
    <p class="mt-1 text-sm text-gray-500">
      {{ post.description || '无简介' }}
    </p>
    <p class="mt-1 text-xs text-gray-400">
      {{ new Date(post.created_at).toLocaleString() }}
    </p>
  </NuxtLink>
</template>
<script setup lang="ts">
interface Props {
  post: BlogPost
}

defineProps<Props>()
</script>
<style></style>
