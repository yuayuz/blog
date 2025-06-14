<template>
  <div
    class="flex min-h-screen w-full items-center justify-center bg-gray-100/40 dark:bg-black"
  >
    <div class="pt-16 max-md:w-full md:pt-0">
      <slot />
    </div>
    <MainNav />
  </div>
</template>
<script setup lang="ts"></script>
<style></style>
