<template>
  <StarBackground />
  <el-row align="middle" class="login-layout">
    <el-col :span="24">
      <div class="d-flex justify-content-center" id="catch_prize">
        <p class="text-white text-animation">C</p>
        <p class="text-white text-animation" style="letter-spacing:-6px;">A</p>
        <p class="text-white text-animation" style="letter-spacing:-2px;">T</p>
        <p class="text-white text-animation">C</p>
        <p class="text-white text-animation" style="letter-spacing:-5px;">H</p>
        <p class="text-white text-animation me-3">!</p>
        <p class="text-green text-animation">P</p>
        <p class="text-yello text-animation blink" id="catch-prize-r" @click="drawer = true"
          style="letter-spacing:-5px; cursor: pointer;">
          R</p>
        <p class="text-green text-animation">I</p>
        <p class="text-green text-animation">Z</p>
        <p class="text-green text-animation">E</p>
      </div>
      <div class="d-flex justify-content-center">
        <div id="login_button_group" class="fade-animation">
          <button type="button" class="login_button">
            <img class="login_button_image" src="@/assets/login/google.png" alt="login with google"
              @click="loginPopup('google')" />
          </button>
          <button type="button" class="login_button">
            <img class="login_button_image" src="@/assets/login/kakao.png" alt="login with kakao"
              @click="loginPopup('kakao')" />
          </button>
          <button type="button" class="login_button">
            <img class="login_button_image" src="@/assets/login/naver.png" alt="login with naver"
              @click="loginPopup('naver')" />
          </button>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-drawer v-if="!isMobile" v-model="drawer" title="I am the game" :with-header="false" direction="ltr" size="840px"
    custom-class="game-modal">
    <Game />
  </el-drawer>
</template>

<script setup>
import StarBackground from '@/components/StarBackground.vue'
import Game from '@/components/sample-game/SampleGame.vue'
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { BASE_DEV_URL } from '../constants'

const store = useStore()
const router = useRouter()

const isLoggedIn = computed(() => store.getters.isLoggedIn)
const drawer = ref(false)
const isMobile = ref(false)
const option = 'menubar=no, status=no, toolbar=no'

const loginPopup = (url) => window.open(`${BASE_DEV_URL}/login/${url}`, '_blank', option);

const detectMobile = () => {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (err) {
    return false;
  }
};

window.checkLogin = () => {
  store.dispatch('saveToken', localStorage.getItem('token'));
  localStorage.setItem('token', '')
  if (isLoggedIn.value) {
    router.push({ name: 'lobbyMain' })
  }
}

onMounted(() => {
  isMobile.value = detectMobile();
  if (isMobile.value) {
    document.getElementById('login_button_group').style.width = '280px';
    document.getElementById('catch_prize').style.fontSize = '28px';
    document.getElementById('catch_prize').style.margin = '10px 0';
    document.getElementById('catch-prize-r').style.cursor = '';
  }
  if (isLoggedIn.value) {
    router.push({ name: 'lobbyMain' })
  } else {
    store.dispatch('logout')
  }
  window.addEventListener('unload', (event) => {
    if (isLoggedIn.value) {
      router.push({ name: 'lobbyMain' })
    } else {
      store.dispatch('logout')
    }
  });
})
</script>

<style>
.login-layout {
  height: 100vh;
}

#catch_prize {
  font-family: "PressStart2P";
  font-size: 48px;
  margin: 20px 0;
  animation-name: size-effect;
  animation-duration: 2s;
  animation-iteration-count: 1;
}

#login_button_group {
  width: 380px;
  animation: fadein 1.55s;
}

.login_button {
  padding: 0px;
  width: 100%;
  border-width: 0px;
  background: rgba(0, 0, 0, 0.0);
}

.login_button_image {
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.login_button_image:hover {
  opacity: 1;
}

.login_button_image:active {
  filter: brightness(0.7)
}

.el-drawer {
  background: rgba(0, 0, 0, 0.0);
}

.game-modal .el-drawer__body {
  padding-top: calc(50vh - 320px);
}

.text-animation {
  transition: all ease 0.3s 0s;
  vertical-align: bottom;
  padding-top: 30px;
}

.text-animation:hover {
  padding: 0 1px;
  padding-bottom: 30px;
}

.blink {
  animation-name: blink-effect;
  animation-timing-function: ease;
  animation-duration: 3s;
  animation-delay: 2.2s;
  animation-iteration-count: infinite;
  text-shadow: 0 0 1px rgba(242, 230, 60, 0.8);
}
</style>
