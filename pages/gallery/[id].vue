<template>
  <div class="min-h-screen w-screen p-6">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(imgPath, i) in imagesList"
        :key="imgPath"
        @click="openPreview(imgPath)"
        class="overflow-hidden rounded shadow"
      >
        <div class="aspect-[4/3] bg-gray-100">
          <img
            :src="`${API_BASE_URL}/image/${imgPath}`"
            loading="lazy"
            decoding="async"
            class="block h-full w-full object-cover"
          />
        </div>
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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

const {
  public: { API_BASE_URL },
} = useRuntimeConfig()
const route = useRoute()
const albumTitle = `摄影集 · ${route.params.id}`

useSeoMeta({
  title: albumTitle,
  description: '个人摄影记录与图片集',

  ogTitle: albumTitle,
  ogDescription: '个人摄影记录与图片集',
  ogType: 'article',
})
const id = route.params.id as string

const page = ref(1)
const pageSize = 9
const loading = ref(false)
const noMore = ref(false)

type GalleryImage = string
const imagesList = ref<GalleryImage[]>([])

async function loadMore() {
  if (loading.value || noMore.value) return
  loading.value = true

  const newImages = await $fetch<string[]>(`/api/gallery/${id}/images`, {
    params: { page: page.value, page_size: pageSize },
  })

  imagesList.value.push(...newImages)

  if (newImages.length < pageSize) noMore.value = true
  page.value++
  loading.value = false
}

function onScroll() {
  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 200
  ) {
    loadMore()
  }
}

onMounted(() => {
  loadMore()
  window.addEventListener('scroll', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

const preview = ref('')
const openPreview = (src: string) => {
  preview.value = `${API_BASE_URL}/image/${src}`
  // 使用 server 存在问题
  // preview.value = `/api/image?src=${src}`
}
</script>
