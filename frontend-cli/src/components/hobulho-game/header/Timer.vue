<template>
  <div class="countdown">
    <div class="countdown-timer-values" ref="seconds">00</div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
const seconds = ref(null);
const $hobulhoSocket = inject("$hobulhoSocket");
let interval;
function setTimer(time) {
  let timer = time;
  interval = setInterval(() => {
    if (timer === -1) {
      clearInterval(interval);
    } else if (stoptimer === true) {
      clearInterval(interval);
    } else {
      if (timer < 10) {
        seconds.value.textContent = "0" + timer;
      } else {
        seconds.value.textContent = timer;
      }
      timer--;
      // console.log(timer);
    }
  }, 1000);
}
function stoptimer() {
  clearInterval(interval);
}
$hobulhoSocket.on("set-timer", function () {
  stoptimer();
  setTimer(20);
});
</script>

<style scoped>
.countdown-timer-values {
  font-size: 38px;
  font-family: "Galmuri9";
  color: #f2e536;
  /* color: white; */
  /* color: #7608d3; */
  /* color: #00bd9d; */
  /* color: #7608d3; */
}
</style>
