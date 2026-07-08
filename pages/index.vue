<template>
  <div class="fullscreen-stage">
    <!-- ========== 照片层 ========== -->
    <div
      v-for="photo in photos"
      :key="photo.id"
      class="photo-card"
      :style="cardStyle(photo)"
    >
      <div class="photo-inner">
        <div class="photo-img-wrap">
          <img
            :src="photo.url"
            :alt="photo.title || 'photo'"
            loading="lazy"
            class="photo-img"
            @load="photo.loaded = true"
          />
          <div class="photo-skeleton" v-show="!photo.loaded"></div>
        </div>
      </div>
    </div>

    <!-- ========== 中心标题 ========== -->
    <h1
      class="absolute top-[44%] left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2 text-center text-[clamp(4rem,10vw,8rem)] font-extrabold text-gray-400 transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-pink-500 hover:via-yellow-400 hover:to-blue-500 hover:bg-clip-text hover:text-transparent"
    >
      谁是谁
    </h1>
    <p
      class="pointer-events-none absolute left-1/2 z-[100] -translate-x-1/2 text-sm tracking-wider text-gray-500/50 select-none"
      style="top: calc(44% + clamp(4.5rem, 12vw, 9rem))"
    >
      ✦ 拾起散落的时光碎片 ✦
    </p>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '首页',
  description: '记录，而不是遗忘',
})

// ---------- 类型 ----------
interface WallPhoto {
  id: number | string
  url: string
  title: string
  size: number
  ratio: number
  rotation: number
  dx: number
  dy: number
  loaded: boolean
}

/** 后端返回的原始照片数据 */
interface ApiPhoto {
  id: number | string
  path: string
  title?: string
  width?: number
  height?: number
}
interface ApiResponse {
  photos: ApiPhoto[]
}

/** path → 完整图片 URL：相对路径走 /api/image/ 代理，绝对 URL（兜底）直接使用 */
function toImageUrl(p: ApiPhoto): string {
  if (p.path.startsWith('http://') || p.path.startsWith('https://')) {
    return p.path
  }
  return `/api/image/${p.path}`
}

// ---------- 照片数据 ----------
const photos = ref<WallPhoto[]>([])
const photoCount = 22

/** 纯布局计算：为 N 张照片生成位置、旋转、尺寸（每次刷新随机） */
function generateLayout(
  count: number
): Pick<WallPhoto, 'size' | 'ratio' | 'rotation' | 'dx' | 'dy'>[] {
  const ratioPool = [3 / 4, 2 / 3, 1, 4 / 3, 3 / 2]
  const centerExclude = 14
  const minPhotoGap = 12
  const rnd = Math.random

  interface Placed {
    dx: number
    dy: number
    size: number
  }
  const placed: Placed[] = []
  const layout: Pick<WallPhoto, 'size' | 'ratio' | 'rotation' | 'dx' | 'dy'>[] =
    []

  for (let i = 0; i < count; i++) {
    const size = 13 + Math.floor(rnd() * 8) // 13~21 vmin
    const ratio = ratioPool[Math.floor(rnd() * ratioPool.length)]
    const rotation = (rnd() - 0.5) * 10

    let dx = 0,
      dy = 0,
      attempts = 0
    const maxAttempts = 100

    while (attempts < maxAttempts) {
      dx = (rnd() - 0.5) * 92
      dy = (rnd() - 0.5) * 84

      const dxVmin = dx * 0.7
      const dyVmin = dy * 1.0
      const distFromCenter = Math.sqrt(dxVmin * dxVmin + dyVmin * dyVmin)
      if (distFromCenter < centerExclude) {
        attempts++
        continue
      }

      let tooClose = false
      for (const p of placed) {
        const gapX = dxVmin - p.dx * 0.7
        const gapY = dyVmin - p.dy * 1.0
        const gap = Math.sqrt(gapX * gapX + gapY * gapY)
        if (gap < minPhotoGap + (size + p.size) * 0.42) {
          tooClose = true
          break
        }
      }
      if (tooClose) {
        attempts++
        continue
      }
      break
    }

    placed.push({ dx, dy, size })
    layout.push({ size, ratio, rotation, dx, dy })
  }

  return layout
}

