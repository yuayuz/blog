export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const type = event.context.params?.type

  return await $fetch<BlogPost[]>(
    `${config.public.API_BASE_URL}/rust/blog/posts/type/${type}`
  )
})
