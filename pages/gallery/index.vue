<template>
  <div class="h-screen w-screen">
    <div class="mx-auto p-6">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="(item, index) in gallery"
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
import galleryList from '@/assets/data/gallery'
const {
  public: { API_BASE_URL, OSS_BASE_URL },
} = useRuntimeConfig()

interface GalleryItem {
  title: string
  description: string
  cover_image: string
  name: string
}

const fullList = galleryList.map((item) => ({
  ...item,
  cover: OSS_BASE_URL + item.cover,
  images: item.images.map((img) => OSS_BASE_URL + img),
}))

const { data: gallery, error } = await useFetch<GalleryItem[]>('/gallery', {
  baseURL: import.meta.server ? 'http://127.0.0.1:8000' : '/api',
})
</script>
