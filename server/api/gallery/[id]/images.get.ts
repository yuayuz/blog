export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const query = getQuery(event) // page, page_size
  const config = useRuntimeConfig()

  const res = await $fetch(
    `${config.public.API_BASE_URL}/rust/gallery/${id}/images`,
    {
      params: query,
    }
  )

  return res
})
