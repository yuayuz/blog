<template>
  <div class="mb-6 flex flex-wrap gap-2">
    <NuxtLink
      v-for="(tag, index) in post?.tags.split(',') || []"
      :key="tag"
      :to="{ path: '/blog', query: { tag: tag } }"
      class="rounded-full px-3 py-1 text-sm font-medium transition-all duration-300 hover:scale-105"
      :class="getTagStyle(index)"
    >
      {{ tag }}
    </NuxtLink>
  </div>
  <h1 class="mb-4 text-3xl font-bold">{{ post?.title }}</h1>

  <p class="mb-6 text-sm text-gray-500">
    {{ post?.date }}
  </p>

  <hr
    class="mb-6 border-t border-dashed border-gray-500 dark:border-gray-600"
  />

  <article class="prose dark:prose-invert max-w-none">
    <ContentRenderer :value="post?.body || {}" />
  </article>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'side-nav',
})
const route = useRoute()

const path = `/${route.params.group}/${route.params.slug}`

const { data: post } = await useAsyncData(() =>
  queryCollection('content').path(path).order('date', 'DESC').first()
)

const tagColors = [
  'bg-blue-100 text-blue-800 hover:bg-blue-200',
  'bg-green-100 text-green-800 hover:bg-green-200',
  'bg-purple-100 text-purple-800 hover:bg-purple-200',
  'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  'bg-pink-100 text-pink-800 hover:bg-pink-200',
  'bg-red-100 text-red-800 hover:bg-red-200',
]

const getTagStyle = (index: number) => tagColors[index % tagColors.length]
</script>
<style></style>
