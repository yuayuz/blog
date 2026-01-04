// ~/stores/postTypes.ts
import { defineStore } from 'pinia'

export const usePostTypesStore = defineStore('postTypes', {
  state: () => ({
    postTypeList: [] as PostTypeItem[]
  }),
  actions: {
    async fetchPostTypes() {
      const colors = [
        'hover:text-orange-500',
        'hover:text-green-500',
        'hover:text-sky-500',
        'hover:text-purple-500',
        'hover:text-rose-500'
      ]

      const res = await $fetch<PostTypeItem[]>('/api/nav/allPostTypes')

      if (res) {
        this.postTypeList = res.map((item, index) => ({
          ...item,
          color: colors[index % colors.length]
        }))
      }
    }
  }
})
