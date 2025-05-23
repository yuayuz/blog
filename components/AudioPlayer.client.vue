<template>
  <div id="aplayer" class="mt-4" />
</template>

<script setup lang="ts">
import 'aplayer/dist/APlayer.min.css'
// @ts-ignore 忽略类型报错（APlayer 无类型定义）
import APlayer from 'aplayer'

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
</script>
