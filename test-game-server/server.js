var app = require("express")();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

//roomid 별 data box
const statebox = [];

//시작할때 보내줄 데이터
// const state = {
//   response: {
//     success: "false",
//     error: {
//       code: "7",
//       message: "More players are required",
//     },
//   },
//   controlstate: {
//     roomId: "",
//     isShuffled: false,
//     gamestate: "",
//     deathplayer: "",
//     winner: "",
//   },
//   players: [
//     {
//       playerId: "player1",
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
//       point: 0,
//       isAlive: true,
//     },
//     {
//       playerId: "player2",
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
//       point: 0,
//       isAlive: true,
//     },
//     {
//       playerId: "player3",
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
//       point: 0,
//       isAlive: true,
//     },
//     {
//       playerId: "player4",
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
//       point: 0,
//       isAlive: true,
//     },
//     {
//       playerId: "player5",
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
//       point: 0,
//       isAlive: true,
//     },
//     {
//       playerId: "player6",
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
//       point: 0,
//       isAlive: true,
//     },
//   ],
// };
// 공격하고 판단후 보내는 데이터
// const attackstate = {
//   attackerId: "",
//   defenderId: "",
//   selectedcard: "",
//   declaredcard: "",
//   declaration: true,
// };

//6종류 10장씩의 카드를 랜덤으로 8장씩 분배
function cardshuffle(roomnum) {
  if (statebox[roomnum].controlstate.isShuffled === false) {
    const cardlist = ["cake", "durian", "eggplant", "insect", "mint", "pizza"];
    const list = [];
    for (let t = 0; t < 6; t++) {
      for (let i = 0; i < 10; i++) {
        list.push(cardlist[t]);
      }
    }
    list.sort(() => Math.random() - 0.5);
    let cnt = 0;
    for (let t = 0; t < 6; t++) {
      for (let i = 0; i < 8; i++) {
        if (list[cnt] === "cake")
          statebox[roomnum].players[t].cards.hand.cake++;
        if (list[cnt] === "durian")
          statebox[roomnum].players[t].cards.hand.durian++;
        if (list[cnt] === "eggplant")
          statebox[roomnum].players[t].cards.hand.eggplant++;
        if (list[cnt] === "insect")
          statebox[roomnum].players[t].cards.hand.insect++;
        if (list[cnt] === "mint")
          statebox[roomnum].players[t].cards.hand.mint++;
        if (list[cnt] === "pizza")
          statebox[roomnum].players[t].cards.hand.pizza++;
        cnt++;
      }
    }
    statebox[roomnum].controlstate.isShuffled = true;
  }
}

function checkdeclaration(roomnum) {
  if (
    statebox[roomnum].attackstate.selectedcard ==
    statebox[roomnum].attackstate.declaredcard
  ) {
    statebox[roomnum].attackstate.declaration = true;
  } else if (
    statebox[roomnum].attackstate.selectedcard !=
    statebox[roomnum].attackstate.declaredcard
  ) {
    statebox[roomnum].attackstate.declaration = false;
  }
}

