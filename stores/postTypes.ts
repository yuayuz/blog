// ~/stores/postTypes.ts
import { defineStore } from 'pinia'

const POST_TYPE_COLORS = [
  'hover:text-orange-500',
  'hover:text-green-500',
  'hover:text-sky-500',
  'hover:text-purple-500',
  'hover:text-rose-500',
] as const

export const usePostTypesStore = defineStore('postTypes', () => {
  const postTypeList: Ref<PostTypeItem[]> = ref([])

  async function fetchPostTypes() {
    try {
      const { data: postTypes, error } = await useFetch<PostTypeItem[]>(
        '/api/nav/allPostTypes'
      )

      if (error.value) {
        console.error('获取文章分类失败:', error.value)
        return
      }

      // 如果获取成功，则更新列表并分配颜色
      if (postTypes.value) {
        postTypeList.value = postTypes.value.map((item, index) => ({
          ...item,
          // 循环使用颜色数组中的颜色
          color: POST_TYPE_COLORS[index % POST_TYPE_COLORS.length],
        }))
      }
    } catch (err) {
      console.error('获取文章分类时发生未预期错误:', err)
    }
  }

  return {
    postTypeList,
    fetchPostTypes,
  }
})
