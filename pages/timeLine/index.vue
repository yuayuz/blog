<template>
  <div class="min-h-screen max-md:w-full max-md:px-4 md:min-w-3xl">
    <!-- 页面标题 -->
    <div
      class="d mx-auto mt-3 mb-4 max-w-2xl text-center text-5xl text-black sm:mt-4 dark:text-white"
    >
      博客时间轴
    </div>

    <!-- 时间轴组件 -->
    <TimeLine :timeline="timelineItems" />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'

useHead({
  title: '时间轴',
  meta: [
    {
      name: 'description',
      content: '拒绝遗忘',
    },
  ],
})

const { data: timelineItems } = await useFetch<TimeLineItem[]>('/api/timeline')
</script>
