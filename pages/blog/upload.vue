<script setup lang="ts">
useSeoMeta({ title: '上传文章', robots: 'noindex, nofollow' })
const { data: categories, error: categoryError } = await useFetch<
  { type_key: string; name: string }[]
>('/api/nav/allPostTypes')
const file = ref<File | null>(null)
const title = ref('')
const category = ref('')
const description = ref('')
const tags = ref('')
const token = ref('')
const busy = ref(false)
const error = ref('')
const published = ref<BlogPost | null>(null)
const input = ref<HTMLInputElement | null>(null)

function selectFile(event: Event) {
  const selected = (event.target as HTMLInputElement).files?.[0]
  file.value = null
  published.value = null
  error.value = ''
  if (!selected) return
  if (
    !selected.name.toLowerCase().endsWith('.md') ||
    selected.size > 1024 * 1024 ||
    selected.size === 0
  ) {
    error.value = '请选择非空的 .md 文件，大小不超过 1 MiB。'
    if (input.value) input.value.value = ''
    return
  }
  file.value = selected
  title.value = selected.name.slice(0, -3)
}

async function publish() {
  if (busy.value || !file.value || published.value) return
  error.value = ''
  const cleanTitle = title.value.trim()
  const cleanTags = [
    ...new Set(
      tags.value
        .split(/[,，]/)
        .map((tag) => tag.trim())
        .filter(Boolean)
    ),
  ]
  if (
    !cleanTitle ||
    cleanTitle.length > 120 ||
    /[\\/\u0000-\u001f\u007f?#%]/.test(cleanTitle) ||
    ['.', '..'].includes(cleanTitle)
  ) {
    error.value = '请输入有效标题（最多 120 字，不含 /、\\、?、#、%）。'
    return
  }
  if (cleanTags.length > 20 || cleanTags.some((tag) => tag.length > 40)) {
    error.value = '最多填写 20 个标签，每个标签不超过 40 字。'
    return
  }
  busy.value = true
  try {
    const raw = new TextDecoder('utf-8', { fatal: true }).decode(
      await file.value.arrayBuffer()
    )
    if (!raw.trim()) throw new Error('Markdown 文件正文不能为空。')
    const body = new FormData()
    body.append('file', file.value)
    body.append(
      'metadata',
      JSON.stringify({
        title: cleanTitle,
        category: category.value || null,
        description: description.value.trim() || null,
        tags: cleanTags,
      })
    )
    published.value = await $fetch<BlogPost>('/api/article/upload', {
      method: 'POST',
      body,
      headers: { Authorization: `Bearer ${token.value.trim()}` },
      retry: 0,
    })
    token.value = ''
    await refreshNuxtData()
  } catch (cause: any) {
    error.value =
      typeof cause?.data === 'string'
        ? cause.data
        : cause?.data?.statusMessage ||
          (cause instanceof TypeError
            ? '文件必须使用 UTF-8 编码。'
            : cause?.message || '发布失败，请稍后重试。')
  } finally {
    busy.value = false
  }
}

function reset() {
  file.value = null
  title.value =
    category.value =
    description.value =
    tags.value =
    token.value =
    error.value =
      ''
  published.value = null
  if (input.value) input.value.value = ''
}
</script>

<template>
  <main
    class="mx-auto w-full max-w-3xl px-5 py-10 pb-32 text-gray-900 md:min-w-[640px] dark:text-gray-100"
  >
    <NuxtLink to="/blog" class="text-sm text-gray-500 hover:underline"
      >← 返回文章列表</NuxtLink
    >
    <h1 class="mt-6 text-3xl font-bold">上传文章</h1>
    <p class="mt-3 text-sm text-gray-500">
      上传已经写好的 Markdown，补充文章信息后直接发布。
    </p>

    <section
      v-if="published"
      role="status"
      class="mt-8 rounded-2xl border border-green-300 bg-green-50 p-6 text-green-900 dark:bg-green-950 dark:text-green-100"
    >
      <h2 class="text-xl font-semibold">文章发布成功</h2>
      <p class="mt-2">{{ published.title }}</p>
      <div class="mt-5 flex gap-6">
        <NuxtLink
          :to="`/blog/category-${encodeURIComponent(published.type || 'null')}/${encodeURIComponent(published.title)}`"
          class="underline"
          >查看文章 →</NuxtLink
        >
        <button type="button" class="underline" @click="reset">继续上传</button>
      </div>
    </section>

    <form v-show="!published" class="mt-8" @submit.prevent="publish">
      <fieldset
        :disabled="busy"
        class="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 disabled:opacity-60 dark:border-gray-800 dark:bg-gray-950"
      >
        <div>
          <label for="markdown" class="block font-medium"
            >Markdown 文件 <span class="text-red-500">*</span></label
          >
          <input
            id="markdown"
            ref="input"
            type="file"
            accept=".md,text/markdown"
            required
            class="mt-3 block w-full rounded-lg border border-dashed border-gray-300 p-5 file:mr-4 file:rounded-md file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-gray-900"
            @change="selectFile"
          />
          <p class="mt-2 text-xs text-gray-500">
            UTF-8 编码 · 最大 1 MiB · 无需编写 front matter
          </p>
          <p v-if="file" class="mt-2 text-sm">
            已选择 {{ file.name }}（{{ (file.size / 1024).toFixed(1) }} KiB）
          </p>
        </div>
        <div>
          <label for="title" class="block font-medium"
            >文章标题 <span class="text-red-500">*</span></label
          >
          <input
            id="title"
            v-model="title"
            required
            maxlength="120"
            class="upload-input"
            placeholder="默认使用文件名，可修改"
          />
          <p class="mt-2 text-xs text-gray-500">
            标题也用于文章地址；同名文章不会被覆盖。
          </p>
        </div>
        <div>
          <label for="category" class="block font-medium">分类</label>
          <select id="category" v-model="category" class="upload-input">
            <option value="">未分类</option>
            <option
              v-for="item in categories || []"
              :key="item.type_key"
              :value="item.type_key"
            >
              {{ item.name }}
            </option>
          </select>
          <p v-if="categoryError" class="mt-2 text-sm text-amber-600">
            分类加载失败，请刷新页面重试。
          </p>
        </div>
        <div>
          <label for="description" class="block font-medium">文章摘要</label>
          <textarea
            id="description"
            v-model="description"
            maxlength="1000"
            rows="3"
            class="upload-input"
            placeholder="简要介绍文章内容"
          />
        </div>
        <div>
          <label for="tags" class="block font-medium">标签</label>
          <input
            id="tags"
            v-model="tags"
            class="upload-input"
            placeholder="例如：Rust，学习笔记"
          />
          <p class="mt-2 text-xs text-gray-500">使用逗号分隔，最多 20 个。</p>
        </div>
        <p class="text-xs text-gray-500">
          文章信息以本表单为准，文件中的 front matter
          会被替换；正文保持原样。图片请使用已上传的在线地址。
        </p>
        <div>
          <label for="token" class="block font-medium"
            >发布密钥 <span class="text-red-500">*</span></label
          >
          <input
            id="token"
            v-model="token"
            type="password"
            required
            autocomplete="off"
            class="upload-input"
            placeholder="输入管理员发布密钥"
          />
          <p class="mt-2 text-xs text-gray-500">
            密钥仅用于本次发布，不保存在浏览器中。
          </p>
        </div>
        <p
          v-if="error"
          role="alert"
          class="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-200"
        >
          {{ error }}
        </p>
        <button
          type="submit"
          :disabled="busy || !file"
          class="w-full rounded-lg bg-gray-900 px-5 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-100 dark:text-gray-900"
        >
          {{ busy ? '正在发布…' : '发布文章' }}
        </button>
      </fieldset>
    </form>
  </main>
</template>

<style scoped>
.upload-input {
  display: block;
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.7rem 0.85rem;
  border: 1px solid #9ca3af;
  border-radius: 0.5rem;
  background: transparent;
}
.upload-input:focus {
  outline: 2px solid #60a5fa;
  outline-offset: 2px;
}
select option {
  color: #111827;
  background: white;
}
</style>
