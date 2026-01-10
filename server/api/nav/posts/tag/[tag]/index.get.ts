export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const tag = event.context.params?.tag

  console.log(`${config.public.API_BASE_URL}/blog/posts/tag/${tag}`)

  return await $fetch<BlogPost[]>(
    `${config.public.API_BASE_URL}/blog/posts/tag/${tag}`
  )
})
