<template>
  <!-- 导航布局: md(960px)以上,采用 drawer 侧边导航; md (960px)以下,采用 header 导航 -->
  <div class="tw-block md:tw-hidden">
    <header-component v-model:is-open="isHidden" />
    <!-- 根据接收的 isOpen 决定是否隐藏 main 区域,以此实现只有菜单展现的效果 -->
    <div
      class="tw-mx-auto tw-mt-20 tw-max-w-screen-2xl tw-px-4"
      :hidden="isHidden"
    >
      <slot />
    </div>
  </div>

  <div class="tw-mx-auto tw-hidden tw-max-w-screen-2xl md:tw-flex">
    <drawer-component v-model:is-open="isOpen" />
    <!-- 根据接收的 isOpen 决定是否隐藏主页面,以此改变 main 区域的大小 -->
    <div :class="['tw-w-full tw-py-4', isOpen ? 'tw-ml-80' : 'tw-ml-10']">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "#imports";
import DrawerComponent from "~/components/navigation/DrawerComponent.vue";
import HeaderComponent from "~/components/navigation/HeaderComponent.vue";

const isHidden = ref();
const isOpen = ref();
</script>

<style scoped></style>
