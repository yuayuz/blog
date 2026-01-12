
export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  return await $fetch<TimeLineItem[]>(`${config.public.API_BASE_URL}/timeline`)
})