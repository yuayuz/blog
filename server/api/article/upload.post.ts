export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const authorization = getHeader(event, 'authorization')
  if (!authorization?.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: '请输入发布密钥' })
  }
  // Stream the multipart body; the backend enforces authentication and size limits.
  return proxyRequest(event, `${config.public.API_BASE_URL}/blog/upload`, {
    streamRequest: true,
    headers: { authorization },
  })
})
