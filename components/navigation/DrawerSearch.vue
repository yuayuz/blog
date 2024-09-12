<template>
  <div
    :class="['tw-py-4', { 'tw-ml-64': props.isOpen }]"
    v-if="isSearch && queryList != undefined"
  >
    <div
      class="tw-relative tw-mx-auto tw-hidden tw-w-11/12 tw-space-y-5 md:tw-block"
    >
      <div>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" size="large">
              {{ sortItem }}
              <template v-slot:append>
                <v-icon
                  :icon="open ? ' mdi-chevron-up' : ' mdi-chevron-down'"
                />
              </template>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              @click="
                sortList(compareByUpdatedDesc);
                sortItem = '根据最后更新时间递减排序';
              "
              >根据最后更新时间递减排序
            </v-list-item>
            <v-list-item
              @click="
                sortList(compareByUpdatedAsc);
                sortItem = '根据最后更新时间递增排序';
              "
              >根据最后更新时间递增排序
            </v-list-item>
            <v-list-item
              @click="
                sortList(compareByGroupDesc);
                sortItem = '根据类别递减排序';
              "
              >根据类别递减排序
            </v-list-item>
            <v-list-item
              @click="
                sortList(compareByGroupAsc);
                sortItem = '根据类别递增排序';
              "
              >根据类别递增排序
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div class="tw-w-full tw-space-y-5">
        <v-card
          v-for="n in queryList.length"
          :key="n"
          rounded="lg"
          class="px-6 tw-min-h-20 tw-content-center tw-space-y-1 hover:tw-text-pictureTone"
          @click="
            isSearch = false;
            navigate(
              `article-${queryList[n - 1].group_type}/${queryList[n - 1].id}`,
            );
          "
        >
          <div class="tw-w-fit tw-text-2xl tw-opacity-40">
            {{ t(`group.${queryList[n - 1].group_type}`) }}
          </div>
          <div class="tw-flex tw-justify-between">
            <div class="tw-w-fit tw-text-2xl">{{ queryList[n - 1].title }}</div>
            <div class="tw-w-fit tw-text-base tw-opacity-30">
              {{ new Date(queryList[n - 1].updated_at).toLocaleString() }}
            </div>
          </div>
          <div class="tw-text-base tw-opacity-60">
            {{ queryList[n - 1].preview }}
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  compareByUpdatedAsc,
  compareByUpdatedDesc,
  navigate,
  ref,
  useFetch,
  useI18n,
  watch,
} from "#imports";
import type { PageListMessage } from "~/types/main";
import { compareByGroupAsc, compareByGroupDesc } from "~/utils/ArticleListSort";

interface Props {
  isOpen: boolean;
}

const props = defineProps<Props>();
const { t } = useI18n();
const open = ref(false);
const query = defineModel("query", { type: String, default: "" });
const inputMessages = defineModel("inputMessages", {
  type: String,
  default: "",
});
const isSearch = defineModel("isSearch", { type: Boolean, default: false });
watch(query, () => {
  if (query.value != "" && list.value === null) {
    getQueryList();
  } else if (query.value != "" && list.value !== null) {
    setQueryList();
  } else if (query.value === "") {
    isSearch.value = false;
    inputMessages.value = " ";
  }
});
let list = ref<PageListMessage[] | null>(null);
let queryList = ref<PageListMessage[] | null>();
const getQueryList = async function () {
  const { data } = await useFetch<PageListMessage[]>(`/api/article`);
  list.value = data.value;
  queryList.value = list.value;
  queryList.value = queryList.value?.filter((item) =>
    item.title.includes(query.value),
  );
  queryList.value?.sort(compareByUpdatedDesc);
};
const setQueryList = function () {
  queryList.value = list.value;
  queryList.value = queryList.value?.filter((item) =>
    item.title.includes(query.value),
  );
  queryList.value?.sort(compareByUpdatedDesc);
};
const sortItem = ref("根据最后更新时间递减排序");
watch(queryList, () => {
  if (queryList.value?.length === 0 && query.value != "") {
    inputMessages.value = "搜索结果不存在";
  } else if (queryList.value != undefined && query.value != "") {
    inputMessages.value = `搜索结果条数为：${queryList.value.length}`;
  }
});
const sortList = function (
  fun: (x: PageListMessage, y: PageListMessage) => number,
) {
  queryList.value?.sort(fun);
};
</script>

<style scoped></style>
