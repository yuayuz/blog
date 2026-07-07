

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const data = await $fetch<PostTypeItem[]>(
    `${config.public.API_BASE_URL}/blog/primaryTypes`
  )
  return data
})