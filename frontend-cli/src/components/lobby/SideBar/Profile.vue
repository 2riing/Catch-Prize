<template>
  <div class="d-flex sidebar-profile">
    <el-avatar shape="circle" class="me-1" :size="45" :src="numToImage[currentUser.profileImage]" />
    <div class="profile-box">
      <p class="profile-nickname">{{ currentUser.username }}</p>
    </div>
    <img class="profile-logout" src="@/assets/icons/logout.svg" align="right" alt="logout" @click="logout">
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import src0 from '@/assets/profileIcons/0.svg'
import src1 from '@/assets/profileIcons/1.svg'
import src2 from '@/assets/profileIcons/2.svg'
import src3 from '@/assets/profileIcons/3.svg'
import src4 from '@/assets/profileIcons/4.svg'
import src5 from '@/assets/profileIcons/5.svg'
import src6 from '@/assets/profileIcons/6.svg'
import src7 from '@/assets/profileIcons/7.svg'
import src8 from '@/assets/profileIcons/8.svg'
import src9 from '@/assets/profileIcons/9.svg'
import src10 from '@/assets/profileIcons/10.svg'
import src11 from '@/assets/profileIcons/11.svg'
import src12 from '@/assets/profileIcons/12.svg'
import src13 from '@/assets/profileIcons/13.svg'
import src14 from '@/assets/profileIcons/14.svg'
import src15 from '@/assets/profileIcons/15.svg'
import src16 from '@/assets/profileIcons/16.svg'
import src17 from '@/assets/profileIcons/17.svg'
import src18 from '@/assets/profileIcons/18.svg'
import src19 from '@/assets/profileIcons/19.svg'

const numToImage = {
  0: src0,
  1: src1,
  2: src2,
  3: src3,
  4: src4,
  5: src5,
  6: src6,
  7: src7,
  8: src8,
  9: src9,
  10: src10,
  11: src11,
  12: src12,
  13: src13,
  14: src14,
  15: src15,
  16: src16,
  17: src17,
  18: src18,
  19: src19,
}

const store = useStore()
const router = useRouter()
const currentUser = computed(() => store.getters.currentUser)
const isLoggedIn = computed(() => store.getters.isLoggedIn)

store.dispatch('fetchCurrentUser')

const logout = () => {
  if (isLoggedIn.value) {
    store.dispatch('logout');
  } else {
    router.push({ name: 'home' })
  }
}

onMounted(() => {
  if (!isLoggedIn.value) {
    router.push({ name: 'home' })
  }
})
</script>