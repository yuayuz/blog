<template>
  <div class="min-h-screen max-md:w-full max-md:px-4 md:min-w-3xl">
    <!-- 页面标题 -->
    <div
      class="d mx-auto mt-3 mb-4 max-w-2xl text-center text-5xl text-black sm:mt-4 dark:text-white"
    >
      博客时间轴
    </div>

    <!-- 时间轴组件 -->
    <TimeLine :items="timelineItems" />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '时间轴 - 我的博客',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '我的博客发展历程时间轴',
        },
      ],
    }
  },
  data() {
    return {
      timelineItems: [
        {
          title: '博客部署',
          date: '2025年6月5日',
          description: '我的小博客上线咯',
        },
        {
          title: '博客拥有了自己的时间轴',
          date: '2023年6月12日',
          description: '时间轴记录博客的成长',
        },
        {
          title: '资源迁移',
          date: '2023年6月14日',
          description: '博客图片、多媒体等资源迁移到 OSS',
        },
      ],
    }
  },
}
</script>
