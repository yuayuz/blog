<template>
  <div class="relative">
    <!-- 时间轴线 -->
    <div
      class="absolute left-1/2 hidden h-full w-0.5 -translate-x-1/2 transform bg-gray-200 md:block dark:border-zinc-700"
    ></div>

    <!-- 时间轴项目 -->
    <div v-for="(item, index) in timeline" :key="index" class="relative mb-12">
      <div
        class="flex w-full items-center"
        :class="index % 2 === 0 ? 'justify-start' : 'justify-end'"
      >
        <!-- 左侧内容（偶数项） -->
        <div class="hidden w-1/3 justify-start md:flex" v-if="index % 2 === 0">
          <TimeLineTimelineItem :item="item" />
        </div>

        <!-- 中间时间轴点和日期（移动端） -->
        <div
          class="mx-auto flex w-fit flex-col items-center justify-start md:hidden"
        >
          <!-- 移动端日期 -->
          <span class="mt-2 text-sm font-medium text-gray-500 md:hidden">{{
            item.happened_at
          }}</span>
        </div>

        <!-- 右侧内容（奇数项） -->
        <div class="hidden w-1/3 justify-end md:flex" v-if="index % 2 !== 0">
          <TimeLineTimelineItem :item="item" />
        </div>
        <!-- 移动端内容（全部显示在下方） -->
        <div class="mt-4 w-full pl-4 md:hidden">
          <TimeLineTimelineItem :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  timeline: {
    type: Array as PropType<TimeLineItem[]>,
    required: true,
  },
})
</script>
