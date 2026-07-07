

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  return await $fetch<PostTypeItem[]>(
    `${config.public.API_BASE_URL}/blog/allTypes`
  )
})