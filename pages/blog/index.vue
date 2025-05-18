<template>
  <h1 class="mb-4 text-2xl font-bold">
    {{ tag ? `${tag}` : '全部文章' }}
  </h1>
  <ul class="space-y-6">
    <li
      v-for="post in tag ? tagPosts : posts"
      :key="post.id"
      class="border-b pb-4"
    >
      <BlogPostItem :post="post" />
    </li>
  </ul>
</template>
<script setup lang="ts">
const route = useRoute()
definePageMeta({
  layout: 'side-nav',
})
const tag = route.query.tag as string

const { data: posts } = await useAsyncData(() =>
  queryCollection('content').order('date', 'DESC').all()
)
let tagPosts = null
if (tag != null) {
  tagPosts = computed(() =>
    posts.value?.filter((post) => post.tags?.includes(tag))
  )
}

useSeoMeta({})
</script>
<style></style>
