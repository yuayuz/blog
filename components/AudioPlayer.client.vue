<template>
  <ClientOnly>
    <div id="aplayer" class="mt-4" />
  </ClientOnly>
</template>

<script setup lang="ts">
if (import.meta.client) {
  // @ts-ignore
  import('aplayer').then(({ default: APlayer }) => {
    import('aplayer/dist/APlayer.min.css')

    onMounted(() => {
      const ap = new APlayer({
        container: document.getElementById('aplayer')!,
        fixed: true,
        autoplay: false,
        audio: [
          {
            name: 'La gloire à mes genoux',
            artist: 'Artist',
            url: '/music/Le_rouge_et_le_noir/La gloire à mes genoux.mp3',
            cover: '/music/Le_rouge_et_le_noir/Le_rouge_et_le_noir.png',
          },
          {
            name: 'Ding Dong',
            artist: 'Artist',
            url: '/music/Le_rouge_et_le_noir/Ding Dong.mp3',
            cover: '/music/Le_rouge_et_le_noir/Le_rouge_et_le_noir.png',
          },
        ],
      })
    })
  })
}
</script>
