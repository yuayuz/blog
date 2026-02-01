export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const tag = event.context.params?.tag

  return await $fetch<BlogPost[]>(
    `${config.public.API_BASE_URL}/rust/blog/posts/tag/${tag}`
  )
})
