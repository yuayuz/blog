<template>
  <div class="tw-mb-4 tw-text-center tw-text-2xl">reading</div>
  <page-list :card="readingListMessage" />
</template>

<script setup lang="ts">
import { definePageMeta } from "#imports";
import type { PageListMessage } from "~/types/main";
import { setListMessage } from "~/utils/setPageList";

definePageMeta({
  layout: "nav-layout",
});
const readingListMessage: PageListMessage[] = setListMessage("reading", 30);
</script>

<style scoped></style>
