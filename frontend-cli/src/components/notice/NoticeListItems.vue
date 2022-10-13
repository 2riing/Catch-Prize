<template>
  <div>
    <div class="notice-container">
      <div class="btn-table-container">
        <div class="notice-create-btn">
        </div>
        <div class="notice-table">
          <table>
            <tr>
              <th class="table-no">NO</th>
              <th class="table-title">제목</th>
              <th class="table-time">작성시간</th>
            </tr>
            <tr v-for="p in paginatedData" :key="p.id">
              <td>{{ p.id }}</td>
              <td>
                <router-link :to="{ name: 'noticeDetail', params: { noticeId: p.id } }">{{ p.title }}</router-link>
              </td>
              <td>{{ p.regDate.substr(0, 10) }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="btn-cover">
      <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
        이전
      </button>
      <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
      <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">
        다음
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoticeListItems",
  data() {
    return {
      pageNum: 0,
    };
  },
  props: {
    listArray: {

    },
    pageSize: {
      type: Number,
      required: false,
      default: 5,
    },
  },
  methods: {
    nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum -= 1;
    },
  },
  computed: {
    pageCount() {
      let listLeng = this.listArray.length,
        listSize = this.pageSize,
        page = Math.floor(listLeng / listSize);
      if (listLeng % listSize > 0) page += 1;
      return page;
    },
    paginatedData() {
      const start = this.pageNum * this.pageSize,
        end = start + this.pageSize;
      return this.listArray.slice(start, end);
    },
  },
};
</script>

<style scoped>
@import '../../assets/notice.css';
</style>

