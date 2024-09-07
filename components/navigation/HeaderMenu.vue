<template>
  <div :hidden="!isOpen" class="tw-mt-20 tw-space-y-5 tw-px-8">
    <menu-button v-for="n in props.buttons.length" :key="n"
      >{{ t(props.buttons[n - 1].title) }}
    </menu-button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "#imports";
import MenuButton from "~/components/navigation/MenuButton.vue";
import type { NavigationButton } from "~/types/navigation";

const { t } = useI18n();

interface Props {
  buttons: NavigationButton[];
}

const isOpen = defineModel();
const props = defineProps<Props>();
</script>

<style scoped></style>
