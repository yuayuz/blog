import { MainNav } from '../.nuxt/components';
<template>
  <div class="h-screen bg-gray-100/40 dark:bg-black">
    <div
      class="mx-auto h-screen w-full max-w-7xl pt-16 md:flex md:gap-8 md:px-8 md:py-10"
    >
      <aside
        class="md:sticky md:top-24 md:flex md:h-fit md:w-56 md:shrink-0 lg:w-64"
      >
        <Sidebar />
      </aside>

      <main
        class="custom-scroll min-w-0 flex-1 overflow-y-auto px-4 max-md:pt-4 sm:px-6 md:py-8 dark:text-gray-400"
      >
        <slot />
      </main>
      <MainNav />
    </div>
  </div>
</template>
<script setup lang="ts">
const postTypesStore = usePostTypesStore()
if (!postTypesStore.postTypeList.length) {
  await postTypesStore.fetchPostTypes()
}
</script>
<style>
@media (min-width: 768px) {
  .custom-scroll {
    overflow-y: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE/Edge */
  }
  .custom-scroll::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }
}
</style>
