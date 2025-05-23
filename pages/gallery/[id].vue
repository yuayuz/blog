<template>
  <div class="min-h-screen w-screen p-6">
    <div class="columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3">
      <img
        v-for="(img, i) in current?.images"
        :key="i"
        :src="img"
        class="mb-4 w-full break-inside-avoid rounded shadow"
        @click="openPreview(img)"
      />
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
import galleryList from '@/assets/data/gallery.json'
import { ref, computed } from 'vue'

const route = useRoute()
const id = route.params.id as string
const current = computed(() => galleryList.find((g) => g.id === id))

const preview = ref('')
const openPreview = (src: string) => {
  preview.value = src
}
</script>
