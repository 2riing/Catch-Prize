<template>
  <ul class="d-flex flex-wrap room-list">
    <li v-for="room in rooms" >
      <RoomItem :room="room" />
    </li>
  </ul>
</template>

<script setup>
import RoomItem from '@/components/lobby/RoomItem.vue'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue';

const store = useStore()

store.dispatch('fetchRooms')
const rooms = computed(() => store.getters.rooms)

onMounted(() => {
  store.commit('SET_ISWAIT', true)
})

</script>

<style> 
</style>