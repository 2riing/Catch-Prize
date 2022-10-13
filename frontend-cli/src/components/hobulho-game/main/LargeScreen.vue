<template>
  <div>
    <p>
      {{ $clientstate.largeScreen }}
    </p>
  </div>
</template>

<script setup>
import { inject } from "vue";
const $clientstate = inject("$clientstate");

//$client.largeScreen
//클릭한 비디오 닉네임
</script>

<style>
/* .large-face-cam {
  width: 100%;
  height: 100%;
} */
p {
  color: white;
}
</style>
