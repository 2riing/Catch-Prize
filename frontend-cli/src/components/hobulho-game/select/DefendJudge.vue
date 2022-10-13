<template lang="">
  <div class="defend-container">
    <div class="tf-btn">
      <button class="btn true-btn" @click="defendJudge(true)">True</button>
      <button class="btn false-btn" @click="defendJudge(false)">False</button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, inject, reactive } from "vue";
const $hobulhoSocket = inject("$hobulhoSocket");
const $clientstate = inject("$clientstate");
// const $attackstate = inject("$attackstate");

// 답에 따라서 TF 리턴하는 함수
function defendJudge(answer) {
  $hobulhoSocket.emit("judge-selected", $clientstate.roomid, answer);
}
</script>
<style>
.defend-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(6, 13, 25, 0.8);
  z-index: 1000;
}
.tf-btn {
  /* layout */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  /* box */
  min-height: 80vh;
  max-width: 100vw;
  /* backgournd */
  /* font */
  /* etc */
}
.true-btn {
  /* layout */
  /* box */
  /* backgournd */
  /* font */
  /* etc */
  background-color: rgb(0, 51, 255);
  color: white;
}
.true-btn:hover {
  background-color: #757BF6;
  color: white;
  font-size: 1.3rem;
  /* border-radius: 30%; */
}
.false-btn {
  /* layout */
  /* box */
  /* backgournd */
  background-color: #ff0000;
  /* font */
  color: white;
  /* etc */
}
.false-btn:hover {
  color: white;
  background-color: #f24822;
  font-size: 1.3rem;
}
.btn {
  /* layout */
  display: inline-block;
  /* box */
  border-radius: 1000000px;
  height: 13em;
  width: 13em;
  margin: 70px;
  /* background */
  /* background-color: rgba(23,29,43,0.8); */
  /* font */
  font-family: "PressStart2P";
  /* etc */
  transition: all 0.3s;
  cursor: pointer;
}
/* layout */
/* box */
/* backgournd */
/* font */
/* etc */
</style>
