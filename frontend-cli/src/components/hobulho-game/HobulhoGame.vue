<template>
  <div>
    <el-container class="el-header-container">
      <el-header height="100px"><HeaderHome /></el-header>
    </el-container>
      <el-container class="el-body-container">
        <el-aside class="game-aside-container" width="470px"><LeftHome/></el-aside>
        <el-main class="game-main-container" ><PlayersHome :cam="cam"/></el-main>
    </el-container>
  </div>
</template>

<script setup>
import { reactive, ref, inject, onBeforeUnmount, computed } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from 'element-plus'
import { fetchRoomById } from '../../util/api';
import HeaderHome from "./header/HeaderHome.vue";
import LeftHome from "./main/LeftHome.vue";
import PlayersHome from "./main/PlayersHome.vue";
import { useStore } from "vuex";
import { Data } from "phaser";


// 기본 값
const route = useRoute();
const store = useStore()
const roomid = route.params.roomid;
const token = { Authorization: `Bearer ${sessionStorage.getItem('token')}`}

// 게임변수
const $clientstate = inject("$clientstate");
const $hobulhoSocket = inject("$hobulhoSocket");
const $dataBox = inject("$dataBox");

const myid = route.params.myid;
$clientstate.myid = myid;
$clientstate.roomid = roomid;
console.log(myid);

//스타트 데이터 준비 완료
$hobulhoSocket.on("start-data-ready", function () {
  console.log("111");
  console.log(roomid);
  console.log("111222");
  $hobulhoSocket.emit("server-get-roomid", $clientstate.roomid);
  if (roomid === $clientstate.roomid) {
      console.log("222");
  }
});

function whichData(roomid) {
  for (let t = 0; t < $dataBox.length; t++) {
    if ($dataBox[t].controlstate.roomid === roomid) {
      return t;
    }
  }
}

//현재상태가 loading 일때 게임 시작 요청
const gameStart = () => {
  let boxnum = whichData($clientstate.roomid);
  if ($clientstate.gamestate === "loading") {
    setTimeout(() => {
      $hobulhoSocket.emit("hobulho-start-req", $clientstate.roomid);
    }, 3000);
  }
};



$hobulhoSocket.on("game-start-ready", function () {
  if ($clientstate.roomid != "") {
    gameStart();
  }
});

$hobulhoSocket.on("whose-turn", function () {
  let boxnum = whichData($clientstate.roomid);

  if ($clientstate.attackerId === $clientstate.myid) {
    $clientstate.gamestate = "select";
  } else {
    $clientstate.gamestate = "turn";
  }
});
$hobulhoSocket.on("whose-attack", function () {
  let boxnum = whichData($clientstate.roomid);

  if ($clientstate.attackerId === $clientstate.myid) {
    $clientstate.gamestate = "attack";
  } else {
    $clientstate.gamestate = "turn";
  }
});
$hobulhoSocket.on("whose-declare", function () {
  let boxnum = whichData($clientstate.roomid);

  if ($clientstate.attackerId === $clientstate.myid) {
    $clientstate.gamestate = "declare";
  } else {
    $clientstate.gamestate = "declare-turn";
  }
});
$hobulhoSocket.on("whose-judge", function () {
  let boxnum = whichData($clientstate.roomid);

  if ($clientstate.defenderId === $clientstate.myid) {
    $clientstate.gamestate = "judge";
  } else {
    $clientstate.gamestate = "judge-turn";
  }
});



</script>
<style scoped>
.el-header-container {
  height: 100px;
}
.el-body-container {
  height: 90%;
}
.el-main {
  padding: 0px;
}
.el-aside {
  padding: 0px;
  margin-left: 20px;
}
.el-header {
  height: 100px;
  padding-top: 20px;
  padding-bottom: 1%;
}
</style>
