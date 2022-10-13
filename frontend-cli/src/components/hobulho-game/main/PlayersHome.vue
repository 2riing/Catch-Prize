<template>
  <transition name="slide-fade">
    <div v-if="
    $clientstate.gamestate === 'declare' &&
    $clientstate.attackerId === $clientstate.myid">
      <AttackCardDeclare />
    </div>
    <div v-else class="players-container">
      <Player v-for="player in playersList" class="player-container" :player="player" />
    </div>
      </transition>
  <DefendJudge v-if="
    $clientstate.gamestate === 'judge' &&
    $clientstate.defenderId === $clientstate.myid
  " />
</template>

<script setup>
import AttackCardDeclare from "../select/AttackCardDeclare.vue";
import DefendJudge from "../select/DefendJudge.vue";
import { reactive, toRefs, inject, ref } from "vue";
import Player from "./Player.vue";
import UserVideo from '@/components/webrtc/UserVideo.vue';
import { useStore } from 'vuex';
import { clone } from "lodash";

const props = defineProps({
  cam: Object,
})

// 이걸로 publisher랑 subscrbers를 합쳐보려고 했는데

// playerCams.push(...props.subscribers)


// console.log(playerCams)



// Stream에서 데이터 꺼내기
const getConnectionData = (streamManager) => {
  const { connection } = streamManager.stream;
  return JSON.parse(connection.data.substring(0, connection.data.indexOf('%/%')));
}

const clientData = (streamManager) => {
  const { clientData } = this.getConnectionData(streamManager);
  return clientData;
}

// 게임
const $clientstate = inject("$clientstate");
const $hobulhoSocket = inject("$hobulhoSocket");
const $dataBox = inject("$dataBox");

// Large Screen에서 띄워줄 mainStreamManager 선정
const updateMainVideoStreamManager = (stream) => {
  if (mainStreamManager === stream) return;
  mainStreamManager(stream)
}


const players = reactive({
  playersList: [
    {
      name: "player1",
      isAlive: false,
      fieldlist: [0, 0, 0, 0, 0, 0],
      remain: 0,
    },
    {
      name: "player2",
      isAlive: false,
      fieldlist: [0, 0, 0, 0, 0, 0],
      remain: 0,
    },
    {
      name: "player3",
      isAlive: false,
      fieldlist: [0, 0, 0, 0, 0, 0],
      remain: 0,
    },
    {
      name: "player4",
      isAlive: false,
      fieldlist: [0, 0, 0, 0, 0, 0],
      remain: 0,
    },
    {
      name: "player5",
      isAlive: false,
      fieldlist: [0, 0, 0, 0, 0, 0],
      remain: 0,
    },
    {
      name: "player6",
      isAlive: false,
      fieldlist: [0, 0, 0, 0, 0, 0],
      remain: 0,
    },
  ],
});

const { playersList } = toRefs(players);
//위의 players를 세팅하는 함수
function whichData(roomid) {
  for (let t = 0; t < $dataBox.length; t++) {
    if ($dataBox[t].controlstate.roomId === roomid) {
      return t;
    }
  }
}

// const matchPlayers = () => {
//   for (let t = 0; t < 6; t++) {
//     for (let playerCam in playerCams) {
//       console.log(getConnectionData(playerCam).clientData.myname)
//       if (clientData(playerCam).clientData.myname == $dataBox[whichData($clientstate.roomid)].players[t].playerId) {
//         cams.push(playerCam)
//       }
//     }
//   }
//   console.log(cams)
// }

// matchPlayers()


function playersSetting() {
  for (let t = 0; t < 6; t++) {
      players.playersList[t].name =
        $dataBox[whichData($clientstate.roomid)].players[t].playerId;
      players.playersList[t].isAlive =
        $dataBox[whichData($clientstate.roomid)].players[t].isAlive;
      players.playersList[t].remain =
        $dataBox[whichData($clientstate.roomid)].players[t].cards.remain;
      players.playersList[t].fieldlist[0] =
        $dataBox[whichData($clientstate.roomid)].players[t].cards.board.cake;
      players.playersList[t].fieldlist[1] =
        $dataBox[whichData($clientstate.roomid)].players[t].cards.board.durian;
      players.playersList[t].fieldlist[2] =
        $dataBox[whichData($clientstate.roomid)].players[t].cards.board.eggplant;
      players.playersList[t].fieldlist[3] =
        $dataBox[whichData($clientstate.roomid)].players[t].cards.board.insect;
      players.playersList[t].fieldlist[4] =
        $dataBox[whichData($clientstate.roomid)].players[t].cards.board.mint;
      players.playersList[t].fieldlist[5] =
        $dataBox[whichData($clientstate.roomid)].players[t].cards.board.pizza;
    }
  }

//처음 게임이 시작하고 첫 공격자 함수
function firstattacker() {
  let boxnum = whichData($clientstate.roomid);
  if ($dataBox[boxnum].controlstate.gamestate === "start") {
    setTimeout(() => {
      //카드 선택 준비
      $hobulhoSocket.emit("select-ready-req", $clientstate.roomid);
    }, 3000);
  }
}

//첫공격
$hobulhoSocket.on("first-attack", function () {
  playersSetting();
  firstattacker();
});
//새로고침
$hobulhoSocket.on("players-refresh", function () {
  console.log("qqww");
  playersSetting();
});
</script>

<style scoped>
.players-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  width: 100%;
  height: 100%;
}

.player-container {
  margin: 0.5% 1%;
  min-height: 200px;
  max-height: 26vh;
  background-color: transparent;
  border-radius: 30px;
  flex-grow: 0;
  min-width: 400px;
  width: 47%;
  box-shadow: 0 0 20px rgb(23, 42, 68) inset;

}

/* .slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-enter-from {
  transform: translateX(100px);
  opacity: 0;
} */
</style>
