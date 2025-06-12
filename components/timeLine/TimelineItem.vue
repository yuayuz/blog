<template>
  <div
    class="inline-block max-w-md rounded-xl bg-white p-6 dark:shadow-zinc-500 shadow-lg shadow-zinc-900/40 dark:bg-zinc-800"
  >
    <div class="flex items-center justify-between md:block">
      <h3 class="text-xl font-bold text-gray-900 dark:text-zinc-100">
        {{ item.title }}
      </h3>
      <span
        class="mt-1 hidden text-sm font-medium text-gray-500 md:inline-block dark:text-zinc-400"
        >{{ item.date }}</span
      >
    </div>
    <p class="mt-2 text-gray-600 dark:text-zinc-300">{{ item.description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
