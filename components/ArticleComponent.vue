<template>
  <v-card>
    <div class="tw-px-4 tw-py-2">
      <div class="tw-mb-4 tw-text-4xl">{{ props.title }}</div>
      <div class="tw-text-base">{{ date }}</div>
      <div class="tw-mt-10 tw-text-base">你好</div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "#imports";

interface Props {
  title: string;
}

const props = defineProps<Props>();
const date = ref<string>();
date.value = new Date().toLocaleString();
</script>

<style scoped></style>
