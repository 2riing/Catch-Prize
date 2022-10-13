<template>
  <div class="mycards-container">
    <div class="card-text">
    </div>
    <transition name="card-fade">
      <div class="mycards-wrapper" v-if="myHandcardsList != ''">
        <div
          v-for="(myHand, i) in myHandcardsList"
          :key="i"
          v-on:click="onClick(myHand)"
          ref="asd"
          class="asd"
        >
          <img v-if="myHand === 'cake'" :src="cakeimgsrc" :alt="`${myHand}`" />
          <img
            v-else-if="myHand === 'durian'"
            :src="durianimgsrc"
            :alt="`${myHand}`"
          />
          <img
            v-else-if="myHand === 'eggplant'"
            :src="eggplantimgsrc"
            :alt="`${myHand}`"
          />
          <img
            v-else-if="myHand === 'insect'"
            :src="insectimgsrc"
            :alt="`${myHand}`"
          />
          <img
            v-else-if="myHand === 'mint'"
            :src="mintimgsrc"
            :alt="`${myHand}`"
          />
          <img
            v-else-if="myHand === 'pizza'"
            :src="pizzaimgsrc"
            :alt="`${myHand}`"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import cakesrc from "../assets/cake.svg";
import duriansrc from "../assets/durian.svg";
import eggplantsrc from "../assets/eggplant.svg";
import insectsrc from "../assets/insect.svg";
import mintsrc from "../assets/mint.svg";
import pizzasrc from "../assets/pizza.svg";
import { ref, inject, computed, reactive, toRefs } from "vue";

const asd = ref(null);
const $hobulhoSocket = inject("$hobulhoSocket");
const $clientstate = inject("$clientstate");
const $dataBox = inject("$dataBox");
const myHandcards = reactive([
  {
    name: "cake",
    num: 2,
  },
  {
    name: "durian",
    num: 2,
  },
  {
    name: "eggplant",
    num: 1,
  },
  {
    name: "insect",
    num: 1,
  },
  {
    name: "mint",
    num: 1,
  },
  {
    name: "pizza",
    num: 1,
  },
]);
function whichData(roomid) {
  for (let t = 0; t < $dataBox.length; t++) {
    if ($dataBox[t].controlstate.roomId === roomid) {
      return t;
    }
  }
}
let Hand = reactive({
  myHandcardsList: [],
});
const myHandupdate = () => {
  let boxnum = whichData($clientstate.roomid);
  let list = [];
  //내아이디와 같은 핸드를 푸쉬
  for (let t = 0; t < 6; t++) {
    if ($dataBox[boxnum].players[t].playerId === $clientstate.myid) {
      myHandcards[0].num = $dataBox[boxnum].players[t].cards.hand.cake;
      myHandcards[1].num = $dataBox[boxnum].players[t].cards.hand.durian;
      myHandcards[2].num = $dataBox[boxnum].players[t].cards.hand.eggplant;
      myHandcards[3].num = $dataBox[boxnum].players[t].cards.hand.insect;
      myHandcards[4].num = $dataBox[boxnum].players[t].cards.hand.mint;
      myHandcards[5].num = $dataBox[boxnum].players[t].cards.hand.pizza;
    }
  }
  for (let t = 0; t < 6; t++) {
    for (let i = 0; i < myHandcards[t].num; i++) {
      list.push(myHandcards[t].name);
    }
  }
  Hand.myHandcardsList = list;
};
const cakeimgsrc = computed(() => {
  return cakesrc;
});
const durianimgsrc = computed(() => {
  return duriansrc;
});
const eggplantimgsrc = computed(() => {
  return eggplantsrc;
});
const insectimgsrc = computed(() => {
  return insectsrc;
});
const mintimgsrc = computed(() => {
  return mintsrc;
});
const pizzaimgsrc = computed(() => {
  return pizzasrc;
});

function onClick(myHand) {
  if ($clientstate.gamestate === "select") {
    const cardname = myHand;
    //카드를 선택하면 카드이름과 내 아이디를 보냄
    $hobulhoSocket.emit("card-click", $clientstate.roomid, cardname, $clientstate.myid);
    $hobulhoSocket.on("players-refresh", function () {
      //gamestate attack으로 변경
      myHandupdate();
    });
  }
}

$hobulhoSocket.on("hobulho-start-card", function () {
  myHandupdate();
});

const { myHandcardsList } = toRefs(Hand);
</script>

<style scoped>
.mycards-container {
  position: relative;
  display: flex;
  flex-direction: column;


}
.mycards-wrapper {
  display: flex;
  margin-left: 70px;
  align-items: center;
  margin-bottom: 10px;
  margin-right: 140px;
  height: 30vh;
  width: 200px;
}
.mycards-wrapper div {
  width: 12%;
  height: 90%;
}
.mycards-wrapper img {
  width: 150px;
}
.mycards-wrapper img:hover {
  transition: all ease 0.7s 0s;
  transform: scale(1.4) translateX(1vw) translateY(-70px);
  z-index: 2;
}
.card-text {
  display: flex;
  width: 470px;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 10px;
  height: 10%;
  color: white;
  font-family: "PressStart2P";
}
.current-player-text {
  color: #00bd9d;
}

.card-fade-enter-active {
  transition: all 0.8s ease;
}

.card-fade-enter-from {
  transform: translateX(-30px);
  opacity: 0;
}
</style>
