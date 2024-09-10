<template>
  <div v-if="props.card != null" class="tw-mx-auto tw-w-11/12 tw-space-y-5">
    <v-card
      v-for="n in props.card.length"
      :key="n"
      rounded="lg"
      class="px-6 hover:tw-text-pictureTone tw-min-h-20 tw-content-center"
      @click="navigate(`article-${route.params.group}/${props.card[n - 1].id}`)"
    >
      <div class="tw-flex tw-justify-between">
        <div class="tw-w-fit tw-text-2xl">{{ props.card[n - 1].title }}</div>
        <div class="tw-w-fit tw-text-base tw-opacity-30">
          {{ new Date(props.card[n - 1].updated_at).toLocaleString() }}
        </div>
      </div>
      <div class="tw-text-base tw-opacity-60">
        {{ props.card[n - 1].preview }}
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "#imports";
import type { PageListProps } from "~/types/navigation";
import { navigate } from "~/utils/navigation";

const props = defineProps<PageListProps>();

const route = useRoute();
</script>

<style scoped></style>
