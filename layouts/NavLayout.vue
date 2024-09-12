<template>
  <!-- 导航布局: md(960px)以上,采用 drawer 侧边导航; md (960px)以下,采用 header 导航 -->
  <div class="tw-block md:tw-hidden">
    <header-component
      v-model:is-open="isHidden"
      v-model:is-search="isSearch"
      v-model:query="query"
      v-model:input-messages="inputMessages"
    />
    <!-- 根据接收的 isOpen 决定是否隐藏 main 区域,以此实现只有菜单展现的效果 -->
    <div class="tw-mx-auto tw-max-w-screen-2xl tw-p-4" :hidden="isHidden">
      <slot v-if="!isSearch" />
      <drawer-search
        v-model:query="query"
        v-model:input-messages="inputMessages"
        v-model:is-search="isSearch"
      />
    </div>
  </div>

  <div class="tw-relative tw-mx-auto tw-hidden tw-max-w-[100rem] md:tw-block">
    <div
      class="tw-relative tw-flex tw-h-fit tw-max-w-[100rem] tw-items-center tw-justify-center"
    >
      <div
        class="tw-absolute tw-py-4 tw-text-center tw-text-6xl tw-font-black tw-text-white"
        style="z-index: 1"
      >
        {{ t(pages["home"].title) }}
        <div class="home_text tw-mt-3 tw-text-xl tw-text-white tw-opacity-70">
          如一颗星闪过，随一本书解困，由一幅画吸引，乘一班车飞过， 沉迷一个人。
        </div>
      </div>
      <v-img :src="img" />
    </div>
    <div class="tw-relative tw-mx-auto tw-mt-5 tw-max-w-screen-2xl tw-px-4">
      <drawer-component
        v-model:is-open="isOpen"
        v-model:is-search="isSearch"
        v-model:query="query"
        v-model:input-messages="inputMessages"
      />
      <!-- 根据接收的 isOpen 决定是否隐藏主页面,以此改变 main 区域的大小 -->
      <div :class="['tw-py-4', { 'tw-ml-64': isOpen }]">
        <slot v-if="!isSearch" />
        <drawer-search
          v-model:query="query"
          v-model:input-messages="inputMessages"
          v-model:is-search="isSearch"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import img from "public/img_home.png";

import { pages } from "@/assets/navigation";
import { ref, useI18n } from "#imports";
import DrawerComponent from "~/components/navigation/DrawerComponent.vue";
import DrawerSearch from "~/components/navigation/DrawerSearch.vue";
import HeaderComponent from "~/components/navigation/HeaderComponent.vue";

const isHidden = ref();
const query = ref<string>("");
const inputMessages = ref<string>("");
const isSearch = ref<boolean>(false);
const isOpen = ref();
const { t } = useI18n();
</script>

<style scoped></style>
