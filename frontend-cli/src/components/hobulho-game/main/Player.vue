<template>
  <div
    :class="[player.isAlive === true ? 'game-player-container' : 'game-player-container-death',]"
  >
    <div class="status-container">
      <!-- <img v-on:click="videoClick()" src="../assets/image15.png" alt="" /> -->
      <UserVideo :stream-manager="player.streamManager"></UserVideo>
      <div class="player-text">
        <div
          v-on:click="attackTo"
          ref="nicknameRef"
          class="nickname-else"
          :class="{ nickname: $clientstate.gamestate === 'attack' }"
        >
          {{ player.name }}
        </div>
        <div class="remain-card">남은카드: {{ player.remain }}</div>
      </div>
    </div>
    <div class="card-field">
      <div class="card">
        <div class="num">{{ player.fieldlist[0] }}</div>
        <div class="card-img">
          <img src="../assets/cake.png" alt="케이크" />
        </div>
      </div>
      <div class="card">
        <div class="num">{{ player.fieldlist[1] }}</div>
        <div class="card-img">
          <img src="../assets/durian.png" alt="두리안" />
        </div>
      </div>
      <div class="card">
        <div class="num">{{ player.fieldlist[2] }}</div>
        <div class="card-img">
          <img src="../assets/eggplant.png" alt="가지" />
        </div>
      </div>
      <div class="card">
        <div class="num">{{ player.fieldlist[3] }}</div>
        <div class="card-img">
          <img src="../assets/insect.png" alt="곤충튀김" />
        </div>
      </div>
      <div class="card">
        <div class="num">{{ player.fieldlist[4] }}</div>
        <div class="card-img">
          <img src="../assets/mint.png" alt="민트초코" />
        </div>
      </div>
      <div class="card">
        <div class="num">{{ player.fieldlist[5] }}</div>
        <div class="card-img">
          <img src="../assets/pizza.png" alt="피자" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";

const props = defineProps({
  player: Object,
});
const nicknameRef = ref(null);
const $clientstate = inject("$clientstate");
const $hobulhoSocket = inject("$hobulhoSocket");
const $dataBox = inject("$dataBox");
//databox에서 어떤 데이터인지 찾기
function whichData(roomid) {
  for (let t = 0; t < $dataBox.length; t++) {
    if ($dataBox[t].controlstate.roomId === roomid) {
      return t;
    }
  }
}

//플레이어에서 클릭한 요청을 받아서 그사람 아이디받아서 라지스크린으로 보내주면 될거같다

//공격할사람 클릭하면 함수 실행
function attackTo() {
  let roomnum = whichData($clientstate.roomid);

  if ($clientstate.gamestate === "attack") {
    const defender = nicknameRef.value.textContent;
    if (defender != $clientstate.myid) {
      for (let t = 0; t < 6; t++) {
        if ($dataBox[roomnum].players[t].playerId === defender) {
          if ($dataBox[roomnum].players[t].isAlive === true) {
            $hobulhoSocket.emit("player-click", $clientstate.roomid, defender);
          }
        }
      }
    }
  }
}

function videoClick() {
  $clientstate.largeScreen = props.player.name;
  // console.log($clientstate.largeScreen);
}
</script>

<style scoped>
.game-player-container {
  padding: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 0px;
}
.game-player-container-death {
  padding: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 0px;
  opacity: 0.3;
}
/* .player-container {
  width: 100%;
  height: 100%;
  margin: 5px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #1b2130;
  border-radius: 20px;
}
.player-container-death {
  width: 100%;
  height: 100%;
  margin: 5px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #1b2130;
  border-radius: 20px;
  opacity: 0.3;
} */
.status-container {
  height: 45%;
  padding-left: 43%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.status-container img {
  height: 90%;
}
.card {
  margin: 5px;
  width: 13%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card-field {
  height: 50%;
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 1vw;
  margin-right: 1vw;
}
.card-img {
  height: 80%;
}
.card img {
  border-radius: 10%;
  width: 100%;
  height: 100%;
  border: 1px solid white;
}
.num {
  color: white;
}
.player-text {
  color: white;
  font-family: "PressStart2P";
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  margin-left: 20px;
  justify-content: center;
}

.nickname-else {
  font-size: 18px;
  color: #00bd9d;
}

.nickname:hover {
  opacity: 20%;
  cursor: pointer;
  color: #00bd9d;
}
</style>
