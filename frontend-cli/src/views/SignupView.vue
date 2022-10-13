<script setup>
import StarBackground from '@/components/StarBackground.vue'
</script>

<template>
  <div class="common-layout">
    <StarBackground />
    <el-container>
      <el-header class="my-5 py-5">
      </el-header>
      <el-main class="d-flex-column ps-5">
            <!-- 인풋 color opatcity 적용 -->
            <!-- profile 이미지 생성 -->
            <!-- nickname, email, birthday, profile사진 받아서 넘겨주기 -->

            <!-- profile box -->
            <div class="profile-box">
              <img>
              <label class="input-file-button" for="img-upload">
                File Upload
              </label>
            </div>

            <!-- nickname, email, birthday input and submit button for signup -->
            <ul class="signup_input">
              <input 
                type="file"
                id="img-upload"
                accept=".jpg, .jpeg, .png"
                style=display:none
              />
              <p>* nickname</p>
                <input 
                  id="nickname"
                  :v-model="nickname" 
                  maxlength="10"
                  placeholder="Enter your nickname"
                  pattern="[A-Za-z]+"
                  autocomplete='off'
                  spellcheck="false"
                  required
                />
              <p>* email</p>
              <!-- email 쉽게 입력할 수 있는 필드로 설정 -->
                <input 
                  type="email"
                  id="email"
                  :v-model="email"
                  placeholder="Enter your email"
                  autocomplete='off'
                  spellcheck="false"
                  required
                />
              <p>birthday</p>
                <input 
                  id="birthday"
                  type="date"
                  v-model="birthday"  
                  max="2999-12-31"
                />
              <div>
                <!-- 제출 버튼 -->
                <button>Sign Up!</button>
              </div>
            </ul>
      </el-main>
    </el-container>
  </div>

  
</template>

<style>
/* signup.css파일  */
@import '../assets/signup.css';
/* galmuri 한글폰트 cdn */
@import url('https://cdn.jsdelivr.net/npm/galmuri@latest/dist/galmuri.css');
/* press start 2p font cdn */
@import url('http://fonts.cdnfonts.com/css/press-start-2p');
</style>