//방어 성공
function defendSuccess(roomnum) {
  for (let t = 0; t < 6; t++) {
    if (
      statebox[roomnum].players[t].playerId ===
      statebox[roomnum].attackstate.attackerId
    ) {
      if (statebox[roomnum].attackstate.selectedcard === "cake")
        statebox[roomnum].players[t].cards.board.cake++;
      if (statebox[roomnum].attackstate.selectedcard === "durian")
        statebox[roomnum].players[t].cards.board.durian++;
      if (statebox[roomnum].attackstate.selectedcard === "eggplant")
        statebox[roomnum].players[t].cards.board.eggplant++;
      if (statebox[roomnum].attackstate.selectedcard === "insect")
        statebox[roomnum].players[t].cards.board.insect++;
      if (statebox[roomnum].attackstate.selectedcard === "mint")
        statebox[roomnum].players[t].cards.board.mint++;
      if (statebox[roomnum].attackstate.selectedcard === "pizza")
        statebox[roomnum].players[t].cards.board.pizza++;
    }
  }
}
//방어 실패
function defendFail(roomnum) {
  for (let t = 0; t < 6; t++) {
    if (
      statebox[roomnum].players[t].playerId ===
      statebox[roomnum].attackstate.defenderId
    ) {
      if (statebox[roomnum].attackstate.selectedcard === "cake")
        statebox[roomnum].players[t].cards.board.cake++;
      if (statebox[roomnum].attackstate.selectedcard === "durian")
        statebox[roomnum].players[t].cards.board.durian++;
      if (statebox[roomnum].attackstate.selectedcard === "eggplant")
        statebox[roomnum].players[t].cards.board.eggplant++;
      if (statebox[roomnum].attackstate.selectedcard === "insect")
        statebox[roomnum].players[t].cards.board.insect++;
      if (statebox[roomnum].attackstate.selectedcard === "mint")
        statebox[roomnum].players[t].cards.board.mint++;
      if (statebox[roomnum].attackstate.selectedcard === "pizza")
        statebox[roomnum].players[t].cards.board.pizza++;
    }
  }
}
function checkDeath(roomnum, player) {
  for (let t = 0; t < 6; t++) {
    if (player === statebox[roomnum].players[t].playerId) {
      if (
        statebox[roomnum].players[t].cards.board.cake >= 3 ||
        statebox[roomnum].players[t].cards.board.durian >= 3 ||
        statebox[roomnum].players[t].cards.board.eggplant >= 3 ||
        statebox[roomnum].players[t].cards.board.insect >= 3 ||
        statebox[roomnum].players[t].cards.board.mint >= 3 ||
        statebox[roomnum].players[t].cards.board.pizza >= 3
      ) {
        statebox[roomnum].players[t].isAlive = false;
        statebox[roomnum].controlstate.deathplayer = player;
        statebox[roomnum].controlstate.gamestate = "death";
        if (player === statebox[roomnum].attackstate.attackerId) {
          statebox[roomnum].attackstate.attackerId =
            statebox[roomnum].attackstate.defenderId;
        } else if (player === statebox[roomnum].attackstate.defenderId) {
          statebox[roomnum].attackstate.attackerId =
            statebox[roomnum].attackstate.attackerId;
        }
        return 1;
      }
    }
  }
  return 0;
}
function noCardDeath(roomnum, player) {
  for (let t = 0; t < 6; t++) {
    if (player === statebox[roomnum].players[t].playerId) {
      if (statebox[roomnum].players[t].cards.remain === 0) {
        statebox[roomnum].players[t].isAlive = false;
        statebox[roomnum].controlstate.deathplayer = player;
        statebox[roomnum].controlstate.gamestate = "no-card-death";
        if (
          statebox[roomnum].attackstate.attackerId ===
          statebox[roomnum].attackstate.defenderId
        ) {
          statebox[roomnum].attackstate.attackerId =
            statebox[roomnum].attackstate.lastattackerId;
        } else {
          statebox[roomnum].attackstate.attackerId =
            statebox[roomnum].attackstate.defenderId;
        }
        return 1;
      }
    }
  }
  return 0;
}
//우승자 확인
function checkwin(roomnum) {
  let cnt = 0;
  for (let t = 0; t < 6; t++) {
    if (statebox[roomnum].players[t].isAlive === false) {
      cnt++;
    }
  }
  if (cnt === 5) {
    for (let t = 0; t < 6; t++) {
      if (statebox[roomnum].players[t].isAlive === true) {
        statebox[roomnum].controlstate.winner =
          statebox[roomnum].players[t].playerId;
      }
    }
    return 1;
  }
  return 0;
}

