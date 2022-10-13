import router from '../../router';
import { fetchRooms, createRoom, removeUser, fetchRoomById, startGame } from "../../util/api";
import * as _ from "lodash"
import jwt_decode from "jwt-decode";

const room = {
  state: {
    rooms: [],
    room: {},
    roomMessages: [],
    ov: {},
    sessionId: sessionStorage.getItem("sessionId") || "",
    gameinfo: { roomName: "", roomType: "HOBULHO", maxParticipants: 6 },
    isWait: true,
    roomData: {},
    isHost: false,
  },

  getters: {
    rooms: state => state.rooms,
    room: state => state.room,
    roomMessages: state => state.roomMessages,
    ov: state => state.ov,
    sessionId: state => state.sessionId,
    gameinfo: state => state.gameinfo,
    isWait: state => state.isWait,
    roomData: state => state.roomData,
    isHost: state => state.isHost,
  },

  mutations: {
    SET_ROOMS: (state, rooms) => state.rooms = rooms,
    SET_ROOM: (state, room) => state.room = room,
    SET_ROOM_MESSAGES: (state, roomMessages) => state.roomMessages = roomMessages,
    SET_OV: (state, ov) => state.ov = ov,
    SET_SESSIONID: (state, sessionId) => state.sessionId = sessionId,
    SET_GAMEINFO: (state, gameinfo) => state.gameinfo = gameinfo,
    SET_ISWAIT: (state, isWait) => state.isWait = isWait,
    SET_ROOM_DATA: (state, roomData) => state.roomData = roomData,
    SET_IS_HOST: (state, isHost) => state.isHost = isHost,
  },  

  actions: {
    fetchRooms({ commit, getters }) {
      fetchRooms(getters.authHeader)
      .then(res => {
        if (res?.status == 200){
          commit('SET_ROOMS', res.data)
        }
      })
    },

    createRoom({ commit, getters, dispatch }, gameinfo) {
      console.log('게임 생성')
      createRoom(getters.authHeader, gameinfo)
        .then(res => {
          console.log(res.data)
          commit('SET_ROOM', res.data)
          dispatch('subscribeRoom')
          sessionStorage.setItem('roomId', res.data.roomId)
          sessionStorage.setItem('sessionId', 'ses_' + res.data.roomId)
          commit('SET_IS_HOST', true)
          console.log(res.data.roomId)
          router.push({
            name: 'gameroom',
            params: { roomid: res.data.roomId }
          })
        })
    },

    enterRoom({ commit, getters, dispatch }, roomId) {
      fetchRoomById(getters.authHeader, roomId)
      .then(res => {
        console.log(res)
        commit('SET_ROOM', res.data)
        dispatch('subscribeRoom')
        sessionStorage.setItem('roomData', res.data)
        commit('SET_IS_HOST', false)
        router.push({
          name: 'gameroom',
          params: { roomid: roomId }
        })
      })
    },

    removeUser({ getters }, data) {
      removeUser(getters.authHeader, data.roomId, data.ovdata)
      .then(res => {
        sessionStorage.setItem('roomData', '')
        sessionStorage.setItem('ovdata','')
        sessionStorage.setItem('roomId','')
        sessionStorage.setItem('sessionId','')
      })
    },

    startGame({ getters, commit }, roomId) {
      startGame(getters.authHeader, roomId)
      .then(res => {console.log(res)})
    },

    subscribeRoom({ commit, getters }) {
      console.log("방 변동 알림 보내기");
      let eventSource = {};
      if (_.isEmpty(getters.eventSource)) {
        eventSource = new EventSourcePolyfill(
          `${API_BASE_URL}/friend/subscribe`,
          { headers: getters.authHeader }
        );
      } else {
        eventSource = getters.eventSource;
      }
      eventSource.addEventListener("sse-room", function (event) {
        if (event.data[0] === "{") {
          console.log(event.data);
          const data = JSON.parse(event.data);
          const username = jwt_decode(getters.token).username
          if (username == data.hostName) {
            commit('SET_IS_HOST', true);
          } else {
            commit('SET_IS_HOST', false);
          }

          if (data.state == 'WAIT') {
            commit('SET_ROOM_MESSAGES', Object.keys(data.playerMap))
          } else {
            if (getters.isHost) {
              console.log('게임시작')
                router.push({
                  name: "game",
                  params: { roomid: data.roomId },
                  query: {
                    myid: username,
                    isHost: getters.isHost,
                    users: getters.roomMessages,
                  },
                });
              } else {
                router.push({
                  name: "game",
                  params: { roomid: data.roomId },
                  query: { myid: username, isHost: getters.isHost },
                });
              }
          }
        }
      });
      commit("SET_EVENT_SOURCE", eventSource);
    },
  },
};

export default room;
