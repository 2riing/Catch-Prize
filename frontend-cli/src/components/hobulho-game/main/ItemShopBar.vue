<template>
  <div class="itemshop-container">
    <div>
      <el-button class="itembutton" color="#00bd9d" @click="VideoRotationItem()"
        >뒤 집 기</el-button
      >
    </div>
    <div>
      <el-button class="itembutton" color="#00bd9d" @click="PitchChangeItem()"
        >음성변조</el-button
      >
    </div>
    <div>
      <el-button class="itembutton" color="#00bd9d" @click="VideoControlItem()"
        >CROMA</el-button
      >
    </div>
    <div>
      <el-button class="itembutton" color="#00bd9d" @click="GrayItem()"
        >GRAY</el-button
      >
    </div>
    <div>
      <el-button class="itembutton" color="#00bd9d" @click="setModal"
        >감정분석</el-button
      >
      <el-dialog v-model="setMoal">
        <playerSelect @setModal="() => setModal = false" />
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { inject } from "vue";
const $hobulhoSocket = inject("$hobulhoSocket");
const $clientstate = inject("$clientstate");

//화면 뒤집기
//나한테 적용
function VideoRotationItem() {
  //아이탬 버튼을 누르면 서버에다가 player에서 함수 실행
  $hobulhoSocket.emit(
    "use-item-for-me",
    $clientstate.roomid,
    $clientstate.myid,
    "videoRotate"
  );
}
//음성 변조
//나한테 적용
function PitchChangeItem() {
  $hobulhoSocket.emit(
    "use-item-for-me",
    $clientstate.roomid,
    $clientstate.myid,
    "pitchVoice"
  );
}
//화면 변조
//나한테 적용
function VideoControlItem() {
  $hobulhoSocket.emit(
    "use-item-for-me",
    $clientstate.roomid,
    $clientstate.myid,
    "chroma"
  );
}
function GrayItem() {
  $hobulhoSocket.emit(
    "use-item-for-me",
    $clientstate.roomid,
    $clientstate.myid,
    "gray"
  );
}

//감정분석
//사용할 사람 고르기
function FaceEmotionItem() {
  //룸아이디랑 사용할 사람 닉네임 보내기
  //감정분석후 전체에 뿌려줌
  $hobulhoSocket.emit("use-item", roomid, myid, "Emotion");
}
//음소거
//사용할 사람 고르기
function MuteItem() {
  //룸아이디랑 음소거 할 사람을 보냄
  $hobulhoSocket.emit("use-item", roomid, myid, "Mute");
}
//회색 화면
//사용할 사람 고르기
function VideoFillItem() {
  $hobulhoSocket.emit("use-item", roomid, myid, "GrayVideo");
}

const store = useStore();
const sendFilter = () => store.dispatch("sendFilter");
</script>

<style scoped>
.itemshop-container {
  display: flex;
  justify-content: space-around;
  width: 450px;
  height: 100%;
}

.itemshop-container div {
  width: 16%;
}

.itemshop-container img {
  width: 60%;
  height: 60%;
}

.itembutton {
  color: white;
}
</style>
