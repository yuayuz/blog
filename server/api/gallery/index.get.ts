interface GalleryItem {
  title: string
  description: string
  cover_image: string
  name: string
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const data = await $fetch<GalleryItem[]>(
    `${config.public.API_BASE_URL}/gallery`
  )
  return data
})