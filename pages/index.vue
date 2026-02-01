<template>
  <h1
    class="text-center text-[clamp(4rem,10vw,8rem)] font-extrabold text-gray-400 transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-pink-500 hover:via-yellow-400 hover:to-blue-500 hover:bg-clip-text hover:text-transparent"
  >
    谁是谁
  </h1>
</template>
<script setup lang="ts">
useSeoMeta({
  title: '首页',
  description: '记录，而不是遗忘',
})
console.log('NODE_ENV', process.env.NODE_ENV)
console.log('API', useRuntimeConfig().public.API_BASE_URL)
</script>
<style></style>
