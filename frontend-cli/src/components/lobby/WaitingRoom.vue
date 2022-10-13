<template>
  <el-row id="elem" class="wait-container" style="height: calc(100vh - 80px);">
      <!-- <div  class="people-container">
        <div class="person-container">
          <user-video :stream-manager="cam.publisher"></user-video>
        </div>
        <div v-for="sub in cam.subscribers" class="person-container">
          <user-video  v-if="sub" :stream-manager="sub"></user-video>
        </div>
      </div> -->
    <el-col :xs="24" :lg="9" style="height: calc(100vh - 125px);">
      <div class="chat-container" style="font-size: 1.5rem; color:whitesmoke;">
        참여 중...
          <div v-for="message in roomMessages">
            {{ message }}
          </div>
        <div>
              <!-- <el-button color="#7608d3" type="info" class="add-button">
                <img src="@/assets/icons/person_add.svg" alt="add_friends">
              </el-button> -->
        </div>  
      </div>
      <div class>
        <el-button color="#7608d3" type="info" id="start-ready-button" @click="startGame()">START GAME!</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

// ----
const route = useRoute()
const store = useStore()
const roomId = route.params.roomid
const chatdata = ref('')
const roomMessages = computed(() => store.getters.roomMessages)
const isHost = computed(() => store.getters.isHost)

// const joinGame = (roomId, token) => {
//   ws.send(`/pub/${roomId}/join`,token, {})
// }

// const getName = (roomId) => {
//     ws.subscribe("/sub/" + roomId, (res) => {
//     console.log(res)
//   })
// }

const startGame = () => {
  if (isHost) {
    console.log('넌 방장이구나')
    store.dispatch('startGame', roomId)
  } else {
    console.log('방장이 아니잖아요')
  }
}
</script>

<style>
.wait-container .people-container {
  /* layout */
    display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  /* BOX */
  min-width: 56rem;
  max-width: 38rem;
  min-height: 38rem;
  padding: 2.1%;
  margin: 1rem;
  /* background */
  background-color: rgba(255, 255, 255, 0.15);
  /* font */
  /* border */

}
.wait-container .person-container video{
  margin-bottom: 1rem;
  margin-right: 0.3rem;
}

.wait-container .chat-container {
  margin-bottom: 10px;
  padding: 10px;
  height: calc(100% - 90px);
  background-color: var(--main-bg-color);
  border-radius: 10px;
}

.chat-container .chat-view {
  /* layout */
  /* BOX */
  height: calc(100% - 40px);
  overflow: auto;
  /* background */
  /* font */
  color: whitesmoke;
  /* border */
}

.chat-container .chat-view::-webkit-scrollbar {
  width: 5px;
}

.chat-container .chat-view::-webkit-scrollbar-thumb {
  /* layout */
  /* BOX */
  /* background */
  background-color: #262C3A;
  /* font */
  /* border */
  border-radius: 5px;
}

.chat-container .chat-view::-webkit-scrollbar-track {
  /* layout */
  /* BOX */
  /* background */
  background-color: transparent;
  /* font */
  /* border */
  border-radius: 5px;
}

.chat-container .el-input__wrapper {
  /* layout */
  padding: 4px 5px 4px 10px;
  /* BOX */
  /* background */
  background-color: transparent;
  /* font */
  /* border */
  box-shadow: 0 0 0 1px #00bd9d inset;
}

#start-ready-button {
  margin-left: 70px;
  /* layout */
  height: 60px;
  /* BOX */
  width: 50%;
  /* background */
  /* font */
  font-family: "PressStart2P";
  font-size: medium;
  color: whitesmoke;
  /* border */
  border: none;
  border-radius: 10px;
}

#ready-btn {
  width: 98%;
}

#ready-btn-ready {
  width: 98%;
  background-color:#262C3A;
}
  /* layout */
  /* BOX */
  /* background */
  /* font */
  /* border */
</style>

