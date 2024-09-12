<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" size="large">
        {{ sortItem }}
        <template v-slot:append>
          <v-icon :icon="open ? ' mdi-chevron-up' : ' mdi-chevron-down'" />
        </template>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        @click="
          sortList(list, compareByUpdatedDesc);
          sortItem = '根据最后更新时间递减排序';
        "
        >根据最后更新时间递减排序
      </v-list-item>
      <v-list-item
        @click="
          sortList(list, compareByUpdatedAsc);
          sortItem = '根据最后更新时间递增排序';
        "
        >根据最后更新时间递增排序
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { ref } from "#imports";
import type { PageListMessage } from "~/types/main";
import {
  compareByUpdatedAsc,
  compareByUpdatedDesc,
  sortList,
} from "~/utils/ArticleListSort";

const list = defineModel<PageListMessage[]>("list", { required: true });
const open = ref(false);
const sortItem = ref("根据最后更新时间递减排序");
</script>

<style scoped></style>
