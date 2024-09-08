<template>
  <!-- 使用 fixed 悬浮, z-index 设为 1 -->
  <div
    class="tw-fixed tw-top-0 tw-h-16 tw-w-full tw-content-center tw-bg-white tw-shadow dark:tw-bg-violet-800"
    style="z-index: 1"
  >
    <div
      class="tw-mx-auto tw-flex tw-max-w-screen-2xl tw-items-center tw-justify-between tw-px-6"
    >
      <div @click="navigate(pages['home'].navigation)">
        {{ t(pages["home"].title) }}
      </div>

      <div class="tw-flex tw-items-center tw-space-x-3">
        <mode-button />
        <v-icon
          :icon="isOpen ? 'mdi-close' : 'mdi-menu'"
          size="large"
          @click="isOpen = !isOpen"
        />
        <i18n-mune />
      </div>
    </div>
  </div>
  <header-menu v-model="isOpen" :buttons="pages['buttons']" />
</template>

<script setup lang="ts">
import { navigate, useI18n } from "#imports";
import { pages } from "~/assets/navigation";
import HeaderMenu from "~/components/navigation/HeaderMenu.vue";
import I18nMune from "~/components/navigation/I18nMune.vue";
import ModeButton from "~/components/navigation/ModeButton.vue";

const { t } = useI18n();
// 使用 v-model 通知导航布局菜单是否打开
const isOpen = defineModel("isOpen");
</script>

<style scoped></style>
