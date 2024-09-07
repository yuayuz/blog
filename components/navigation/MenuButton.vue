<template>
  <v-card class="tw-h-[5rem] tw-content-center">
    <div
      class="tw-flex tw-cursor-pointer tw-place-content-between tw-items-center tw-px-4 tw-py-2"
    >
      <p class="tw-text-black dark:tw-text-white">
        <slot />
      </p>
      <div class="tw-text-2xl">
        <v-icon
          class="tw-text-black tw-opacity-30 dark:tw-text-white"
          icon="mdi-chevron-right"
        />
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts"></script>
<style scoped></style>