//룸 서버에서 roomid와 player정보를 받으면 statebox에 push
//roomid = roomId
//playerslist = ["player1","player2","player3","player4","player5","player6",]
const roomid1 = "room1";
const playerslist1 = [
  "player11",
  "player21",
  "player31",
  "player41",
  "player51",
  "player61",
];
const roomid2 = "room2";
const playerslist2 = [
  "player12",
  "player22",
  "player32",
  "player42",
  "player52",
  "player62",
];
function stateBoxPush(roomid, playerslist) {
  //게임 데이터
  const state = {
    response: {
      success: "false",
      error: {
        code: "7",
        message: "More players are required",
      },
    },
    controlstate: {
      roomId: "",
      isShuffled: false,
      gamestate: "",
      deathplayer: "",
      winner: "",
    },
    attackstate: {
      attackerId: "",
      lastattackerId: "",
      defenderId: "",
      selectedcard: "",
      declaredcard: "",
      declaration: true,
    },
    players: [
      {
        playerId: "player1",
        cards: {
          hand: {
            cake: 0,
            durian: 0,
            eggplant: 0,
            insect: 0,
            mint: 0,
            pizza: 0,
          },
          remain: 8,
          board: {
            cake: 0,
            durian: 0,
            eggplant: 0,
            insect: 0,
            mint: 0,
            pizza: 0,
          },
        },
        point: 0,
        isAlive: true,
      },
      {
        playerId: "player2",
        cards: {
          hand: {
            cake: 0,
            durian: 0,
            eggplant: 0,
            insect: 0,
            mint: 0,
            pizza: 0,
          },
          remain: 8,
          board: {
            cake: 0,
            durian: 0,
            eggplant: 0,
            insect: 0,
            mint: 0,
            pizza: 0,
          },
        },
        point: 0,
        isAlive: true,
      },
      {
        playerId: "player3",
        cards: {
          hand: {
            cake: 0,
            durian: 0,
            eggplant: 0,
            insect: 0,
            mint: 0,
            pizza: 0,
          },
          remain: 8,
          board: {
            cake: 0,
            durian: 0,
            eggplant: 0,
            insect: 0,
            mint: 0,
            pizza: 0,
          },
        },
        point: 0,
        isAlive: true,
      },
      {
        playerId: "player4",
        cards: {
          hand: {
            cake: 0,
            durian: 0,
            eggplant: 0,
            insect: 0,
            mint: 0,
            pizza: 0,
          },
          remain: 8,
          board: {
            cake: 0,
            durian: 0,
            eggplant: 0,
            insect: 0,
            mint: 0,
            pizza: 0,
          },
        },
        point: 0,
        isAlive: true,
      },
      {
        playerId: "player5",
        cards: {
          hand: {
            cake: 0,
            durian: 0,
            eggplant: 0,
            insect: 0,
            mint: 0,
            pizza: 0,
          },
          remain: 8,
          board: {
            cake: 0,
            durian: 0,
            eggplant: 0,
            insect: 0,
            mint: 0,
            pizza: 0,
          },
        },
        point: 0,
        isAlive: true,
      },
      {
        playerId: "player6",
        cards: {
          hand: {
            cake: 0,
            durian: 0,
            eggplant: 0,
            insect: 0,
            mint: 0,
            pizza: 0,
          },
          remain: 8,
          board: {
            cake: 0,
            durian: 0,
            eggplant: 0,
            insect: 0,
            mint: 0,
            pizza: 0,
          },
        },
        point: 0,
        isAlive: true,
      },
    ],
  };
  state.controlstate.roomId = roomid;
  console.log(roomid);
  console.log(playerslist);

  for (let t = 0; t < playerslist?.length; t++) {
    state.players[t].playerId = playerslist[t];
  }

  let cnt = 0;
  for (let t = 0; t < statebox.length; t++) {
    if (statebox[t].controlstate.roomId === "roomid") {
      cnt++;
    }
  }
  if (cnt === 0) {
    statebox.push(state);
  }
}

// stateBoxPush(roomid1, playerslist1);
// console.log(statebox);
// stateBoxPush(roomid2, playerslist2);

//승자가 있는 방의 데이터는 삭제
function stateBoxDelete() {
  for (let t = 0; t < statebox.length; t++) {
    if (statebox[t].controlstate.winner != "") {
      statebox.splice(t, 1);
      t--;
    }
  }
}

//어떤 방인지 찾는 함수
function whichRoom(roomid) {
  for (let t = 0; t < statebox.length; t++) {
    if (statebox[t].controlstate.roomId === roomid) {
      return t;
    }
  }
}

//setting cors
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/", function (req, res) {
  res.sendFile("Hellow Chating App Server");
});

// var io = io.of("/io");
// const datasocket = io.of("/dataSocket");
// datasocket.on("connection", function (socket) {
//   socket.on("start-data-set", function (data) {
//     console.log(data);
//     console.log("582");
//     stateBoxPush(data.roomid, data.users);
//   });
// });

