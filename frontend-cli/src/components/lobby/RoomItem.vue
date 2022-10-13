<template>
  <div class="lobby-room-item d-flex justify-content-between" @click="enter(room.roomId)">
  <div>
    <p class="room-name text-white">{{ room.roomName }}</p>
    <p v-if="room.isPlaying" class="text-green">NOW PLAYING</p>
    <p v-else class="text-green">WAITING</p>
    <p class="text-green">{{ room.roomType }}...</p>
  </div>
    <p class="text-white align-self-start">{{ room.nowParti }}/{{ room.maxParticipants }}</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const props = defineProps({
  room: Object
})

const enter = (roomid) => {
  store.dispatch('enterRoom', roomid)
}

</script>

<style>
</style>