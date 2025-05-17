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
          @click="item.path ? goTo(item.path) : item.action?.()"
          :title="item.name"
        >
          <Icon :name="'my-icon:' + item.icon"> </Icon>
        </button>
      </nav>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const nav = [
  { name: 'Home', icon: 'home', color: 'hover:text-red-500', path: '/' },
  {
    name: 'blog',
    icon: 'notebook',
    color: 'hover:text-orange-500',
    path: '/blog',
  },
  {
    name: 'Gallery',
    icon: 'camera',
    color: 'hover:text-green-500',
    path: '/gallery',
  },
  {
    name: 'GitHub',
    icon: 'github',
    color: 'hover:text-sky-500',
    path: 'https://github.com/yuayuz?tab=overview&from=2025-05-01&to=2025-05-17',
  },
  {
    name: 'Theme',
    icon: 'sun',
    color: 'hover:text-purple-500',
    action: () => toggleTheme(),
  },
  {
    name: 'Sound',
    icon: 'volume-2',
    color: 'hover:text-rose-500',
    action: () => toggleSound(),
  },
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

const router = useRouter()
const goTo = (path: string) => {
  // 判断是否为外部链接
  if (path.startsWith('http')) {
    window.open(path, '_blank') // 在新标签页打开
  } else {
    // 内部路由
    const router = useRouter()
    router.push(path)
  }
}
const toggleTheme = () => {
  console.log('暂未实现主题切换')
  alert('暂未实现主题切换')
}

const toggleSound = () => {
  console.log('暂未实现声音切换')
  alert('暂未实现声音切换')
}
</script>
<style></style>
