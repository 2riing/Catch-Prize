<template>
  <div class="game-guide">
    <v-typical
      v-if="$clientstate.gamestate === 'turn'"
      class="blink"
      :steps="[$clientstate.attackerId + ' 님의 차례입니다.', 1000]"
      :loop="1"
      :wrapper="'h1'"
    ></v-typical>
    <v-typical
      v-if="$clientstate.gamestate === 'judge-turn'"
      class="blink"
      :steps="[$clientstate.defenderId + ' 님이 진실을 파헤치는중..', 1000]"
      :loop="1"
      :wrapper="'h1'"
    ></v-typical>
    <v-typical
      v-else-if="$clientstate.gamestate === 'select'"
      class="blink"
      :steps="[guide.guideText, 1000]"
      :loop="1"
      :wrapper="'h1'"
    ></v-typical>
    <v-typical
      v-else-if="$clientstate.gamestate === 'start'"
      class="blink"
      :steps="[guide.guideText, 1000]"
      :loop="1"
      :wrapper="'h1'"
    ></v-typical>
    <v-typical
      v-else-if="$clientstate.gamestate === 'success'"
      class="blink"
      :steps="[guide.guideText, 1000]"
      :loop="1"
      :wrapper="'h1'"
    ></v-typical>
    <v-typical
      v-else-if="$clientstate.gamestate === 'fail'"
      class="blink"
      :steps="[guide.guideText, 1000]"
      :loop="1"
      :wrapper="'h1'"
    ></v-typical>
    <v-typical
      v-else-if="$clientstate.gamestate === 'declare'"
      class="blink"
      :steps="[guide.guideText, 1000]"
      :loop="1"
      :wrapper="'h1'"
    ></v-typical>
    <v-typical
      v-else-if="$clientstate.gamestate === 'judge'"
      class="blink"
      :steps="[
        $clientstate.attackerId +
          ' 님이 의문의 카드를 ' +
          $clientstate.cardname +
          ' (이)라고 주장했습니다. 진실일까요?',
        1000,
      ]"
      :loop="1"
      :wrapper="'h1'"
    ></v-typical>
    <v-typical
      v-else-if="
        $clientstate.gamestate === 'attack' &&
        $clientstate.attackerId === $clientstate.myid
      "
      class="blink"
      :steps="[guide.guideText, 1000]"
      :loop="1"
      :wrapper="'h1'"
    ></v-typical>
    <v-typical
      v-else-if="$clientstate.gamestate === 'death'"
      class="blink"
      :steps="[$clientstate.deathplayer + ' 님이 죽었습니다...', 1000]"
      :loop="1"
      :wrapper="'h1'"
    ></v-typical>
    <v-typical
      v-else-if="$clientstate.gamestate === 'win'"
      class="blink"
      :steps="[$clientstate.winner + ' 님의 승리입니다!', 1000]"
      :loop="1"
      :wrapper="'h1'"
    ></v-typical>
    <v-typical
      v-else-if="$clientstate.gamestate === 'loading'"
      class="blink"
      :steps="['플레이어 착석중...', 1000, '딜러가 카드를 섞는중...', 2000]"
      :loop="1"
      :wrapper="'h1'"
    ></v-typical>
    <v-typical
      v-else-if="$clientstate.gamestate === 'declare-turn'"
      class="blink"
      :steps="[$clientstate.defenderId + ' 님이 지목 당했습니다.', 1000]"
      :loop="1"
      :wrapper="'h1'"
    ></v-typical>
    <v-typical
      v-else-if="$clientstate.gamestate === 'no-card-death'"
      class="blink"
      :steps="[
        $clientstate.deathplayer + ' 님이 남은 카드가 없어 죽었습니다...',
        1000,
      ]"
      :loop="1"
      :wrapper="'h1'"
    ></v-typical>
  </div>
</template>

<script setup>
import VTypical from "vue-typical";
import { reactive, toRefs, inject, onMounted } from "vue";
const $clientstate = inject("$clientstate");
const $dataBox = inject("$dataBox");
const $hobulhoSocket = inject("$hobulhoSocket");
const props = defineProps({
  guide: Object,
});
</script>

<style scoped>
.game-guide {
  color: white;
  font-family: "Galmuri9";
  font-size: 18px;
  width: 100%;
}

.blink::after {
  /* content: '|'; */
  animation: blink 1s infinite step-start;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
