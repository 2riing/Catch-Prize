<template>
  <ul class="records-list" style="padding: 0px;">
    <li v-for="record in recordsList" :key="record" class="d-flex p-1 justify-content-between records-item">
      <span class="records-type text-white">{{ record.type }}</span>
      <span class="records-source text-white">{{ record.source }}</span>
      <span class="records-date text-white align-self-end">{{ record.date }}</span>
    </li>
  </ul>
</template>

<script setup>
import { reactive, toRefs } from 'vue'

const records = reactive({
  recordsList: [
    { type: 'Poker', source: '승리', date: '2022-07-22'},
    { type: 'Poker', source: '패배', date: '2022-07-22'},
    { type: 'Poker', source: '패배', date: '2022-07-22'},
    { type: 'Poker', source: '승리', date: '2022-07-21'}, 
    { type: 'Poker', source: '승리', date: '2022-07-22'},
    { type: 'Poker', source: '승리', date: '2022-07-22'},
    { type: 'Poker', source: '승리', date: '2022-07-22'},
    { type: 'Poker', source: '승리', date: '2022-07-22'},
    { type: 'Poker', source: '승리', date: '2022-07-22'},
    { type: 'Poker', source: '승리', date: '2022-07-22'},
    { type: 'Poker', source: '승리', date: '2022-07-22'},
    { type: 'Poker', source: '승리', date: '2022-07-22'},
  ],
})

const { recordsList } = toRefs(records)

</script>

<style>
</style>