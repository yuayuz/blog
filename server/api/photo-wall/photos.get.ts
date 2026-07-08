export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const config = useRuntimeConfig()

  const data = await $fetch(`${config.public.API_BASE_URL}/photo-wall`, {
    query: { count: query.count || 20 },
  })

  return data
})
