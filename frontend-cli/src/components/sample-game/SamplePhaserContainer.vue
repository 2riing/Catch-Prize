<template>
  <div :id="containerId" />
</template>


<script setup>
import { nextTick, onMounted, onUnmounted } from 'vue'

let gameInstance = null
const containerId = 'game-container'
const game = await import(/* webpackChunkName: "game" */ '@/game/samplegame')

onMounted(() => {
  nextTick(() => {
    gameInstance = game.launch(containerId)
  })
})

onUnmounted(() => {
  gameInstance.destroy(false)
})
</script>


