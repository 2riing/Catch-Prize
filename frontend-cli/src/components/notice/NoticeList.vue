
<template>
  <div class="create-btn-container">
    <el-button color="#F2E53B" size="large" link plain @click="CreateForm()">CREATE</el-button>
  </div>
  <NoticeListItems :list-array="notices" />
</template>

<script setup>
import NoticeListItems from './NoticeListItems.vue'
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()
const notices = computed(() => store.getters.notices)

const fetchNotices = () => store.dispatch('fetchNotices')
const CreateForm = () => {
  router.push({ name: 'noticeNew' })
}
onMounted(() => {
  fetchNotices()
  console.log('onMounted and fetch Notices')
})
</script>

<style scoped>
@import '../../assets/notice.css';
</style>
