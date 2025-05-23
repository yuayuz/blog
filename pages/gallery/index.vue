<template>
  <div class="h-screen w-screen">
    <div class="mx-auto p-6">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="item in galleryList"
          :key="item.id"
          :to="`/gallery/${item.id}`"
          class="overflow-hidden rounded-lg shadow transition hover:shadow-lg"
        >
          <img :src="item.cover" class="h-48 w-full object-cover" />
          <div class="p-4">
            <h2 class="text-xl font-semibold">{{ item.title }}</h2>
            <p class="text-sm text-gray-600">{{ item.description }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import galleryList from '@/assets/data/gallery.json'
</script>
