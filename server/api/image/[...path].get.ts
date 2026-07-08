export default defineEventHandler(async (event) => {
  const pathSegments = event.context.params?.path
  if (!pathSegments) {
    throw createError({ statusCode: 400, statusMessage: '缺少图片路径' })
  }

  const imgPath = Array.isArray(pathSegments)
    ? pathSegments.join('/')
    : pathSegments

  const config = useRuntimeConfig()
  const backendUrl = `${config.public.API_BASE_URL}/image/${imgPath}`

  const res = await fetch(backendUrl)
  if (!res.ok) {
    throw createError({ statusCode: res.status, statusMessage: `后端返回 ${res.status}` })
  }

  const buffer = Buffer.from(await res.arrayBuffer())

  const ext = imgPath.split('.').pop()?.toLowerCase()
  const mimeMap: Record<string, string> = {
    jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
    webp: 'image/webp', gif: 'image/gif', svg: 'image/svg+xml', bmp: 'image/bmp',
  }

  setHeader(event, 'Content-Type', mimeMap[ext || ''] || 'image/jpeg')
  setHeader(event, 'Cache-Control', 'public, max-age=86400')
  return buffer
})
