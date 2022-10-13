<template>
  <StarBackground />
  <Game />
</template>

<script setup>
import Game from "../components/hobulho-game/HobulhoGame.vue";
import StarBackground from "../components/StarBackground.vue";
import { inject } from "vue";
import { useStore } from 'vuex'
import { useRoute, useRouter } from "vue-router";
import jwt_decode from "jwt-decode";
import io from "socket.io-client";

const store = useStore();
const route = useRoute();
const router = useRouter();
const $hobulhoSocket = inject("$hobulhoSocket");
const username = jwt_decode(sessionStorage.getItem("token")).username;
const $clientstate = inject("$clientstate");
$clientstate.myid = username;


if (route.query.isHost) {
  const gameData = {
    roomid: route.params.roomid,
    users: route.query.users,
  };

  console.log(gameData);
  $hobulhoSocket.emit("start-data-set", gameData);
}

store.commit('SET_ISWAIT', false)
router.push({
  name: "gameplayroom",
  params: { roomid: route.params.roomid, myid: username },
});
</script>
