<template>
  <el-table :data="notices" style="width: 100%" @row-click="goToDetail">
    <el-table-column class-name="text-center" prop="id" label="No" min-width="80" />
    <el-table-column prop="title" label="제목" min-width="500" />
    <el-table-column class-name="text-center" prop="regDate" label="날짜" min-width="160" />
  </el-table>
    <el-dialog v-model="isDetail" custom-class="detail-modal" append-to-body>
      <span>
        <p class="detail-title">{{ notice.title }}</p>
      </span>
      <el-divider />
      <pre class="detail-content">{{ notice.content }}</pre>
    </el-dialog>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const notices = computed(() => store.getters.notices)
const notice = computed(() => store.getters.notice)
const isDetail = ref(false)

const fetchNotice = (id) => store.dispatch('fetchNotice', id)

const goToDetail = (row) => {
  isDetail.value = true
  fetchNotice(row.id)
}

const fetchNotices = () => store.dispatch('fetchNotices')

onMounted(() => {
  fetchNotices()
})

</script>

<style>
</style>
