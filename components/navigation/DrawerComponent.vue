<template>
  <div
    class="tw-fixed tw-top-1/4 tw-my-10 tw-mr-3 tw-w-72 tw-items-center tw-p-2"
    :hidden="!isOpen"
  >
    <div
      class="tw-rounded-xl tw-border tw-px-4 tw-py-10 tw-shadow dark:tw-bg-violet-800"
    >
      <div class="tw-cursor-pointer tw-py-4 tw-text-center tw-text-3xl">
        {{ t(message["title"]) }}
      </div>
      <hr />
      <div class="tw-my-4 tw-space-y-2 tw-text-center tw-text-2xl">
        <v-btn
          v-for="n in message['buttons'].length"
          :key="n"
          class="tw-w-full tw-px-6 tw-py-2 hover:tw-text-purple-900 dark:hover:tw-text-pink-400"
          variant="text"
        >
          {{ t(message["buttons"][n - 1].title) }}
        </v-btn>
      </div>
      <div class="tw-mx-auto tw-w-fit tw-space-y-5">
        <div class="tw-flex tw-justify-center tw-space-x-6">
          <mode-button />
          <v-icon
            :icon="isOpen ? 'mdi-close' : 'mdi-menu'"
            size="large"
            @click="isOpen = !isOpen"
          />
        </div>
        <i18n-mune />
      </div>
    </div>
  </div>
  <div :hidden="isOpen" class="tw-fixed tw-top-1/2 tw-space-y-5">
    <mode-button />
    <div>
      <v-icon
        class="tw-fixed"
        :icon="isOpen ? 'mdi-close' : 'mdi-menu'"
        size="large"
        @click="isOpen = !isOpen"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useI18n, watch } from "#imports";
import I18nMune from "~/components/navigation/I18nMune.vue";
import ModeButton from "~/components/navigation/ModeButton.vue";
import type { Navigation } from "~/types/navigation";

const message: Navigation = {
  title: "title",
  buttons: [
    {
      title: "navigation.lifeNotes",
    },
    {
      title: "navigation.learning",
    },
    {
      title: "navigation.reading",
    },
    {
      title: "navigation.photos.title",
    },
  ],
};
const { t } = useI18n();
const isOpen = ref(true);
const model = defineModel("isOpen");
model.value = isOpen.value;
// 观察 isOpen ,改变时使用 v-model 通知导航布局改变 main 区域的大小
watch(isOpen, () => {
  model.value = isOpen.value;
});
</script>

<style scoped>
@import "@/stylus/button.css";
</style>
