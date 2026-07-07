export default defineEventHandler(async (event) => {
  const { src } = getQuery(event)
  if (!src) return { error: '需要图片地址' }

  const config = useRuntimeConfig()
  const buffer = await $fetch<ArrayBuffer>(
    `${config.public.API_BASE_URL}/image/${src}`
  )
  return buffer
})