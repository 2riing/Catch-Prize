import { createApp, reactive } from "vue";
// import { useRoute } from "vue-router";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// element UI import
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";

import "./assets/main.css";

// import io from "socket.io-client";
// const hobulhoSocket = io("https://rsv.catch-prize.com"
// // , {
//   //transports: ["websocket"],
// // }
// );
import io from "socket.io-client";
const hobulhoSocket = io("https://gsv.catch-prize.com", {
    transports: ["websocket"],
});
const app = createApp(App);
const clientstate = reactive({
    myid: "",
    roomid: "",
    gamestate: "",
    attackerId: "",
    deathplayer: "",
    winner: "",
    defenderId: "",
    declaredcard: "",
    cardname: "",
    largeScreen: "",
    playerlist: [],
});
// const attackstate = reactive({
//   attackerId: "",
//   defenderId: "",
//   selectedcard: "",
//   declaredcard: "",
//   declaration: true,
// });
// const state = reactive({
//   response: {
//     success: "false",
//     error: {
//       code: "7",
//       message: "More players are required",
//     },
//   },
//   gamestate: "",
//   deathplayer: "",
//   winner: "",
//   players: [
//     {
//       playerId: "player11",
//       cards: {
//         hand: {
//           cake: 0,
//           durian: 0,
//           eggplant: 0,
//           insect: 0,
//           mint: 0,
//           pizza: 0,
//         },
//         remain: 8,
//         board: {
//           cake: 0,
//           durian: 0,
//           eggplant: 0,
//           insect: 0,
//           mint: 0,
//           pizza: 0,
//         },
//       },
//       isAlive: false,
//     },
//     {
//       playerId: "player21",
//       cards: {
//         hand: {
//           cake: 0,
//           durian: 0,
//           eggplant: 0,
//           insect: 0,
//           mint: 0,
//           pizza: 0,
//         },
//         remain: 8,
//         board: {
//           cake: 0,
//           durian: 0,
//           eggplant: 0,
//           insect: 0,
//           mint: 0,
//           pizza: 0,
//         },
//       },
//       isAlive: false,
//     },
//     {
//       playerId: "player31",
//       cards: {
//         hand: {
//           cake: 0,
//           durian: 0,
//           eggplant: 0,
//           insect: 0,
//           mint: 0,
//           pizza: 0,
//         },
//         remain: 8,
//         board: {
//           cake: 0,
//           durian: 0,
//           eggplant: 0,
//           insect: 0,
//           mint: 0,
//           pizza: 0,
//         },
//       },
//       isAlive: false,
//     },
//     {
//       playerId: "player41",
//       cards: {
//         hand: {
//           cake: 0,
//           durian: 0,
//           eggplant: 0,
//           insect: 0,
//           mint: 0,
//           pizza: 0,
//         },
//         remain: 8,
//         board: {
//           cake: 0,
//           durian: 0,
//           eggplant: 0,
//           insect: 0,
//           mint: 0,
//           pizza: 0,
//         },
//       },
//       isAlive: false,
//     },
//     {
//       playerId: "player51",
//       cards: {
//         hand: {
//           cake: 0,
//           durian: 0,
//           eggplant: 0,
//           insect: 0,
//           mint: 0,
//           pizza: 0,
//         },
//         remain: 8,
//         board: {
//           cake: 0,
//           durian: 0,
//           eggplant: 0,
//           insect: 0,
//           mint: 0,
//           pizza: 0,
//         },
//       },
//       isAlive: false,
//     },
//     {
//       playerId: "player61",
//       cards: {
//         hand: {
//           cake: 0,
//           durian: 0,
//           eggplant: 0,
//           insect: 0,
//           mint: 0,
//           pizza: 0,
//         },
//         remain: 8,
//         board: {
//           cake: 0,
//           durian: 0,
//           eggplant: 0,
//           insect: 0,
//           mint: 0,
//           pizza: 0,
//         },
//       },
//       isAlive: false,
//     },
//   ],
// });

const dataBox = reactive([]);

hobulhoSocket.on("data-refresh", function (data) {
    console.log(data);
    if (dataBox.length === 0) {
        dataBox.push(data);
    }
    let cnt = 0;
    for (let t = 0; t < dataBox.length; t++) {
        if (dataBox[t].controlstate.roomId === data.controlstate.roomId) {
            dataBox[t] = data;
            cnt++;
        }
    }
    if (cnt === 0) {
        dataBox.push;
    }
    for (let t = 0; t < dataBox.length; t++) {
        if (dataBox[t].controlstate.roomId === clientstate.roomid) {
            clientstate.gamestate = dataBox[t].controlstate.gamestate;
            clientstate.deathplayer = dataBox[t].controlstate.deathplayer;
            clientstate.winner = dataBox[t].controlstate.winner;
            clientstate.attackerId = dataBox[t].attackstate.attackerId;
            clientstate.defenderId = dataBox[t].attackstate.defenderId;
            clientstate.declaredcard = dataBox[t].attackstate.declaredcard;
            for (let i = 0; i < 6; i++) {
                clientstate.playerlist[i] = dataBox[t].players[i].playerId;
            }
        }
    }
    if (clientstate.declaredcard === "cake") {
        clientstate.cardname = "오이케이크";
    }
    if (clientstate.declaredcard === "durian") {
        clientstate.cardname = "두리안";
    }
    if (clientstate.declaredcard === "eggplant") {
        clientstate.cardname = "가지";
    }
    if (clientstate.declaredcard === "insect") {
        clientstate.cardname = "곤충튀김";
    }
    if (clientstate.declaredcard === "mint") {
        clientstate.cardname = "민트초코";
    }
    if (clientstate.declaredcard === "pizza") {
        clientstate.cardname = "파인애플피자";
    }
    // console.log(dataBox);
    // console.log(clientstate.roomid);
    // state.players = data.players;
    // state.gamestate = data.controlstate.gamestate;
    // state.deathplayer = data.controlstate.deathplayer;
    // state.winner = data.controlstate.winner;
    // attackstate.attackerId = data.attackstate.attackerId;
    // attackstate.defenderId = data.attackstate.defenderId;
    // attackstate.selectedcard = data.attackstate.selectedcard;
    // attackstate.declaredcard = data.attackstate.declaredcard;
    // attackstate.declaration = data.attackstate.declaration;
});
// hobulhoSocket.on("attackdata-refresh", function (data) {
//   attackstate.attackerId = data.attackstate.attackerId;
//   attackstate.defenderId = data.attackstate.defenderId;
//   attackstate.selectedcard = data.attackstate.selectedcard;
//   attackstate.declaredcard = data.attackstate.declaredcard;
//   attackstate.declaration = data.attackstate.declaration;
// });

app.provide("$hobulhoSocket", hobulhoSocket);
app.provide("$clientstate", clientstate);
// app.provide("$state", state);
// app.provide("$attackstate", attackstate);
app.provide("$dataBox", dataBox);
app.use(router);
app.use(ElementPlus);
app.use(store);
app.mount("#app");
