<template>
  <el-collapse class="friends-list" v-model="activeNames">
    <el-collapse-item v-if="!_.isEmpty(friendsList.pending)" class="pending" name="pending">
      <template #title>
        <span style="margin: 0 0.25rem 0 2px;">대기</span>
        <span>중</span>
      </template>
      <ul>
        <li v-for="friend in friendsList.pending" :key="friend.id" class="d-flex p-1 friends-item">
          <el-avatar shape="circle" class="me-1" :size="28" :src="getProfileImage(friend.friendNickname)" />
          <div class="friends-name">{{ friend.friendNickname }}</div>
            <el-popconfirm title="Are you sure?" @confirm="acceptFriend(friend.friendNickname)">
              <template #reference>
                <el-button color="#262C3A" type="info" class="friends-button">
                  <img class="accept-icon" src="@/assets/icons/add_plus.svg" alt="+">
                </el-button>
              </template>
            </el-popconfirm>
        </li>
      </ul>
    </el-collapse-item>
    <el-collapse-item name="online">
      <template #title>
        <span style="margin-left: 2px;">온라인</span>
      </template>
      <ul>
        <li v-for="friend in friendsList.online" :key="friend.id" class="d-flex p-1 friends-item">
          <el-avatar shape="circle" class="me-1 avatar" :size="28" :src="getProfileImage(friend.friendNickname)" />
          <div class="friends-name" @click="getProfileImage(friend.friendNickname)">{{ friend.friendNickname }}</div>
          <el-popover popper-class="friend-pop" placement="bottom-end" :width="100" trigger="click" effect= "dark" :show-arrow=false :hide-after=0>
            <el-button color="#262C3A" type="info" @click="deleteFriend(friend.friendNickname)">
              삭제하기
            </el-button>
            <el-button color="#262C3A" type="info" @click="joinFriend(friend.roomId)">
              입장하기
            </el-button>
            <template #reference>
              <el-button color="#262C3A" type="info" class="friends-button">
                <img class="delete-icon" src="@/assets/icons/close_delete.svg" alt="x">
              </el-button>
            </template>
          </el-popover>
        </li>
      </ul>
    </el-collapse-item>
    <el-collapse-item name="offline">
      <template #title>
        <span style="margin-left: 2px;">오프라인</span>
      </template>
      <ul>
        <li v-for="friend in friendsList.offline" :key="friend.id" class="d-flex p-1 friends-item friends-offline">
          <el-avatar shape="circle" class="me-1" :size="28" :src="getProfileImage(friend.friendNickname)" />
          <div class="friends-name">{{ friend.friendNickname }}</div>
          <el-button color="#262C3A" type="info" class="friends-button">
            <img class="delete-icon" src="@/assets/icons/close_delete.svg" alt="x">
          </el-button>
        </li>
      </ul>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import * as _ from 'lodash'


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


const store = useStore()
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

const activeNames = ref(['pending', 'online'])
const friendsList = computed(() => store.getters.friendsList)
const router = useRouter()



const acceptFriend = (friendNickname) => store.dispatch('acceptFriend', friendNickname)
const deleteFriend = (friendNickname) => store.dispatch('deleteFriend', friendNickname)
const joinFriend = (roomId) =>   router.push({ name: 'gameroom', params: { roomid: roomId } })
const getProfileImage = (friendNickname) => numToImage[friendNickname.substr(-1).charCodeAt() % 20]

store.dispatch('subscribeFriends')
store.dispatch('fetchFriendsList')
</script>

<style>
</style>