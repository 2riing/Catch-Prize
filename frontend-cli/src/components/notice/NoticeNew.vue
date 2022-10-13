<template>
  <div class="NoticeNew">
    <el-main>
      <notice-form :notice="notice" action="create"></notice-form>
    </el-main>
  </div>
</template>


<script setup>
import NoticeForm from './NoticeForm.vue';
const notice = {
  content: '',
  title: '',
}
</script>
<style scoped>
@import '../../assets/notice.css';
</style>