export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  return await $fetch<BlogPost[]>(`${config.public.API_BASE_URL}/blog/allPosts`)
})
