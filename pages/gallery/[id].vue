<template>
  <div class="min-h-screen w-screen p-6">
    <div class="columns-1 gap-4 sm:columns-2 lg:columns-3">
      <div v-for="(img, i) in current?.images" @click="openPreview(img)">
        <NuxtImg
          :key="i"
          :src="img"
          loading="lazy"
          decoding="async"
          class="mb-4 w-full break-inside-avoid rounded shadow"
          sizes="lg:33vw md:50vw sm:100vw"
          :placeholder="false"
          :alt="current?.id"
          format="webp"
        />
      </div>
    </div>

    <!-- 预览层 -->
    <div
      v-if="preview"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      @click="preview = ''"
    >
      <img :src="preview" class="max-h-full max-w-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import galleryList from '@/assets/data/gallery'
import { ref, computed } from 'vue'
const {
  public: { OSS_BASE_URL },
} = useRuntimeConfig()

const fullList = galleryList.map((item) => ({
  ...item,
  cover: OSS_BASE_URL + item.cover,
  images: item.images.map((img) => OSS_BASE_URL + img),
}))
const route = useRoute()
const id = route.params.id as string
const current = computed(() => fullList.find((g) => g.id === id))

const preview = ref('')
const openPreview = (src: string) => {
  preview.value = src
}
</script>
