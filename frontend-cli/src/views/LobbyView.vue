<template>
  <div class="lobby-layout">
    <el-dialog custom-class="notice-modal" v-model="noticeVisible" title="Notice" center>
      <RouterView name="notice" />
    </el-dialog>
    <el-container>
      <el-header class="hidden-xs-only" @click="noticeVisible = true">
        <marquee class="notice-marquee" scrollamount="12" onmouseover="this.stop();" onmouseout="this.start();">
          {{ notice.title }}
        </marquee>
      </el-header>
      <el-container>
        <el-aside class="hidden-sm-and-down" width="310px">
          <SideBar />
        </el-aside>
        <el-main>
          <router-view v-slot="{ Component }">
            <transition name="slide-fade">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import SideBar from '@/components/lobby/SideBar.vue';
import { onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
// const notice = computed(() => store.getters.notice)
const notice = { title: '(2022-08-19) HOBULHO POKER OPEN!!' }

const fetchNotice = (id) => store.dispatch('fetchNotice', id)

onMounted(() => {
  // fetchNotice(21)
})

const noticeVisible = ref(false);
</script>

<style>
@import '../assets/lobby.css';
</style>