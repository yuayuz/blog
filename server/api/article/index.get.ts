export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const config = useRuntimeConfig()

  return await $fetch(`${config.public.API_BASE_URL}/rust/blog/article`, {
    params: query,
  })
})
