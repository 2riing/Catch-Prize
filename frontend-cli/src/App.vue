<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <RouterView />
</template>


<style>
@import "./assets/bootstrap-grid.css";

.v-application {
  font-family: 'PressStart2P', sans-serif !important;
}

@font-face {
  font-family:'PressStart2P';
  src: url('assets/fonts/PressStart2P-Regular.ttf') format('truetype');
  font-weight: 400;
}

@font-face {
  font-family:'Galmuri9';
  src: url('assets/fonts/Galmuri9.ttf') format('truetype');
  font-weight: 400;
}

</style>