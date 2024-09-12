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
    class="tw-sticky tw-top-0 tw-h-16 tw-w-full tw-content-center tw-bg-light_background tw-shadow dark:tw-bg-pictureTone"
    style="z-index: 1"
  >
    <div
      class="tw-mx-auto tw-flex tw-max-w-screen-2xl tw-items-center tw-justify-between tw-px-6"
    >
      <div @click="navigate(pages['home'].navigation)">
        {{ t(pages["home"].title) }}
      </div>

      <div class="tw-flex tw-items-center tw-space-x-3">
        <v-overlay
          class="align-center justify-center"
          content-class="tw-w-11/12 tw-mx-auto"
        >
          <template v-slot:activator="{ props }">
            <v-icon
              icon="mdi-magnify"
              @click="
                isSearchOpen = true;
                isOpen = false;
              "
              v-bind="props"
            />
          </template>
          <div
            class="tw-content-center tw-justify-center tw-rounded-lg tw-bg-surface tw-py-3 dark:tw-bg-surface_dark"
          >
            <drawer-search-input
              :input-messages="inputMessages"
              v-model:query="query"
            />
          </div>
        </v-overlay>
        <mode-button />
        <v-icon
          :icon="isOpen ? 'mdi-close' : 'mdi-menu'"
          size="large"
          @click="
            isOpen = !isOpen;
            isSearchOpen = false;
          "
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

import { navigate, ref, useI18n, watch } from "#imports";
import { menuButtons, pages } from "~/assets/navigation";
import DrawerSearchInput from "~/components/navigation/DrawerSearchInput.vue";
import HeaderMenu from "~/components/navigation/HeaderMenu.vue";
import I18nMenu from "~/components/navigation/I18nMenu.vue";
import ModeButton from "~/components/navigation/ModeButton.vue";

const { t } = useI18n();
// 使用 v-model 通知导航布局菜单是否打开
const isOpen = defineModel("isOpen");
const isSearchOpen = ref(false);
const query = defineModel<string>("query", { default: "", required: true });
const isSearch = defineModel<boolean>("isSearch", {
  default: false,
  required: true,
});
const inputMessages = defineModel<string>("inputMessages", {
  default: "",
  required: true,
});
watch(query, () => {
  if (query.value !== "") {
    isSearch.value = true;
  }
});
watch(isSearch, () => {
  if (!isSearch.value) {
    query.value = "";
  }
});
</script>

<style scoped></style>
