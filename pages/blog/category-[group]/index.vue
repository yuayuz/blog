<template>
  <h1 class="mb-4 text-2xl font-bold">{{ name }}</h1>
  <ul class="space-y-6">
    <li v-for="post in posts" :key="post.id" class="border-b pb-4">
      <BlogPostItem :post="post" />
    </li>
  </ul>
</template>
<script setup lang="ts">
const route = useRoute()
definePageMeta({
  layout: 'side-nav',
})
const name = route.query.name as string
const category = route.params.group as string
const { data: posts, error } = await useFetch<BlogPost[]>(
  `/api/nav/posts/${category}`
)

useSeoMeta({})
</script>
<style></style>
