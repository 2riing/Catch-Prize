<template>
  <div class="select-container">
    <div class="select-card">
      <button>
        <!-- <img :src="`../assets/${cake}.svg`" alt="오이케이크" /> -->
      </button>
    </div>
  </div>
</template>
<script setup>
import { reactive, toRefs, onMounted } from '@vue/runtime-core'

const players = reactive({
  playerList: [
    {
      "playerId": "id1",
      "cards": {
        "hand": {
          "cake": "2",
          "chicken": "1"
        },
        "board": {
          "CHICKEN": "2",
          "DURIAN": "2"
        },
      },
      "isAlive": "true"
    },
    {
      "playerId": "id2",
      "cards": {
        "hand": {
          "mint": "2",
          "pizza": "1"
        },
        "board": {
          "CHICKEN": "4",
          "DURIAN": "4"
        }
      },
      "isAlive": "false"
    },
  ],
})

const { playerList } = toRefs(players)

onMounted(() => {
})
</script>
<style>
.select-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.select-card {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100rem;
  min-width: 32rem;
  flex-flow: row wrap;
}

.select-card button {
  height: 22rem;
  width: 25%;
  padding: 0px;
  margin: 0;
  background-color: transparent;
  border: none;

}

.select-card button:hover {
  border: 12px;
  opacity: 20%;
  cursor: pointer;
}
</style>