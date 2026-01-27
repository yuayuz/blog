<template>
  <div class="h-screen w-screen">
    <div class="mx-auto p-6">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="item in gallery"
          :key="item.name"
          :to="`${item.name}`"
          class="overflow-hidden rounded-lg shadow transition hover:shadow-lg"
        >
          <img :src="item.cover_image" class="h-48 w-full object-cover" />
          <div class="p-4">
            <h2 class="text-xl font-semibold dark:text-white">
              {{ item.title }}
            </h2>
            <p class="text-sm text-gray-600">{{ item.description }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '摄影',
  description: '这里记录了我拍摄的照片，包含生活、城市与日常瞬间。',
  ogTitle: '摄影作品',
  ogDescription: '个人摄影记录与图片集',
  ogType: 'website',
})
interface GalleryItem {
  title: string
  description: string
  cover_image: string
  name: string
}

const { data: gallery, error } = await useFetch<GalleryItem[]>('/api/gallery')

if (error.value) {
  console.error('获取图片目录失败:', error.value)
}
</script>
