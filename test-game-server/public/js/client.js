// "use strict";

// const SERVER_ROOM_URL = "https://localhost:3010";

// const socket = io.connect(SERVER_ROOM_URL);

// const userName = (Math.random() + 1).toString(36).substring(7);
// document.querySelector("#userName").innerHTML = userName;

// const createRoomBtn = document.querySelector("#createRoomBtn");
// const joinRoomBtn = document.querySelector("#joinRoomBtn");
// createRoomBtn.addEventListener("click", (event) => {
//   const roomName = document.querySelector("#createRoomInput").value;
//   document.querySelector("#roomName").innerHTML = roomName;
//   socket.emit("create-room-req", { userName, roomName });
// });
// joinRoomBtn.addEventListener("click", (event) => {
//   const roomId = document.querySelector("#joinRoomInput").value;
//   socket.emit("join-room-req", { userName, roomId });
// });

// const getRoomsBtn = document.querySelector("#getRoomsBtn");
// getRoomsBtn.addEventListener("click", (event) => {
//   socket.emit("get-rooms-req");
// });

// socket.on("created-room-notify", (name) => {
//   console.log(`You ${name} has created the room!`);
// });

// socket.on("joined-room-notify", (name) => {
//   console.log(`${name} has joined the room!`);
// });

// socket.on("get-rooms-resp", (rooms) => {
//   console.log(rooms);
// });

// socket.emit("event", "data");

// socket.on("event", (data) => {
//   console.log("got an event");
// });