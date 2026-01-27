<template>
  <h1 class="mb-4 text-2xl font-bold">
    {{ tag ? `${tag}` : '全部文章' }}
  </h1>
  <ul class="space-y-6">
    <li v-for="post in posts" :key="post.id" class="border-b pb-4">
      <BlogPostItem :post="post" />
    </li>
  </ul>
</template>
<script setup lang="ts">
useSeoMeta({
  title: '博客',
  description: '一年匆匆忙忙，没有记录有能留下什么呢',
  ogTitle: '博客文章列表',
  ogType: 'website',
})
const route = useRoute()
definePageMeta({
  layout: 'side-nav',
})

const tag = route.query.tag as string

// 根据 tag 是否存在来决定请求哪个 API
const apiUrl = computed(() => {
  return tag ? `/api/nav/posts/tag/${tag}` : '/api/nav/posts'
})

const { data: posts, error } = await useFetch<BlogPost[]>(apiUrl.value)

useSeoMeta({})
</script>
<style></style>
