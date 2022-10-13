<template>
  <el-form class="update-form" :model="profileInfo">
    <div class="profile-box py-3">
      <img>
      <label class="input-file-button" for="img-upload">
        File Upload
      </label>
    </div>
    <el-form-item>
      <el-input placeholder="Enter yout nickname" v-model="profileInfo.nickname" />
    </el-form-item>
    <el-form-item>
      <el-input placeholder="Enter your email" v-model="profileInfo.email" />
    </el-form-item>
    <el-form-item>
      <el-date-picker v-model="profileInfo.birthday" type="date" placeholder="Pick your Birthday" format="YYYY/MM/DD"
        value-format="YYYY-MM-DD">
      </el-date-picker>
    </el-form-item>
    <el-button color="#00bd9d" type="info" class="profile-update-button" @click="updateProfile">UPDATE</el-button>
  </el-form>
</template>

<script setup>
import { reactive } from 'vue'

const profileInfo = reactive({
  nickname: '',
  email: '',
  birthday: '',
})

const updateProfile = () => {
  console.log(profileInfo)
}

</script>

<style>
</style>