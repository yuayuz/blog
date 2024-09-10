<template>
  <div class="tw-fixed tw-my-2 tw-mr-3 tw-max-w-64 tw-px-2" :hidden="!isOpen">
    <div
      class="dark:tw-bg-pictureTone tw-rounded-xl tw-border tw-px-1 tw-py-3 tw-shadow"
    >
      <div class="tw-my-4 tw-space-y-2 tw-text-center tw-text-2xl">
        <v-btn
          v-for="n in pages['buttons'].length"
          :key="n"
          class="hover:tw-text-pictureTone dark:hover:tw-text-pictureTone_deep tw-w-full"
          variant="text"
          @click="navigate(pages['buttons'][n - 1].navigation)"
        >
          <p class="tw-text-2xl">{{ t(pages["buttons"][n - 1].title) }}</p>
        </v-btn>
        <photo-menu
          v-for="n in menuButtons.length"
          :key="n"
          :menu="menuButtons[n - 1]"
        />
      </div>
      <div class="tw-mx-auto tw-w-fit tw-space-y-2">
        <div class="tw-flex tw-justify-center tw-space-x-6">
          <mode-button />
          <v-icon
            :icon="isOpen ? 'mdi-close' : 'mdi-menu'"
            size="large"
            @click="isOpen = !isOpen"
          />
        </div>
        <i18n-menu />
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
import { menuButtons, pages } from "~/assets/navigation";
import I18nMenu from "~/components/navigation/I18nMenu.vue";
import ModeButton from "~/components/navigation/ModeButton.vue";
import PhotoMenu from "~/components/navigation/PhotoMenu.vue";
import { navigate } from "~/utils/navigation";

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
