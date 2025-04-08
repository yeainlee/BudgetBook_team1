<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore';

const router = useRouter();
const userStore = useUserStore(); //pinia store 사용

const userId = ref('');
const password = ref('');
const errorMessage = ref('');

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
    errorMessage.value = err.message || '로그인에 실패했습니다.';
  }
};
</script>

<template>
  <!-- <RouterView /> -->
  <!-- <ToastNotification /> -->

  <div class="login-container">
    <h1>Login</h1>
    <!-- 로그인 버튼 누르면 handleLogin 함수 실행 -->
    <form @submit.prevent="handleLogin" novalidate>
      <!-- 아이디 입력칸 -->
      <div class="input-group">
        <label for="userId">아이디</label>
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
        <label for="password">비밀번호</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          placeholder="Please enter your PW"
        />
      </div>

      <!-- 에러 메시지 표시 -->
      <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

      <!-- 로그인 버튼 -->
      <button type="submit">SIGN IN</button>

      <!-- 회원가입 버튼 -->
      <p class="signup-text">
        Don't have an account?
        <router-link to="/join" class="signup-link">SIGN UP NOW</router-link>
      </p>
    </form>
  </div>
</template>

<style scoped>
.error-msg {
  color: #d32f2f;
  margin: 0.5rem 0;
  font-size: 0.8rem;
  font-weight: 500;
}
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 12px;
}

.input-group {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #aaa;
  border-radius: 6px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #b3e5fc;
  color: #777;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #81d4fa;
}
</style>
