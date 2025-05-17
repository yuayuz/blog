<template>
  <div class="h-screen bg-gray-100/40 dark:bg-black">
    <div class="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 lg:flex-row">
      <Sidebar />
      <div class="w-full"><slot /></div>
    </div>
    <FooterNav />
  </div>
</template>
<script setup lang="ts"></script>
<style></style>
