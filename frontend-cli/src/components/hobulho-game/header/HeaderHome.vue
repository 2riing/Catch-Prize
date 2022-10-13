<template>
    <el-container class="el-headerhome-container">
      <el-aside  width="470px">
      <InGameProfile class="ingame-profile" v-for="(IngameMyProfile, i) in profilesList.filter((c) => c.name === $clientstate.myid)"
      :key="i" :IngameMyProfile="IngameMyProfile" />
      </el-aside>
      <el-main><StatusHome class="status-home" /></el-main>
    </el-container>
</template>

<script setup>
import StatusHome from "./GameStatusHome.vue";
import InGameProfile from "./InGameProfile.vue";

import { reactive, toRefs, inject } from "vue";
const $clientstate = inject("$clientstate");
const $dataBox = inject("$dataBox");
const $hobulhoSocket = inject("$hobulhoSocket");
// 받아올 데이터
const profiles = reactive({
  profilesList: [
    { name: "player11", items: [1, 2, 3], profileImg: "a", point: 10 },
    { name: "player21", items: [4, 5, 6], profileImg: "b", point: 30 },
    { name: "player31", items: [7, 8, 9], profileImg: "c", point: 40 },
    { name: "player41", items: [9, 8, 7], profileImg: "d", point: 20 },
    { name: "player51", items: [6, 5, 4], profileImg: "e", point: 50 },
    { name: "player61", items: [3, 2, 1], profileImg: "f", point: 70 },
  ],
});

function whichData(roomid) {
  for (let t = 0; t < $dataBox.length; t++) {
    if ($dataBox[t].controlstate.roomId === roomid) {
      return t;
    }
  }
}

function playerSetting() {
  console.log($dataBox);
  console.log("122222");
  let datanum = whichData($clientstate.roomid);
  console.log(datanum);
  for (let t = 0; t < 6; t++) {
    profiles.profilesList[t].name = $dataBox[datanum].players[t].playerId;
    profiles.profilesList[t].point = $dataBox[datanum].players[t].point;
  }
  console.log(profiles);
}

$hobulhoSocket.on("players-profile-setting", function () {
  playerSetting();
});

const { profilesList } = toRefs(profiles);
</script>

<style scoped>
.el-main {
  padding: 0px;
  min-width: 400px;
}
.el-aside .ingame-profile{
  padding: 0px;
  height: 70px;
}
.status-home {
  margin-left: 20px;
}
.el-headerhome-container{
  height: 70px;
}
</style>
