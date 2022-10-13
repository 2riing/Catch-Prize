<template>
  <notice-form :notice="{
    id: notice.id,
    title: notice.title,
    content: notice.content,
  }" action="update">
  </notice-form>
</template>


<script setup>
import NoticeForm from './NoticeForm.vue';
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()
const notice = computed(() => store.getters.notice)
const fetchNotice = () => store.dispatch('fetchNotice', route.params.noticeId)
console.log(route.params.noticeId)
onMounted(() => {
  fetchNotice()
})

</script>

<style scoped>
@import '../../assets/notice.css';
</style> 