<template>
  <div :hidden="!isOpen" class="tw-mt-20 tw-space-y-5 tw-px-8">
    <header-navigation-button
      v-for="n in props.buttons.length"
      :key="n"
      @click="
        navigate(props.buttons[n - 1].navigation);
        isOpen = false;
      "
      >{{ t(props.buttons[n - 1].title) }}
    </header-navigation-button>
    <header-navigation-menu-button
      v-for="n in props.menuButtons.length"
      :key="n"
      :menu="props.menuButtons[n - 1]"
      v-model:is-open="isOpen"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "#imports";
import HeaderNavigationButton from "~/components/navigation/HeaderNavigationButton.vue";
import HeaderNavigationMenuButton from "~/components/navigation/HeaderNavigationMenuButton.vue";
import type { NavigationButton, NavigationMenu } from "~/types/navigation";
import { navigate } from "~/utils/navigation";

const { t } = useI18n();

interface Props {
  buttons: NavigationButton[];
  menuButtons: NavigationMenu[];
}

const isOpen = defineModel();
const props = defineProps<Props>();
</script>

<style scoped></style>
