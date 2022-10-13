<template>
  <div>
    <div class="item-modal-text">아이탬을 사용 할 사람을 고르세요!</div>
    <div class="player-button-wrapper">
      <el-button
        class="player-button"
        color="#00bd9d"
        v-for="player in playerlist"
        v-on:click="itemPlayerClick(player)"
      >
        {{ player }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { inject } from " vue";
const $clientstate = inject("$clientstate");
const $hobulhoSocket = inject("$hobulhoSocket");
const playerlist = $clientstate.playerlist;
const emit  = defineEmits(['setModal',])

function itemPlayerClick(player) {
  //아이탬을 사용할 사람
  const toPlayer = player;
  //룸 아이디
  const roomid = $clientstate.roomid;
  $hobulhoSocket.emit("itme-use-to-other", roomid, toPlayer);
  emit('setModal')
}
</script>

<style scoped></style>
