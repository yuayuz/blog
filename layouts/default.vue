<template>
  <div>
    <slot />
    <div class="fixed bottom-20 flex w-screen justify-center">
      <nav
        class="fixed right-1/2 z-50 flex translate-x-1/2 space-x-3 rounded-full bg-white px-4 py-2 ring ring-gray-200 backdrop-blur-lg transition-transform duration-100 hover:scale-160 dark:bg-black/40"
      >
        <button
          v-for="(item, index) in nav"
          :key="item.name"
          class="ransition-transform flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-white transition-transform duration-300 ease-in-out dark:bg-gray-800"
          :class="getClass(index)"
          @mouseenter="setHover(index)"
          @mouseleave="setHover(null)"
          :title="item.name"
        >
          <Icon :name="'my-icon:' + item.icon" />
        </button>
      </nav>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const nav = [
  { name: 'Home', icon: 'home', color: 'hover:text-red-500' },
  { name: 'blog', icon: 'notebook', color: 'hover:text-orange-500' },
  { name: 'Gallery', icon: 'camera', color: 'hover:text-green-500' },
  { name: 'GitHub', icon: 'github', color: 'hover:text-sky-500' },
  { name: 'Email', icon: 'mail', color: 'hover:text-purple-500' },
  { name: 'Theme', icon: 'sun', color: 'hover:text-rose-500' },
  { name: 'Sound', icon: 'volume-2', color: 'hover:text-zinc-500' },
]

// 悬停索引
const hoveredIndex = ref<number | null>(null)

const setHover = (i: number | null) => {
  hoveredIndex.value = i
}

function getClass(index: number): string {
  if (hoveredIndex.value === null) return 'scale-100 translate-y-0'

  const distance = Math.abs(index - hoveredIndex.value)
  const baseColor = nav[index].color
  switch (distance) {
    case 0:
      return `scale-125 -translate-y-3 ${baseColor} `
    case 1:
      return `scale-120 -translate-y-2 ${baseColor} `
    case 2:
      return `scale-110 -translate-y-1 ${baseColor} `
    default:
      return `scale-100 translate-y-0 ${baseColor} `
  }
}
</script>
<style></style>
