<template>
  <div class="flex" style="flex-direction: column; height: 100%">
    <div class="mb-6 flex flex-wrap gap-2">
      <NuxtLink
        v-for="(tag, index) in data?.meta.tags || []"
        :key="tag"
        :to="{ path: '/blog', query: { tag: tag } }"
        class="rounded-full px-3 py-1 text-sm font-medium transition-all duration-300 hover:scale-105"
        :class="getTagStyle(index)"
      >
        {{ tag }}
      </NuxtLink>
    </div>
    <h1 class="mb-4 text-3xl font-bold">{{ data?.meta.title }}</h1>

    <p class="mb-6 text-sm text-gray-500">
      {{ data?.meta.date }}
    </p>

    <article :class="isDark ? 'markdown-dark' : 'markdown-light'">
      <div class="markdown-body" v-html="data?.html"></div>
    </article>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'side-nav',
})

const isDark = ref(false)

if (import.meta.client) {
  isDark.value = document.documentElement.classList.contains('dark')

  // 监听 class 变化
  const observer = new MutationObserver(() => {
    isDark.value = document.documentElement.classList.contains('dark')
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
}

const route = useRoute()

const { data } = await useAsyncData('article', async () => {
  const resp = await $fetch<ArticleResponse>('/api/article', {
    params: { article_name: route.params.article_name },
  })

  return toArticle(resp)
})

const meta = data.value?.meta

useSeoMeta({
  title: meta?.title,
  description: meta?.description,

  ogTitle: meta?.title,
  ogDescription: meta?.description,
  ogType: 'article',

  articlePublishedTime: meta?.date,
  articleSection: meta?.category,
  articleTag: meta?.tags,
})

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
