<template>
  <v-card class="tw-mx-auto tw-w-11/12" v-if="message != null">
    <div class="tw-px-4 tw-py-2">
      <div class="tw-mb-4 tw-text-4xl">{{ message[0].title }}</div>
      <div class="tw-text-base">
        {{ new Date(message[0].updated_at).toLocaleString() }}
      </div>
      <div class="tw-mt-10 tw-text-base">{{ message[0].content }}</div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { useFetch, useRoute } from "#imports";
import type { Article } from "~/types/main";

const route = useRoute();
const { data: message } = await useFetch<Article[]>(
  `/api/${route.params.group}/${route.params.id}`,
);
</script>

<style scoped></style>
