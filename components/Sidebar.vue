<template>
  <div class="space-y-4 max-md:hidden">
    <div class="mb-16">
      <div>
        <NuxtLink
          class="text-5xl font-extrabold text-gray-400 transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-pink-500 hover:via-yellow-400 hover:to-blue-500 hover:bg-clip-text hover:text-transparent"
          to="/"
        >
          谁是谁
        </NuxtLink>
      </div>
    </div>
    <ul
      class="space-y-2 text-sm text-gray-600"
      v-for="(item, index) in postTypesStore.postTypeList"
      :key="index"
    >
      <li>
        <NuxtLink
          :to="{
            path: `/blog/category-${item.type}`,
            query: { name: String(item.name) },
          }"
          class="text-lg"
          :class="item.color"
          >{{ item.name }}</NuxtLink
        >
      </li>
    </ul>
  </div>
  <div
    class="custom-scroll sticky z-30 overflow-x-auto border-b border-gray-400 bg-white px-3 py-2 whitespace-nowrap md:hidden dark:border-gray-700 dark:bg-[#010409]"
  >
    <div class="flex space-x-4">
      <div
        class="space-y-2 text-sm text-gray-700 dark:text-gray-400"
        v-for="(item, index) in postTypesStore.postTypeList"
        :key="index"
      >
        <NuxtLink
          :to="{
            path: `/blog/category-${item.type}`,
            query: { name: String(item.name) },
          }"
          class="text-lg"
          :class="item.color"
          >{{ item.name }}</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const postTypesStore = usePostTypesStore()
</script>

<style>
.custom-scroll {
  overflow-x: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}
.custom-scroll::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}
</style>
