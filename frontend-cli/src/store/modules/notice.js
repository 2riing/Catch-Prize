import router from '../../router';
import { findNoticeByPgno, createNotice, findNoticeById, updateNotice, deleteNotice } from "../../util/api";

const notice = {
  state: {
    notices: [],
    notice: {},
  },
  getters: {
    notices: state => state.notices,
    notice: state => state.notice,
  },
  mutations: {
    SET_NOTICES: (state, notices) => state.notices = notices,
    SET_NOTICE: (state, notice) => state.notice = notice,
  },
  actions: {
    fetchNotices({ commit, getters }) {
      findNoticeByPgno(getters.authHeader)
        .then(res => {
          res.data.forEach(data => {
            data.regDate = data.regDate.substr(0, 10)
          })
          commit('SET_NOTICES', res.data)
        })
    },
    fetchNotice({ commit, getters }, noticeId) {
      findNoticeById(getters.authHeader, noticeId)
        .then(res => {
          commit('SET_NOTICE', res.data)
        })
    },
    createNotice({ getters }, notice) {
      createNotice(getters.authHeader, notice)
        .then(res => {
          router.push({
            name: 'noticeDetail',
            params: { noticeId: res.data }
          })
        })
    },
    updateNotice({ commit, getters }, notice) {
      updateNotice(getters.authHeader, notice)
        .then(res => {
          commit('SET_NOTICE', res.data)
          router.push({
            name: 'noticeDetail',
            params: { noticeId: getters.notice }
          })
        })
    },
    deleteNotice({ commit, getters }, noticeId) {
      if (confirm('정말 삭제하시겠습니까?')) {
        deleteNotice(getters.authHeader, noticeId)
          .then(() => {
            commit('SET_NOTICE', {})
            router.push({ name: 'notices' })
          })
      }
    },
  },
}

export default notice;