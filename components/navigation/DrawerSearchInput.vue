<template>
  <div class="tw-px-4">
    <v-text-field
      v-model="query"
      :label="t('search')"
      clearable
      @click:clear="query = ''"
      variant="outlined"
      :messages="props.inputMessages"
    ></v-text-field>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "#imports";

interface Props {
  inputMessages: string;
}

const props = defineProps<Props>();
const { t } = useI18n();
const query = defineModel("query", { type: String, default: "" });
</script>

<style scoped></style>
