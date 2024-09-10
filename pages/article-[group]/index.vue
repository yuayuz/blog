<template>
  <page-list :card="lists" />
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
