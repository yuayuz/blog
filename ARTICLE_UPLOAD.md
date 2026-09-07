# 网页发布文章

入口：文章列表右上角「上传文章」，或直接访问 `/blog/upload`。

1. 在 **Rust 后端**环境中设置 `BLOG_UPLOAD_TOKEN`，使用至少 32 字符的随机密钥，重启后端。不要放入 Nuxt public 配置或提交到 Git。
2. 前端继续使用现有 `API_BASE_URL` 指向后端；重新构建、部署前后端。生产环境使用 HTTPS。
3. 选择 UTF-8 `.md` 文件（最大 1 MiB），填写标题、分类、摘要和逗号分隔的标签，输入密钥发布。

无需数据库迁移。网页填写的信息替换文件 front matter，发布时间使用当前时间。Markdown 中的图片需事先上传并使用在线地址。成功后可直接查看文章或继续上传。

`POST /api/article/upload` 代理至后端 `POST /blog/upload`，携带 `Authorization: Bearer <密钥>`。multipart 包含一个文件及可选 `metadata` JSON（title、category、description、tags）。原有直接 HTTP 上传调用也必须带密钥；本地 CLI 不受影响。

后端默认请求上限 2 MiB，检查 UTF-8、扩展名、正文、标题路径字符、分类与元数据长度。同名网页请求使用数据库事务锁串行处理，已有标题返回 409，不支持覆盖。上传成功但数据库提交结果未知时保留 OSS 对象，避免误删；可检查数据库后重试。CLI 与网页不要同时发布同名文章。