/** 合成最终数据：API 照片 + 布局参数 */
function mergeLayout(
  apiPhotos: ApiPhoto[],
  layout: ReturnType<typeof generateLayout>
): WallPhoto[] {
  return apiPhotos.map((p, i) => {
    const l = layout[i] || layout[i % layout.length]
    const ratio = p.width && p.height ? p.width / p.height : l.ratio
    return {
      id: p.id,
      url: toImageUrl(p),
      title: p.title || '',
      ...l,
      ratio, // 优先用后端返回的真实宽高比
      loaded: false,
    }
  })
}

/** 占位图兜底（API 挂了或还没做后端时用） */
function fallbackPhotos(): ApiPhoto[] {
  return Array.from({ length: photoCount }, (_, i) => ({
    id: i,
    path: `https://picsum.photos/seed/p${i}/${Math.round((14 + i * 0.3) * 24)}/${Math.round((14 + i * 0.3) * 24)}`,
    title: '',
  }))
}

// ---------- 卡片样式 ----------
function cardStyle(p: WallPhoto): Record<string, string> {
  return {
    '--w': `${p.size}vmin`,
    '--ratio': String(p.ratio),
    '--rot': `${p.rotation}deg`,
    '--dx': `${p.dx}vw`,
    '--dy': `${p.dy}vh`,
  }
}

onMounted(async () => {
  const layout = generateLayout(photoCount)

  try {
    // 走 Nuxt server 代理 → 后端，不会暴露 API_BASE_URL 到浏览器
    const data = await $fetch<ApiResponse>('/api/photo-wall/photos', {
      query: { count: photoCount },
    })
    if (data?.photos?.length) {
      photos.value = mergeLayout(data.photos.slice(0, photoCount), layout)
      return
    }
  } catch {
    // 后端还没就绪时，静默降级到占位图
    console.warn('照片墙 API 不可用，使用占位图')
  }

  // 兜底：占位图
  photos.value = mergeLayout(fallbackPhotos(), layout)
})
</script>

<style scoped>
/* ========== 全屏舞台 ========== */
.fullscreen-stage {
  position: fixed;
  inset: 0;
  overflow: hidden;
}

/* ========== 照片卡片 ========== */
.photo-card {
  position: absolute;
  left: calc(50% + var(--dx));
  top: calc(50% + var(--dy));
  width: var(--w);
  aspect-ratio: var(--ratio);
  transform: translate(-50%, -50%) rotate(var(--rot));
  filter: drop-shadow(2px 4px 10px rgba(0, 0, 0, 0.1))
    drop-shadow(0 1px 2px rgba(0, 0, 0, 0.06));
  transition:
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    filter 0.4s ease,
    z-index 0s step-end;
  z-index: 1;
  cursor: pointer;
}

.photo-card:hover {
  transform: translate(-50%, -50%) rotate(0deg) scale(1.1);
  filter: drop-shadow(4px 14px 28px rgba(0, 0, 0, 0.22))
    drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  z-index: 50;
  transition:
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    filter 0.4s ease,
    z-index 0s step-start;
}

/* ========== 照片内层（拍立得白边） ========== */
.photo-inner {
  width: 100%;
  height: 100%;
  background: #fefefe;
  border-radius: 4px;
  padding: 6px 6px 10px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(0, 0, 0, 0.03);
}

.photo-card:nth-child(odd) .photo-inner {
  background: #fafaf6;
}

.photo-card:nth-child(3n) .photo-inner {
  padding: 5px 5px 8px;
}

/* ========== 图片区域 ========== */
.photo-img-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 2px;
  position: relative;
  background: #e8e8e8;
}

.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.photo-img[src] {
  opacity: 1;
}

/* 骨架屏 */
.photo-skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, #e8e8e8 30%, #f2f2f2 50%, #e8e8e8 70%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 2px;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
