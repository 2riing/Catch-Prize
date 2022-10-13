import axios from "axios";
import { API_BASE_URL } from "../constants";

const api = axios.create({
  baseURL: API_BASE_URL,
})

/* -------------------user------------------- */

async function getCurrentUser(headers) {
  try {
    const res = await api.get('/user/me', { headers: headers })
    return res
  } catch (err) {
    console.log(err)
  }
}

async function logout(headers) {
  try {
    const res = await api.post('/auth/logout', {}, { headers: headers })
    return res
  } catch (err) {
    console.log(err)
  }
}

async function findAllFriends(headers) {
  try {
    const res = await api.get('/friend', { headers })
    return res
  } catch (err) {
    console.log(err)
  }
}

async function acceptFriend(headers, friendNickname) {
  try {
    const res = await api.put(`/friend/${friendNickname}`, {}, { headers })
    return res
  } catch (err) {
    console.log(err)
  }
}

async function addFriend(headers, friendNickname) {
  try {
    const res = await api.post(`/friend/${friendNickname}`, {}, { headers })
    return res
  } catch (err) {
    console.log(err)
  }
}

async function deleteFriend(headers, friendNickname) {
  try {
    const res = await api.delete(`/friend/${friendNickname}`, { headers })
    return res
  } catch (err) {
    console.log(err)
  }
}

export {logout, getCurrentUser, findAllFriends, acceptFriend, addFriend, deleteFriend}

/* -------------------notice------------------- */

async function findNoticeByPgno(headers) {
  try {
    const res = await api.get('/notice', { params: {page:1, size: 10} }, { headers })
    return res
  } catch (err) {
    console.log(err)
  }
}

async function createNotice(headers, data) {
  try {
    const res = await api.post('/notice', data, { headers })
    return res
  } catch (err) {
    console.log(err)
  }
}

async function findNoticeById(headers, noticeId) {
  try {
    const res = await api.get(`/notice/${noticeId}`, { headers })
    return res
  } catch (err) {
    console.log(err)
  }
}

async function updateNotice(headers, data) {
  try {
    const res = await api.put(`/notice/${data.id}`, data, { headers })
    return res
  } catch (err) {
    console.log(err)
  }
}

async function deleteNotice(headers, noticeId) {
  try {
    const res = await api.delete(`/notice/${noticeId}`, { headers })
    return res
  } catch (err) {
    console.log(err)
  }
}

async function createToken(headers, sessionId) {
  try {
    const res = await api.post(`/__/${sessionId}`, { data: sessionId }, { headers })
    return res
  } catch (err) {
    console.log(err)
  }
}

async function createSession(headers, sessionId) {
  try {
    const res = await api.post(`/__/${sessionId}`, { data: sessionId }, { headers })
    return res
  } catch (err) {
    console.log(err)
  }
}

async function fetchRooms(headers) {
  try {
    const res = await api.get('/gamesession', { headers: headers })
    return res
  } catch (err) {
    console.log(err)
  }
}

async function fetchRoomById(headers, roomId) {
  try {
    const res = await api.post(`/gamesession/${roomId}`, { data: roomId }, { headers })
    return res
  } catch (err) {
    console.log(err)
  }
}

async function createRoom(headers, data) {
  try {
    const res = await api.get('/gamesession/make/test', { params: data, headers: headers })
    return res
  } catch (err) {
    console.log(err)
  }
}


async function removeUser(headers, roomId, data) {
  try {
    const res = await api.delete(`/gamesession/${roomId}`, { data: data, headers: headers } )
    return res
  } catch (err) {
    console.log(err)
  }
}

async function startGame(headers, roomId) {
  try {
    const res = await api.get('/gamesession/start/' + roomId, { headers: headers })
    return res
  } catch (err) {
    console.log(err)
  }
}


async function getConnection(headers, data) {
  try {
    const res = await api.get('/gamesession/start/' + roomId, { headers: headers })
    return res
  } catch (err) {
    console.log(err)
  }
}

export { findNoticeByPgno, createNotice, findNoticeById, updateNotice, deleteNotice, 
        createSession, createToken, fetchRooms, fetchRoomById, createRoom, removeUser, startGame, getConnection }