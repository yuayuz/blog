<template>
  <div v-if="list != null" class="tw-mx-auto tw-w-11/12 tw-space-y-5">
    <div class="tw-flex tw-items-center tw-justify-between tw-px-4">
      <div class="tw-text-4xl">{{ route.params.group }}</div>
      <div class="tw-w-1/2">
        <v-text-field
          variant="outlined"
          type="input"
          clearable
          v-model="query"
          @click:clear="query = ''"
          :label="t('search')"
          :messages="setMessages()"
        ></v-text-field>
      </div>
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
        </v-list>
      </v-menu>
    </div>
    <div v-if="query === ''" class="tw-space-y-5">
      <v-card
        v-for="n in list.length"
        :key="n"
        rounded="lg"
        class="px-6 tw-min-h-20 tw-content-center hover:tw-text-pictureTone"
        @click="navigate(`article-${route.params.group}/${list[n - 1].id}`)"
      >
        <div class="tw-flex tw-justify-between">
          <div class="tw-w-fit tw-text-2xl">{{ list[n - 1].title }}</div>
          <div class="tw-w-fit tw-text-base tw-opacity-30">
            {{ new Date(list[n - 1].updated_at).toLocaleString() }}
          </div>
        </div>
        <div class="tw-text-base tw-opacity-60">
          {{ list[n - 1].preview }}
        </div>
      </v-card>
    </div>
    <div v-else-if="query != '' && queryList != undefined" class="tw-space-y-5">
      <v-card
        v-for="n in queryList.length"
        :key="n"
        rounded="lg"
        class="px-6 tw-min-h-20 tw-content-center hover:tw-text-pictureTone"
        @click="
          navigate(`article-${route.params.group}/${queryList[n - 1].id}`)
        "
      >
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
</template>

<script setup lang="ts">
import { onMounted, ref, useI18n, useRoute, watch } from "#imports";
import type { PageListMessage } from "~/types/main";
import type { PageListProps } from "~/types/navigation";
import {
  compareByUpdatedAsc,
  compareByUpdatedDesc,
} from "~/utils/ArticleListSort";
import { navigate } from "~/utils/navigation";

const props = defineProps<PageListProps>();
const list = props.card;
const route = useRoute();
const open = ref(false);
const query = ref("");
const queryList = ref<PageListMessage[] | undefined>();
const sortItem = ref("根据最后更新时间递减排序");
const { t } = useI18n();
onMounted(() => {
  list?.sort(compareByUpdatedDesc);
});
watch(query, () => {
  queryList.value = list?.filter((item) => item.title.includes(query.value));
});
const setMessages = function () {
  if (queryList.value?.length === 0 && query.value != "") {
    return "搜索结果不存在";
  } else if (queryList.value != undefined && query.value != "") {
    return `搜索结果条数为：${queryList.value.length}`;
  }
};
const sortList = function (
  fun: (x: PageListMessage, y: PageListMessage) => number,
) {
  list?.sort(fun);
};
</script>

<style scoped></style>
