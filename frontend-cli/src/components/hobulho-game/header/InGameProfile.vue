<template>
  <div class="ingame-profile">
    <div class="left-container">
      <img src="../assets/Avater.png" alt="프로필사진" />
      <div class="status-text">
        <div class="nickname">{{ IngameMyProfile.name }}</div>
        <div class="mypoint">mypoint : {{ IngameMyProfile.point }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  IngameMyProfile: Object,
});
</script>

<style scoped>
.ingame-profile {
  height: 70px;
  display: relative;
  justify-content: space-evenly;
  align-items: center;
  background-color: #1b2130;
  border-radius: 20px;
  width: 500px;
  width: 100%;
}
.left-container {
  height: 50px;
  border: none;
  padding: 10px;
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  /* align-items: center; */
}
.status-text {
  color: white;

  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
</style>
