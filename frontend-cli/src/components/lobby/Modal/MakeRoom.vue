<template>
  <el-dialog v-model="infoVisible" width="660px" append-to-body custom-class="info-modal" title="호불호 포커">
    <video id="hobulho-video" class="video-js" controls preload="auto" width="640" data-setup="{}">
      <source src="@/assets/gameVideos/hobulho.mp4" type="video/mp4" />
    </video>
  </el-dialog>
  <el-carousel height="470px" :autoplay="false" indicator-position="none" arrow="always" @change="nextGame"
    id="select-carousel">
    <el-carousel-item class="hobulho-poker">
      <h3 class="carousel-game-title" style="">호불호 포커</h3>
      <div class="gameInfo">
        <div class="count-container">
          <img :src="group" class="countImage" alt="인원 수">
          <span>6</span>
        </div>
        <img :src="info" class="infoImage" alt="게임 정보 더보기" @click="infoVisible = true">
      </div>
    </el-carousel-item>
    <el-carousel-item>
      <h3 class="carousel-game-title">라이어 게임</h3>
      <div class="gameInfo">
        <div class="count-container">
          <img :src="group" class="countImage" alt="인원 수">
          <span>4</span>
        </div>
        <img :src="info" class="infoImage" alt="게임 정보 더보기">
      </div>
    </el-carousel-item>
    <el-carousel-item>
      <div class="carousel-coming-soon">
        Coming Soon
        <div class="point-typing">... </div>
      </div>
    </el-carousel-item>
    <div class="start-container">
      <el-input placeholder="방 제목을 입력하세요." v-model="gameinfo.roomName" />
      <el-button color="#00bd9d" type="info" class="start-button" @click="makeRoom">Make Room</el-button>
    </div>
  </el-carousel>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex';

import info from "@/assets/icons/info.svg";
import group from "@/assets/icons/group.svg"

const emit  = defineEmits(['startVisible',])
const store = useStore()
const infoVisible = ref(false)

const gameinfo = ref({
  maxparticipants: 6,
  roomName: '',
  roomtype: 'HOBULHO',
})

const indexToType = {
  0: 'HOBULHO',
  1: 'LIAR',
  2: 'COMINGSOON',
}

const nextGame = (index) => {
  gameinfo.value.gametype = indexToType[index]
}

const makeRoom = () => {
  store.dispatch('createRoom', gameinfo.value)
  emit('startVisible')
}

onMounted(() => {
  document.addEventListener('mousemove', (event) => {
    const hobulhoPoker = document.querySelector('.hobulho-poker')
    if (!!hobulhoPoker) {
      hobulhoPoker.style.backgroundPosition = `calc(43% + ${(document.documentElement.clientWidth / 2 - event.clientX) * 0.02}px) calc(50% + ${(document.documentElement.clientHeight / 2 - event.clientY) * 0.02}px)`
    }
  })
})    
</script>