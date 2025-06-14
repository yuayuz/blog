import { MainNav } from '../.nuxt/components';
<template>
  <div class="h-screen bg-gray-100/40 dark:bg-black">
    <div
      class="mx-auto h-screen max-w-6xl pt-16 md:flex md:gap-8 md:p-16 md:py-10"
    >
      <aside class="md:top-24 md:flex md:w-64">
        <Sidebar />
      </aside>

      <main
        class="custom-scroll w-full flex-1 overflow-y-auto px-6 max-md:pt-4 md:py-8 dark:text-gray-400"
      >
        <slot />
      </main>
      <MainNav />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
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
