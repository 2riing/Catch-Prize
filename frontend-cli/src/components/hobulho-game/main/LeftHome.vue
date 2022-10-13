<template>
  <div class="left-container">
    <div class="large-face-cam-wrapper"><LargeScreen /></div>
    <div class="mycard-list"><MyHandCards /></div>
    <div class="item-shop"><ItemShop /></div>
  </div>
</template>

<script>
import ItemShop from "./ItemShopBar.vue";
import MyHandCards from "./MyCards.vue";
import LargeScreen from "./LargeScreen.vue";

export default {
  name: "left-home",
  components: {
    ItemShop,
    LargeScreen,
    MyHandCards,
  },
};
</script>
<style scoped>
.left-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1b2130;
  border-radius: 20px;
  height: 80vh;
}
.large-face-cam-wrapper{
  margin-top: 20px;
  height:20%;
  flex-grow: 3;
}
.mycard-list {
  height:35%;
  flex-grow: 3;
}
.item-shop {
  height:8%;
  flex-grow: 0;
}
</style>
<!-- <style>
.left-container {
  padding-top: 20px;
  padding-bottom: 10px;
  
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  /* width: 100%; */
  height: 83vh;
  align-items: center;
  justify-content: center;
}
.large-face-cam-wrapper{
  height: 40vh;
  width: 40vh;
}
.mycard-list{
  width: 25vw;
  height: 40vh;
}
.item-shop{
  width: 25vw;
  height: 10vh;
  margin-top: 20px;
}
</style> -->
