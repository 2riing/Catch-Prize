<template>
  <StarBackground />
  <RouterView class="ov-layout" />
  <div v-if="!isWait" class="main-person-container">
    <user-video :stream-manager="cam.publisher"></user-video>
  </div>
  <div v-if="isLoad" class="people-container">
    <div class="person-container">
      <user-video :stream-manager="cam.publisher"></user-video>
    </div>
    <div v-for="sub in cam.subscribers" class="person-container">
      <user-video v-if="sub" :stream-manager="sub"></user-video>
    </div>
    <div v-for="i in 5 - cam.subscribers.length" class="person-container"></div>
    <!-- <div v-for="sub in cam.subscribers" class="person-container">
      <user-video v-if="sub" :stream-manager="sub"></user-video>
    </div> -->
  </div>
</template>

<script setup>
import {reactive, computed, ref, inject, onBeforeUnmount} from 'vue';
import {useRoute} from 'vue-router';
import {useStore} from 'vuex';
import {OpenVidu} from 'openvidu-browser';
import {fetchRoomById} from '@/util/api';
import UserVideo from '@/components/webrtc/UserVideo.vue';
import StarBackground from '@/components/StarBackground.vue'

const $clientstate = inject("$clientstate");
const $hobulhoSocket = inject("$hobulhoSocket");
const $dataBox = inject("$dataBox");

const route = useRoute()
const store = useStore()
const roomId = route.params.roomid
const isLoad = ref(false)
const isWait = computed(() => store.getters.isWait)

const cam = reactive({
  OV: undefined,
  session: undefined,
  mainStreamManager: undefined,
  publisher: undefined,
  subscribers: [],
  mySessionId: computed(() => store.state.room.sessionId),
  myUserName: computed(() => store.state.user.currentUser.username),
})

// const unSub = () => {
//   store.dispatch('closeSubscribe')
// }


const joinSession = () => {
  // console.log(token)
  // console.log('ws connect')

  cam.OV = new OpenVidu();
  // session을 사용할 수 있게함
  cam.session = cam.OV.initSession();

  cam.session.on('streamCreated', ({stream}) => {
    const subscriber = cam.session.subscribe(stream);
    cam.subscribers.push(subscriber);
  });
  cam.session.on('streamDestroyed', ({stream}) => {
    const index = cam.subscribers.indexOf(stream.streamManager, 0);
    if (index >= 0) {
      cam.subscribers.splice(index, 1);
    }
  });
  cam.session.on('exception', ({exception}) => {
    console.warn(exception);
  });

  // getToken에서 ovdata를 반환
  // ovdata.token을 이용해서 session에 연결할 수 있음
  getToken(roomId).then(ovdata => {

    // console.log(cam.myUserName)
    cam.session.connect(ovdata.token)
        .then(() => {
          store.commit('SET_OV', ovdata)
          sessionStorage.setItem('ovdata', JSON.stringify(ovdata))
          // --- Get your own camera stream with the desired properties ---
          let publisher = cam.OV.initPublisher(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: undefined, // The source of video. If undefined default webcam
            publishAudio: true,  	// Whether you want to start publishing with your audio unmuted or not
            publishVideo: true,  	// Whether you want to start publishing with your video enabled or not
            resolution: '280x150',  // Cam Size
            frameRate: 30,			// The frame rate of your video
            insertMode: 'APPEND',	// How the video is inserted in the target element 'video-container'
            mirror: false       	// Whether to mirror your local video or not
          });
          cam.mainStreamManager = publisher;
          cam.publisher = publisher;
          // --- Publish your stream ---
          cam.publisher.subscribeToRemote();
          cam.session.publish(cam.publisher);
          setTimeout(() => {
            isLoad.value = true
          }, 1000)

        })
        .catch(error => {
          console.log('There was an error connecting to the session:', error.code, error.message);
        });
  })
  // joinSession을 하면서 beforeunload
  window.addEventListener('beforeunload', leaveSession)
}

// 세션 퇴장
const leaveSession = () => {
  const ovdata = JSON.parse(sessionStorage.getItem('ovdata'))
  // 서버에 유저 삭제 요청
  console.log(ovdata)
  store.dispatch('removeUser', {roomId, ovdata})
  // 초기화 및 이벤트 삭제
  if (cam.session) cam.session.disconnect();
  cam.session = undefined;
  cam.mainStreamManager = undefined;
  cam.publisher = undefined;
  cam.subscribers = [];
  cam.OV = undefined;
  window.removeEventListener('beforeunload', leaveSession);
}

// roomId를 이용해서 ovtoken, userId 가져오는 요청 보내기
const getToken = (roomId) => {
  return new Promise((resolve, reject) => {
    fetchRoomById({Authorization: `Bearer ${sessionStorage.getItem('token')}`}, roomId)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => reject(error.response))
  })
}

joinSession()


$hobulhoSocket.on("to-player", function (roomid, myid, item) {
  if (item == "videoRotate") {
    videoRotate(cam.publisher)
    setTimeout(cam.publisher, 20000)
  }
  if (item == "pitchVoice") {
    pitchVoice(cam.publisher)
  }
  if (item == "chroma") {
    chroma(cam.publisher)
  }
  if (item == "gray") {
    gray(cam.publisher)
  }
});

//faceApi
$hobulhoSocket.on("item-use-to-other", function (roomid, toplayer) {
//toplayer == 사용하기로 선택한 플레이어 닉네임

})

const videoRotate = (manager) => {
  manager.stream.applyFilter("GStreamerFilter", {"command": "videoflip method=vertical-flip"})
  setTimeout(() => manager.stream.removeFilter(), 20000)
}

// 크로마
const chroma = (manager) => {
  manager.stream.applyFilter("GStreamerFilter", {"command": 'chromahold target-r=0 target-g=0 target-b=255 tolerance=200'})
  setTimeout(() => manager.stream.removeFilter(), 20000)
}

// 목소리 변조
const pitchVoice = (manager) => {
  manager.stream.applyFilter("GStreamerFilter", {"command": "pitch pitch=20"})
  setTimeout(() => manager.stream.removeFilter(), 20000)
}

const gray = (manager) => {
  manager.stream.applyFilter("GStreamerFilter", {"command": "videobalance saturation=0.0"})
  setTimeout(() => manager.stream.removeFilter(), 20000)
}
</script>

<style>
.main-person-container {
  position: absolute;
  top: 140px;
  left: 90px;
  animation: videoFade 2s ease;
}

.main-person-container video {
  width: 330px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgb(46, 72, 108);
}

.people-container {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  top: 100px;
  left: 490px;
  height: 88%;
  z-index: -1;
}

.people-container .person-container {
  margin: 0.5% 1%;
  padding: 17px 20px 0px 60px;
  height: 100%;
  height: 200px;
  flex-grow: 0;
  min-width: 400px;
  width: 47%;

}

.person-container div video {
  width: 180px;
  border-radius: 5px;
  background-color: rgb(46, 72, 108);;
  box-shadow: 0 0 10px rgb(46, 72, 108);
  animation: videoFade 2s ease;
}

@keyframes videoFade {
  0%,
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }

}
</style>