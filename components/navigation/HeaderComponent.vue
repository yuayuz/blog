<template>
  <!-- 使用 fixed 悬浮, z-index 设为 1 -->
  <div class="tw-sticky">
    <v-img :src="img" style="z-index: -1" class="tw-flex tw-items-center">
      <div
        class="tw-absolute tw-mx-auto tw-w-full tw-justify-center tw-px-10 tw-text-center tw-text-base tw-text-white tw-opacity-60"
      >
        如一颗星闪过，随一本书解困，由一幅画吸引，乘一班车飞过， 沉迷一个人。
      </div>
    </v-img>
  </div>
  <div
    class="tw-sticky tw-top-0 tw-h-16 tw-w-full tw-content-center tw-bg-white tw-shadow dark:tw-bg-[#D99438]"
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
        <i18n-menu />
      </div>
    </div>
  </div>
  <header-menu
    v-model="isOpen"
    :buttons="pages['buttons']"
    :menu-buttons="menuButtons"
  />
</template>

<script setup lang="ts">
import img from "public/img_header.png";

import { navigate, useI18n } from "#imports";
import { menuButtons, pages } from "~/assets/navigation";
import HeaderMenu from "~/components/navigation/HeaderMenu.vue";
import I18nMenu from "~/components/navigation/I18nMenu.vue";
import ModeButton from "~/components/navigation/ModeButton.vue";

const { t } = useI18n();
// 使用 v-model 通知导航布局菜单是否打开
const isOpen = defineModel("isOpen");
</script>

<style scoped></style>
