<template>
  <el-button color="#7608d3" type="info" class="exit-button" @click="exitGame">
    EXIT GAME
  </el-button>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()


const exitGame = () => {
  router.push({ name: 'lobbyMain' })
}




</script>