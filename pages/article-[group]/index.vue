<template>
  <div>
    <div class="tw-mb-4 tw-text-center tw-text-2xl">
      {{ $route.params.group }}
    </div>

    <page-list :card="lists" />
  </div>
</template>

<script setup lang="ts">
import { definePageMeta, useFetch, useRoute } from "#imports";
import type { PageListMessage } from "~/types/main";

const route = useRoute();
definePageMeta({
  layout: "nav-layout",
});

const { data: lists } = await useFetch<PageListMessage[]>(
  `/api/${route.params.group}`,
);
</script>

<style scoped></style>
