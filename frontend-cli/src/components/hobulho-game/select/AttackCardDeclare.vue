<template>
  <div class="declare-container">
    <div class="declare-card">
      <button v-on:click="attackDeclare('cake')">
        <img src="../assets/cake.svg" alt="오이케이크" />
      </button>
      <button v-on:click="attackDeclare('durian')">
        <img src="../assets/durian.svg" alt="두리안" />
      </button>
      <button v-on:click="attackDeclare('eggplant')">
        <img src="../assets/eggplant.svg" alt="가지" />
      </button>
      <button v-on:click="attackDeclare('insect')">
        <img src="../assets/insect.svg" alt="곤충튀김" />
      </button>
      <button v-on:click="attackDeclare('mint')">
        <img src="../assets/mint.svg" alt="민트초코" />
      </button>
      <button v-on:click="attackDeclare('pizza')">
        <img src="../assets/pizza.svg" alt="피자" />
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, inject } from "vue";
// const declareRef = ref(null);
const $hobulhoSocket = inject("$hobulhoSocket");
const $clientstate = inject("$clientstate");

function attackDeclare(data) {
  let declareCard = data;
  $hobulhoSocket.emit("declare-click", $clientstate.roomid, declareCard);
}
</script>
<style scoped>
.declare-container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid white; */
}
.declare-card {
  display: flex;
  /* justify-content: flex-start; */
  /* align-items: flex-start; */
  height: 80vh;
  width: 50vw;
  min-width: 20rem;
  flex-flow: row wrap;
  /* border: 1px solid white; */
}
.declare-card button {
  height: 15rem;
  width: 33%;
  height: 50%;
  padding: 0px;
  margin: 0;
  background-color: transparent;
  border: none;
}
.declare-card button:hover {
  border: 12px;
  opacity: 20%;
  cursor: pointer;
}
</style>
