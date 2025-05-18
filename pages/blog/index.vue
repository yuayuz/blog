<template>
  <div class="dark:text-gray-400">
    <main class="flex-1 px-6">
      <h1 class="mb-4 text-2xl font-bold">全部文章</h1>
      <ul class="space-y-6">
        <li v-for="post in posts" :key="post.id" class="border-b pb-4">
          <BlogPostItem :post="post" />
        </li>
      </ul>
    </main>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'side-nav',
})

const { data: posts } = await useAsyncData(() =>
  queryCollection('content').order('date', 'DESC').all()
)

useSeoMeta({})
</script>
<style></style>
