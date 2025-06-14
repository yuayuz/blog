<template>
  <ClientOnly>
    <div id="aplayer" class="mt-4" />
  </ClientOnly>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const {
  public: { OSS_BASE_URL },
} = useRuntimeConfig()

if (import.meta.client) {
  onMounted(async () => {
    //@ts-ignore
    const { default: APlayer } = await import('aplayer')
    await import('aplayer/dist/APlayer.min.css')

    new APlayer({
      container: document.getElementById('aplayer')!,
      fixed: true,
      autoplay: false,
      audio: [
        {
          name: 'La gloire à mes genoux',
          artist: 'Artist',
          url: `${OSS_BASE_URL}/music/Le_rouge_et_le_noir/La gloire à mes genoux.mp3`,
          cover: `${OSS_BASE_URL}/music/Le_rouge_et_le_noir/Le_rouge_et_le_noir.png`,
        },
        {
          name: 'Ding Dong',
          artist: 'Artist',
          url: `${OSS_BASE_URL}/music/Le_rouge_et_le_noir/Ding Dong.mp3`,
          cover: `${OSS_BASE_URL}/music/Le_rouge_et_le_noir/Le_rouge_et_le_noir.png`,
        },
      ],
    })
  })
}
</script>
