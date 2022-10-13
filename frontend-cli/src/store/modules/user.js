import { EventSourcePolyfill } from 'event-source-polyfill';
import { API_BASE_URL } from "../../constants";
import jwt_decode from "jwt-decode";
import router from "../../router";
import { logout, getCurrentUser, findAllFriends, acceptFriend, addFriend, deleteFriend } from "../../util/api";
import * as _ from "lodash"

const user = {
  state: {
    token: sessionStorage.getItem('token') || '',
    currentUser: { 'username': '', 'profileImage': 9, },
    friendsList: { 'pending': {}, 'online': {}, 'offline': {} },
    isAdmin: false,
    authError: null,
    eventSource: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => state.token = token,
    SET_CURRENT_USER: (state, user) => state.currentUser = user,
    SET_FRIENDS: (state, friendsList) => state.friendsList = friendsList,
    SET_AUTH_ERROR: (state, error) => state.authError = error,
    SET_IS_ADMIN: (state, role) => state.isAdmin = (role === 'ADMIN'),
    SET_EVENT_SOURCE: (state, eventSource) => state.eventSource = eventSource
  },
  getters: {
    token: state => state.token,
    isLoggedIn: state => !!state.token,
    currentUser: state => state.currentUser,
    friendsList: state => state.friendsList,
    authError: state => state.authError,
    authHeader: state => ({ Authorization: `Bearer ${state.token}` }),
    isAdmin: state => state.isAdmin,
    eventSource: state => state.eventSource,
  },
  actions: {
    saveToken({ commit }, token) {
      commit('SET_TOKEN', token)
      localStorage.setItem('token', '')
      sessionStorage.setItem('token', token)
    },
    logout({ commit, getters }) {
      if (getters.isLoggedIn) {
        logout(getters.authHeader)
        .then(res => {
          sessionStorage.setItem('token', '')
          commit('SET_TOKEN', '')
          router.push({ name: 'home' })
          })
      }
    },
    fetchCurrentUser({ commit, getters, dispatch }) {
      if (getters.isLoggedIn) {
        getCurrentUser(getters.authHeader)
          .then(res => {
            res.data['profileImage'] = res.data.username.substr(-1).charCodeAt() % 20
            commit('SET_CURRENT_USER', res.data)
            const role = jwt_decode(getters.token).role
            commit('SET_IS_ADMIN', role)
          })
          .catch(err => {
            if (err.response.status === 401) {
              dispatch('logout')
            }
          })
      }
    },
    fetchFriendsList({ commit, getters }) {
      if (getters.isLoggedIn) {
        findAllFriends(getters.authHeader)
          .then(res => {
            const friendsList = { 'pending': {}, 'online': {}, 'offline': {} }
            res.data.forEach(friend => {
              updateFriend(friend, friendsList)
            });
            commit('SET_FRIENDS', friendsList)
          })
      }
    },
    subscribeFriends({ commit, getters }, method) {
      console.log("변동 알림 보내기");
      let eventSource = {};
      if (_.isEmpty(getters.eventSource)) {
        eventSource = new EventSourcePolyfill(`${API_BASE_URL}/friend/subscribe`, { headers: getters.authHeader });
      } else {
        eventSource = getters.eventSource;
      }
      eventSource.addEventListener("sse", function (event) {
        console.log(event.data)
        if (event.data[0] === '{') {
          const friendsList = getters.friendsList;
          const friend = JSON.parse(event.data);
          delete friendsList.offline[friend.id]
          delete friendsList.online[friend.id]
          delete friendsList.pending[friend.id]
          updateFriend(friend, friendsList)
          commit('SET_FRIENDS', friendsList)
        }
      })
      commit('SET_EVENT_SOURCE', eventSource)
    },
    closeSubscribe({ getters }) {
      const eventSource = getters.eventSource
      if (!!eventSource) {
        console.log(eventSource)
        eventSource.close()
        console.log(eventSource)
      }
    },
    acceptFriend({ dispatch, getters }, friendNickname) {
      acceptFriend(getters.authHeader, friendNickname)
        .then(res => {
          dispatch('fetchFriendsList');
        })
    },
    addFriend({ dispatch, getters }, friendNickname) {
      addFriend(getters.authHeader, friendNickname)
        .then(res => {
          dispatch('fetchFriendsList');
        })
    },
    deleteFriend({ dispatch, getters }, friendNickname) {
      deleteFriend(getters.authHeader, friendNickname)
        .then(res => {
          dispatch('fetchFriendsList');
        })
    }
  },
};

const updateFriend = (friend, friendsList) => {
  if (friend.friend) {
    if (friend.online) {
      friendsList.online[friend.id] = {
        'friendNickname': friend.friendNickname,
        'roomId' : friend.roomId
      }
    }
    else {
      friendsList.offline[friend.id] = {
        'friendNickname': friend.friendNickname,
        'roomId' : friend.roomId
      }
    }
  }
  else if (friend.pending) {
    friendsList.pending[friend.id] = {
      'friendNickname': friend.friendNickname,
      'roomId' : friend.roomId
    }
  }
}

export default user;