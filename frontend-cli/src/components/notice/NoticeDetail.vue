<template>
  <div class="title-container">
    <router-link :to="{ name: 'notices' }">
      <h1>NOTICE</h1>
    </router-link>
  </div>
  <div class="create-btn-container">
    <el-button @click="editNotice(notice.id)" color="#F2E53B" link plain size="large">수정</el-button>
    <el-button @click="deleteNotice(notice.id)" color="#F2E53B" link plain size="large">삭제</el-button>
  </div>
  <div class="notice-container">
    <div class="title-container">
      <ul>
        <li>제목 : {{ notice.title }} {{ notice.regDate }}</li>
        <li>내용 : {{ notice.content }}</li>
      </ul>
    </div>
  </div>


</template>


<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const store = useStore()
const notice = computed(() => store.getters.notice)

const fetchNotice = () => store.dispatch('fetchNotice', route.params.noticeId)
const deleteNotice = () => store.dispatch('deleteNotice', route.params.noticeId)
const editNotice = (noticeId) => router.push({ name: 'noticeEdit', params: { noticeId } })
console.log(notice)
onMounted(() => {
  fetchNotice()
  console.log('onMounted and fetch Notice')
})
</script>

<style scoped>
@import '../../assets/notice.css';
</style>