<template>
  <div class="tw-mb-4 tw-text-center tw-text-2xl">learning</div>
  <page-list :card="learningListMessage" />
</template>

<script setup lang="ts">
import { definePageMeta } from "#imports";
import type { PageListMessage } from "~/types/main";
import { setListMessage } from "~/utils/setPageList";

definePageMeta({
  layout: "nav-layout",
});

const learningListMessage: PageListMessage[] = setListMessage("learning", 30);
</script>

<style scoped></style>
