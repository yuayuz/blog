<template>
  <div class="w-full lg:w-1/4">
    <div class="sticky space-y-4 top-24">
      <div class="mb-16">
        <div>
        <NuxtLink
          class="text-5xl font-extrabold text-gray-400 transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-pink-500 hover:via-yellow-400 hover:to-blue-500 hover:bg-clip-text hover:text-transparent"
          to="/"
        >
          谁是谁
        </NuxtLink></div>
      </div>
      <ul
        class="space-y-2 text-sm text-gray-600"
        v-for="(item, index) in list"
        :key="index"
      >
        <li>
          <NuxtLink to="/" class="hover:text-black text-lg">{{ item.name }}</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const list = [
  { name: '导航一' },
  { name: '导航二' },
  { name: '导航三' },
  { name: '导航四' },
]
</script>
