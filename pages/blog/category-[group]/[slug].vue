<template>
  <div class="dark:text-gray-400">
    <main class="mx-auto max-w-3xl flex-1 px-6 py-8">
      <!-- 标题 -->
      <h1 class="mb-4 text-3xl font-bold">{{ post?.title }}</h1>

      <!-- 时间（可选） -->
      <p class="mb-6 text-sm text-gray-500">
        {{ post?.date }}
      </p>

      <!-- 虚线分隔线 -->
      <hr
        class="mb-6 border-t border-dashed border-gray-500 dark:border-gray-600"
      />

      <!-- 正文内容 -->
      <article class="prose dark:prose-invert max-w-none">
        <ContentRenderer :value="post?.body || {}" />
      </article>
    </main>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'side-nav',
})
const route = useRoute()
const path = `/${route.params.group}`

const { data: post } = await useAsyncData(() =>
  queryCollection('content').path(path).order('date', 'DESC').first()
)
</script>
<style></style>
