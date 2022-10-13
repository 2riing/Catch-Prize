<template>
  <img src="@/assets/logo.svg" class="side-logo-image" width="250" alt="logo" style="opacity: 0.9; margin: 0px 0px 0px 0px;">
  <el-tabs id="sidebar" tabPosition="bottom" :stretch=true @tab-click="changeTab">
    <Profile />
    <AddFriend v-if="isFriends" />
    <el-tab-pane label="friends" class="sidebar-friends-element">
      <template #label>
        <div class="custom-tabs-label">
          <img src="@/assets/icons/group.svg" alt="group">
        </div>
      </template>
      <Friends />
    </el-tab-pane>
    <el-tab-pane label="record" class="sidebar-element">
      <template #label>
        <div class="custom-tabs-label">
          <img src="@/assets/icons/auto_stories.svg" alt="group">
        </div>
      </template>
      <MyRecord />
    </el-tab-pane>
    <el-tab-pane label="edit" class="sidebar-element">
      <template #label>
        <div class="custom-tabs-label">
          <img src="@/assets/icons/manage_accounts.svg" alt="group">
        </div>
      </template>
      <SetProfile />
    </el-tab-pane>
  </el-tabs>
  <transition name="invert" mode="out-in">
    <div v-if="!isWait" key="exit-button">
      <ExitGame />
    </div>
    <div v-else key="start-button">
      <el-button color="#00bd9d" type="info" class="start-button" @click="startVisible = true">GAME START!
      </el-button>
    </div>
  </transition>
  <el-dialog v-model="startVisible" custom-class="start-modal" :destroy-on-close="true"	>
    <template #header="{ titleId, titleClass }">
      <div class="my-header ">
        <h4 :id="titleId" :class="titleClass" style="text-align: center; font-size: 1.3rem; line-height: 50px;">
          MAKE YOUR GAME!
        </h4>
      </div>
    </template>
    <MakeRoom @startVisible="() => startVisible = false"/>
  </el-dialog>
</template>

<script setup>
import Profile from './SideBar/Profile.vue'
import Friends from './SideBar/Friends.vue'
import MyRecord from './SideBar/MyRecord.vue'
import SetProfile from './SideBar/SetProfile.vue'
import ExitGame from './SideBar/ExitGame.vue'
import AddFriend from './SideBar/AddFriend.vue';
import MakeRoom from './Modal/MakeRoom.vue';

import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const isFriends = ref(true)
const startVisible = ref(false)
const isWait = ref(computed(() => store.getters.isWait))

const changeTab = (data) => {
  if (data.props.label == "friends")
    isFriends.value = true
  else
    isFriends.value = false
}
</script>

<style>
</style>