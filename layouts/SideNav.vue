<template>
  <div class="h-screen bg-gray-100/40 dark:bg-black">
    <div class="mx-auto flex h-screen max-w-6xl gap-8 px-4 py-10">
      <aside class="mt-12 hidden lg:top-24 lg:flex lg:w-64">
        <Sidebar />
      </aside>

      <main
        class="custom-scroll w-full flex-1 overflow-y-auto px-6 py-8 dark:text-gray-400"
      >
        <slot />
      </main>
      <FooterNav />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style>
.custom-scroll {
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}
.custom-scroll::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}
</style>
