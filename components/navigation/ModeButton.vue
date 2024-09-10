<template>
  <div>
    <v-icon
      class="tw-text-white"
      :icon="
        mode === 'tw-light' ? 'mdi-weather-night' : 'mdi-white-balance-sunny'
      "
      @click="darkMode()"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useDisplay, useTheme } from "vuetify";

const { mdAndUp } = useDisplay();
const theme = useTheme();
const mode = ref<string | null>("tw-light");

const modeModel = defineModel("modeModel");
onMounted(() => {
  localStorage.theme = "tw-light"; // 初始为light模式
  mode.value = localStorage.getItem("theme");
});
// 观测 Vuetify 的 mdAndUp(960px),发生改变时重新设置 mode 的值
// 确保不同分辨率下的模式切换 icon 正确
watch(mdAndUp, () => {
  mode.value = localStorage.getItem("theme");
});
watch(modeModel, () => {
  mode.value = localStorage.getItem("theme");
});
const darkMode = () => {
  if (theme.global.current.value.dark) {
    theme.global.name.value = "light";
    document.documentElement.classList.remove("tw-dark");
    localStorage.theme = "tw-light";
    modeModel.value = "tw-light";
  } else {
    theme.global.name.value = "dark";
    document.documentElement.classList.add("tw-dark");
    localStorage.theme = "tw-dark";
    modeModel.value = "tw-dark";
  }
  mode.value = localStorage.getItem("theme");
};
</script>

<style scoped></style>
