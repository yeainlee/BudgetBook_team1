<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore';
import logo from '@/img/Logo.png';
import { useToastStore } from '@/store/toastStore';
import ToastMessage from '@/components/ToastNotification.vue';

const router = useRouter();
const userStore = useUserStore(); //pinia store 사용

const userId = ref('');
const password = ref('');
const errorMessage = ref('');
const showPassword = ref(false);

// 로그인 버튼을 눌렀을 때 실행되는 함수
// Pinia login 함수 사용
const handleLogin = async () => {
  if (!userId.value || !password.value) {
    errorMessage.value = '아이디와 비밀번호를 모두 입력해주세요.';
    return;
  }
  try {
    const loginSuccess = await userStore.login(userId.value, password.value);

    if (loginSuccess) {
      errorMessage.value = '';
      router.push('/main');
    }
  } catch (err) {
    // errorMessage.value = '로그인에 실패했습니다.';
    // console.log('err:message : ' + errorMessage.value);
    toastStore.showToast(errorMessage.value, 'error');
  }
};
</script>

<template>
  <!-- <RouterView /> -->
  <ToastMessage />

  <div class="login-page">
    <!-- 로고 이미지 추가 -->
    <div class="logo-container">
      <img :src="logo" alt="Logo" class="logo" />
    </div>
    <div class="login-container">
      <h1>Login</h1>
      <br />
      <!-- 로그인 버튼 누르면 handleLogin 함수 실행 -->
      <form @submit.prevent="handleLogin" novalidate>
        <!-- 아이디 입력칸 -->
        <div class="input-group">
          <!-- <label for="userId">아이디</label> -->
          <input
            id="userId"
            v-model="userId"
            type="text"
            required
            placeholder="Please enter your ID"
          />
        </div>
        <!-- 비밀번호 입력칸 -->
        <div class="input-group">
          <!-- <label for="password">비밀번호</label> -->
          <div class="password-wrapper">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="Please enter your PW"
            />
            <button
              type="button"
              class="eye-button"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? '🙉' : '🙈' }}
            </button>
          </div>
        </div>
        <!-- 에러 메시지 표시 -->
        <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
        <!-- 로그인 버튼 -->
        <button
          class="login-button"
          type="submit"
          :disabled="userStore.loading"
        >
          {{ userStore.loading ? 'Signing in...' : 'SIGN IN' }}
        </button>
        <!-- 회원가입 버튼 -->
        <p class="signup-text">
          Don't have an account?
          <router-link to="/join" class="signup-link">SIGN UP NOW</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  height: 100vh;
}
.error-msg {
  color: var(--red-color);
  margin: 0.5rem 0;
  font-size: 0.8rem;
  font-weight: 500;
}
.logo-container {
  flex: 1.2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo {
  max-width: 1000px;
  width: 100%;
  height: auto;
}
.login-container {
  flex: 0.8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  padding: 2rem;
  font-size: 1.8rem;
  align-items: left;
}

.input-group {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

h1 {
  font-size: 1.8rem;
  margin: 0;
  padding: 0;
  text-align: center;
  width: 100%;
}

input {
  width: 70%;
  padding: 1rem;
  border: 1.3px solid var(--border-color);
  border-radius: 7px;
  margin-bottom: 0.7rem auto;
}

button {
  width: 70%;
  padding: 0.75rem;
  background-color: var(--light-color);
  color: black;
  border: none;
  margin: 1rem auto;
  display: block;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: var(--button-color);
}
button:disabled {
  background-color: var(--background-color);
  color: var(--border-color);
  cursor: not-allowed;
}
.password-wrapper {
  position: relative;
  width: 70%;
  margin: 0 auto;
}
.password-wrapper input {
  width: 100%;
  padding: 1rem;
  padding-right: 2.5rem;
  border: 1.3px solid var(--border-color);
  border-radius: 10px;
  display: block;
  margin-bottom: 0.7rem;
}
.eye-button {
  all: unset;
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  font-size: 1.3rem;
  cursor: pointer;
  line-height: 1;
}
.eye-button:focus,
.eye-button:hover {
  outline: none;
  background: transparent;
  box-shadow: none;
}

.signup-text {
  font-size: 1rem;
  text-align: center;
  margin-top: 1rem;
}
</style>
