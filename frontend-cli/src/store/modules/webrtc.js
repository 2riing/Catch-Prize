import { createToken, createSession } from "../../util/api";

const webrtc = {
  state: {
    // ovToken: '',
    // sessionId: '',
    // mainStreamManager: '',
    // players: {},
  },
  mutation: {
    ovToken: state => state.ovToken,
    sessionId: state => state.sessionId,
    mainStreamManager: state => state.mainStreamManager,
  },
  getters: {
    SET_OVTOKEN: (state, ovToken) => state.ovToken = ovToken,
    SET_SSESIONID: (state, sessionId) => state.sessionId = sessionId,
    SET_MAINSTREAM: (state, mainStreamManager) => state.mainStreamManager = mainStreamManager,
  },
  actions: {
    createSession({ commit }, sessionId) {
      createSession(getters.authHeader, sessionId)
      .then(res => {
        commit('SET_SESSIONID', res.data)
      })
    },
    createToken({ commit }, sessionId) {
      createToken(getters.authHeader, sessionId)
      .then(res => {
        commit('SET_OVTOKEN', res.data)
      })
    },
    getToken({ dispatch }, mySessionId) {
      dispatch('createSession', mySessionId)
      .then(res => {
        dispatch('createToken', res.data)
      })
    },
    
  }
}

// export default webrtc;