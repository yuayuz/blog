<template>
  <div class="tw-mb-4 tw-text-center tw-text-2xl">liftNotes</div>

  <page-list :card="lifeNoteListMessage" />
</template>

<script setup lang="ts">
import { definePageMeta } from "#imports";
import type { PageListMessage } from "~/types/main";
import { setListMessage } from "~/utils/setPageList";

definePageMeta({
  layout: "nav-layout",
});
const lifeNoteListMessage: PageListMessage[] = setListMessage("lifeNote", 30);
</script>

<style scoped></style>