//connection event handler
io.on("connection", function (socket) {
  console.log("qqwe11");
  //스타트 데이터
  socket.on("start-data-set", function (data) {
    console.log(data);
    //   console.log("582");
    // let roomid = data.roomid
    // let list = [];
    // for (let t = 0; t < data.users.length; t++) {
    //   list.push(data.users[t]);
    // }
    // console.log(list);
    stateBoxPush(data.roomid, data.users);
    io.emit("start-data-ready");
  });
  //아이탬 사용 요청
  socket.on("use-item-for-me", function (roomid, myid, item) {
    // let roomnum = whichRoom(roomid)

    //아이탬 사용 페이지로 이동
    io.emit("to-player", roomid, myid, item);
  });
  //아이탬 다른 사람에게 사용
  socket.on("item-use-to-other", function (roomid, toplayer) {
    //ovview.vue
    io.emit("item-use-player-select", roomid, toplayer);
  });

  //서버연결되면 loading 보냄
  socket.on("server-get-roomid", function (roomid) {
    let roomnum = whichRoom(roomid);
    cardshuffle(roomnum);
    statebox[roomnum].controlstate.gamestate = "loading";
    console.log(statebox[roomnum].players);
    io.emit("data-refresh", statebox[roomnum]);
    //게임 시작 hobulhoGame.vue
    io.emit("game-start-ready");
  });

  //게임 시작 요청이 들어오면
  socket.on("hobulho-start-req", function (roomid) {
    let roomnum = whichRoom(roomid);
    if (statebox[roomnum].controlstate.gamestate === "loading")
      statebox[roomnum].controlstate.gamestate = "start";

    //state 보내기
    setTimeout(() => {
      io.emit("data-refresh", statebox[roomnum]);
      //카드 세팅 Mycards.vue
      io.emit("hobulho-start-card");
      io.emit("players-profile-setting");
      //데이터 뿌리기 HobulhoGame.vue
      //첫공격  PlayersHome.vue
      io.emit("first-attack");
    }, 2000);
  });

  socket.on("select-ready-req", function (roomid) {
    let roomnum = whichRoom(roomid);
    //attacker 저장
    statebox[roomnum].attackstate.attackerId =
      statebox[roomnum].players[0].playerId;
    //state 보내기

    // io.emit("attackdata-refresh", statebox[roomnum].attackstate);
    io.emit("data-refresh", statebox[roomnum]);
    //내차례가 아니면 gamestate = turn
    io.emit("whose-turn");
  });

  socket.on("card-click", function (roomid, cardname, playerid) {
    let roomnum = whichRoom(roomid);
    //선택된 카드를 저장
    statebox[roomnum].attackstate.selectedcard = cardname;
    for (let t = 0; t < 6; t++) {
      if (statebox[roomnum].players[t].playerId === playerid) {
        statebox[roomnum].players[t].cards.remain--;
        if (cardname === "cake") statebox[roomnum].players[t].cards.hand.cake--;
        if (cardname === "durian")
          statebox[roomnum].players[t].cards.hand.durian--;
        if (cardname === "eggplant")
          statebox[roomnum].players[t].cards.hand.eggplant--;
        if (cardname === "insect")
          statebox[roomnum].players[t].cards.hand.insect--;
        if (cardname === "mint") statebox[roomnum].players[t].cards.hand.mint--;
        if (cardname === "pizza")
          statebox[roomnum].players[t].cards.hand.pizza--;
      }
    }
    io.emit("data-refresh", statebox[roomnum]);
    //Mycards.vue PlayersHome.vue
    io.emit("players-refresh");
    // 클라이언트에게 메시지를 전송한다
    io.emit("whose-attack");
    io.emit("set-timer");
  });

  //공격할 플레이어를 클릭했을때
  socket.on("player-click", function (roomid, defender) {
    let roomnum = whichRoom(roomid);
    statebox[roomnum].attackstate.defenderId = defender;
    statebox[roomnum].controlstate.gamestate = "declare";

    //데이터 뿌리기
    io.emit("data-refresh", statebox[roomnum]);
    io.emit("whose-declare");
    io.emit("set-timer");
  });

  //뭐라고 할지 클릭했을때
  socket.on("declare-click", function (roomid, data) {
    let roomnum = whichRoom(roomid);
    statebox[roomnum].attackstate.declaredcard = data;
    // state.gamestate = "judge";
    //카드와 주장이 일치하는지 판단
    checkdeclaration(roomnum);

    //데이터 뿌리기
    io.emit("data-refresh", statebox[roomnum]);
    io.emit("whose-judge");
    io.emit("set-timer");
  });

  //방어자가 judge 선택
  socket.on("judge-selected", function (roomid, data) {
    let roomnum = whichRoom(roomid);
    //방어성공
    if (data === statebox[roomnum].attackstate.declaration) {
      statebox[roomnum].controlstate.gamestate = "success";
      io.emit("data-refresh", statebox[roomnum]);
      defendSuccess(roomnum);
      //카드를 먹은 사람이 죽었을 경우
      if (checkDeath(roomnum, statebox[roomnum].attackstate.attackerId)) {
        setTimeout(() => {
          io.emit("data-refresh", statebox[roomnum]);
          io.emit("players-refresh");
        }, 3000);
        if (checkwin(roomnum)) {
          setTimeout(() => {
            statebox[roomnum].controlstate.gamestate = "win";
            io.emit("data-refresh", statebox[roomnum]);
          }, 6000);
        } else {
          setTimeout(() => {
            io.emit("whose-turn");
            io.emit("set-timer");
          }, 6000);
          // if (noCardDeath(roomnum, statebox[roomnum].attackstate.attackerId)) {
          //   //카드가 없어서 죽었을때
          //   setTimeout(() => {
          //     io.emit("data-refresh", statebox[roomnum]);
          //     io.emit("players-refresh");
          //   }, 9000);
          //   setTimeout(() => {
          //     io.emit("whose-turn");
          //     io.emit("set-timer");
          //   }, 12000);
          // }
        }
        //죽지 않았을 경우
      } else {
        statebox[roomnum].attackstate.attackerId =
          statebox[roomnum].attackstate.attackerId;
        if (noCardDeath(roomnum, statebox[roomnum].attackstate.attackerId)) {
          //카드가 없어서 죽었을때
          setTimeout(() => {
            io.emit("data-refresh", statebox[roomnum]);
            io.emit("players-refresh");
          }, 3000);
          if (checkwin(roomnum)) {
            setTimeout(() => {
              statebox[roomnum].controlstate.gamestate = "win";
              io.emit("data-refresh", statebox[roomnum]);
            }, 6000);
          } else {
            setTimeout(() => {
              io.emit("whose-turn");
              io.emit("set-timer");
            }, 6000);
          }
        } else {
          setTimeout(() => {
            io.emit("data-refresh", statebox[roomnum]);
            io.emit("players-refresh");
            io.emit("whose-turn");
            io.emit("set-timer");
          }, 3000);
        }
      }
      //방어 실패
    } else {
      statebox[roomnum].controlstate.gamestate = "fail";
      io.emit("data-refresh", statebox[roomnum]);
      defendFail(roomnum);
      //카드를 먹은 사람이 죽었을 경우
      if (checkDeath(roomnum, statebox[roomnum].attackstate.defenderId)) {
        setTimeout(() => {
          io.emit("data-refresh", statebox[roomnum]);
          io.emit("players-refresh");
        }, 3000);
        if (checkwin(roomnum)) {
          setTimeout(() => {
            statebox[roomnum].controlstate.gamestate = "win";
            io.emit("data-refresh", statebox[roomnum]);
          }, 6000);
        } else {
          setTimeout(() => {
            io.emit("whose-turn");
            io.emit("set-timer");
          }, 6000);
          // if (noCardDeath(roomnum, statebox[roomnum].attackstate.attackerId)) {
          //   //카드가 없어서 죽었을때
          //   setTimeout(() => {
          //     io.emit("data-refresh", statebox[roomnum]);
          //     io.emit("players-refresh");
          //   }, 9000);
          //   setTimeout(() => {
          //     io.emit("whose-turn");
          //     io.emit("set-timer");
          //   }, 12000);
          // }
        }
        //죽지 않았을 경우
      } else {
        statebox[roomnum].attackstate.lastattackerId =
          statebox[roomnum].attackstate.attackerId;
        statebox[roomnum].attackstate.attackerId =
          statebox[roomnum].attackstate.defenderId;
        if (noCardDeath(roomnum, statebox[roomnum].attackstate.attackerId)) {
          //카드가 없어서 죽었을때
          setTimeout(() => {
            io.emit("data-refresh", statebox[roomnum]);
            io.emit("players-refresh");
          }, 3000);
          if (checkwin(roomnum)) {
            setTimeout(() => {
              statebox[roomnum].controlstate.gamestate = "win";
              io.emit("data-refresh", statebox[roomnum]);
            }, 6000);
          } else {
            setTimeout(() => {
              io.emit("whose-turn");
              io.emit("set-timer");
            }, 6000);
          }
        } else {
          setTimeout(() => {
            io.emit("data-refresh", statebox[roomnum]);
            io.emit("players-refresh");
            io.emit("whose-turn");
            io.emit("set-timer");
          }, 3000);
        }
      }
    }
    //플레이어창 새로고침
    //다음턴
    // io.emit("data-refresh", statebox[roomnum]);
    // io.emit("players-refresh");
  });
});

const SERVER_PORT = parseInt(process.env.ROOM_SV_PORT);

server.listen(8081, function () {
  console.log("socket io server listening on port server");
});
