<template>
  <div class="d-flex add-friend-container">
    <el-input v-model="friendNickname" placeholder="이름을 입력하세요." @keyup.enter.prevent="addFriend(friendNickname)">
      <template #suffix>
        <el-button color="#262C3A" type="info" class="add-button" @click="addFriend(friendNickname)">
          <img src="@/assets/icons/person_add.svg" alt="add_friends">
        </el-button>
      </template>
    </el-input>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const friendNickname = ref('')

const addFriend = (friend) => {
  store.dispatch('addFriend', friend)
  friendNickname.value = ''
}
</script>