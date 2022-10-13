<template>
  <router-link :to="{ name: 'notices' }">
    <h1>NOTICE</h1>
  </router-link>
  <div class="create-btn-container">
    <el-button color="#7608d3" link plain size="small" @click="onSubmit()">{{ action }}</el-button>
    <el-button color="#7608d3" link plain size="small">Delete</el-button>
  </div>
  <div class="notice-container">
    <input id="title" v-model="newNotice.title" placeholder="Notice Title" color="green" />
    <hr>
    <textarea id="notice_content" v-model="newNotice.content" :rows="10" type="textarea" placeholder="Notice Content" />
  </div>
  <div class="notice_back_button_container">
    <router-link :to="{ name: 'notices' }">
      <el-button link color="#7608d3" plain size="small">Back</el-button>
    </router-link>
  </div>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()
const props = defineProps({
  action: String,
  notice: Object,
})

const newNotice = {
  id: props.notice.id,
  title: props.notice.title,
  content: props.notice.content,
}

const onSubmit = () => {
  console.log(props.action)
  if (props.action === 'create') {
    const createNotice = () => store.dispatch('createNotice', newNotice)
    createNotice()
  }
  else if (props.action === 'update') {
    const updateNotice = () => store.dispatch('updateNotice', newNotice)
    updateNotice(newNotice)
  }
}



</script>

<style scoped>
@import '../../assets/notice.css';
</style>