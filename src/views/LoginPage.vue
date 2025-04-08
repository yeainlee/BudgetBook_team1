<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const userId = ref('');
const password = ref('');
const errorMessage = ref('');

// 로그인 버튼을 눌렀을 때 실행되는 함수
const handleLogin = () => {
  console.log('입력된 아이디 : ', userId.value);
  console.log('입력된 비밀번호 : ', password.value);

  // 아이디, 비밀번호 미입력 시, 뜨는 알람
  if (!userId.value || !password.value) {
    alert('아이디와 비밀번호를 모두 입력해주세요!');
    return;
  }

  //임시 로그인 로직 (나중에 API로 교체할 부분)
  if (userId.value === 'admin' && password.value == '1234') {
    // 로그인 성공 시
    console.log('✅ 로그인 성공!');
    errorMessage.value = '';

    // 로그인 성공 시 페이지 이동
    router.push('/main');
  } else {
    // 로그인 실패 시
    errorMessage.value = '❌ 아이디 또는 비밀번호가 틀렸습니다.';
  }
};
</script>

<template>
  <!-- <RouterView /> -->
  <!-- <ToastNotification /> -->

  <div class="login-container">
    <h1>로그인</h1>
    <!-- 로그인 버튼 누르면 handleLogin 함수 실행 -->
    <form @submit.prevent="handleLogin">
      <!-- 아이디 입력칸 -->
      <div class="input-group">
        <label for="userId">아이디</label>
        <input id="userId" v-model="userId" type="text" required />
      </div>
      <!-- 비밀번호 입력칸 -->
      <div class="input-group">
        <label for="password">비밀번호</label>
        <input id="password" v-model="password" type="password" required />
      </div>

      <!-- 에러 메시지 표시 -->
      <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

      <!-- 로그인 버튼 -->
      <button type="submit">로그인</button>
    </form>
  </div>
</template>

<style scoped>
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
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
