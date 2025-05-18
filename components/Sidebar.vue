<template>
  <div class="space-y-4">
    <div class="mb-16">
      <div>
        <NuxtLink
          class="text-5xl font-extrabold text-gray-400 transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-pink-500 hover:via-yellow-400 hover:to-blue-500 hover:bg-clip-text hover:text-transparent"
          to="/"
        >
          谁是谁
        </NuxtLink>
      </div>
    </div>
    <ul
      class="space-y-2 text-sm text-gray-600"
      v-for="(item, index) in list"
      :key="index"
    >
      <li>
        <NuxtLink
          :to="{
            path: `/blog/category-${item.dir}`,
            query: { name: item.name },
          }"
          class="text-lg"
          :class="item.color"
          >{{ item.name }}</NuxtLink
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const list = [
  { name: '技术笔记', dir: 'tech', color: 'hover:text-orange-500' },
  { name: '日常随笔', dir: 'life', color: 'hover:text-green-500' },
  { name: '学习笔记', dir: 'study', color: 'hover:text-sky-500' },
  { name: '阅读分享', dir: 'reading', color: 'hover:text-purple-500' },
  { name: '项目实践', dir: 'projects', color: 'hover:text-rose-500' },
]
</script>
