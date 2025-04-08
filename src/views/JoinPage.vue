<script setup>
import { ref } from 'vue';

const userId = ref('');
const password = ref('');
const confirmPassword = ref('');
const name = ref('');
const email = ref('');
const phone = ref('');

// 에러 메시지 변수수
const userIdError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');
const nameError = ref('');
const emailError = ref('');
const phoneError = ref('');

// 이메일 정규식 검사
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 휴대폰 번호 형식 검사
const isValidPhone = (phone) => {
  const phoneRegex = /^01[0-9]-\d{3,4}-\d{4}$/;
  return phoneRegex.test(phone);
};

// 회원가입 처리
const handleSubmit = () => {
  // 에러 초기화
  userIdError.value = '';
  passwordError.value = '';
  confirmPasswordError.value = '';
  nameError.value = '';
  emailError.value = '';
  phoneError.value = '';

  let hasError = false;

  // 아이디 입력 확인
  if (!userId.value) {
    userIdError.value = '아이디를 입력해주세요.';
    hasError = true;
  }

  // 비밀번호 입력 확인
  if (!password.value) {
    passwordError.value = '비밀번호를 입력해주세요.';
    hasError = true;
  }

  // 비밀번호확인 입력 확인
  // 비밀번호 일치 확인
  if (!confirmPassword.value) {
    confirmPasswordError.value = '비밀번호 확인을 입력해주세요.';
    hasError = true;
  } else if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = '비밀번호가 일치하지 않습니다.';
    hasError = true;
  }

  // 이름 입력 확인
  if (!name.value) {
    nameError.value = '이름을 입력해주세요.';
    hasError = true;
  }

  // 이메일 입력 확인
  // 이메일 형식 체크
  if (!email.value) {
    emailError.value = '이메일을 입력해주세요.';
    hasError = true;
  } else if (!isValidEmail(email.value)) {
    emailError.value = '올바른 이메일 형식이 아닙니다.';
    hasError = true;
  }

  // 폰번호 입력 확인인
  // 폰번호 형식 체크
  if (!phone.value) {
    phoneError.value = '휴대폰 번호를 입력해주세요.';
    hasError = true;
  } else if (!isValidPhone(phone.value)) {
    phoneError.value = '올바른 휴대폰 번호 형식이 아닙니다.';
    hasError = true;
  }

  if (hasError) return;

  // 임시 성공 처리
  console.log('✅ 회원가입 성공!');
  console.log('아이디 : ', userId.value);
  console.log('이름 : ', name.value);
  console.log('이메일 : ', email.value);
  console.log('휴대폰 번호 : ', phone.value);
  alert('회원가입이 완료되었습니다!');
};
</script>

<template>
  <!-- <RouterView /> -->
  <!-- <ToastNotification /> -->

  <div class="join-container">
    <h1>CREATE ACCOUNT</h1>
    <form @submit.prevent="handleSubmit" novalidate>
      <!-- 아이디 입력 -->
      <div class="input-group">
        <label for="userId">아이디</label>
        <input
          id="userId"
          v-model="userId"
          type="text"
          placeholder="아이디를 입력하세요"
          required
        />
        <p v-if="userIdError" class="error">{{ userIdError }}</p>
      </div>

      <!-- 비밀번호 입력 -->
      <div class="input-group">
        <label for="password">비밀번호</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          required
        />
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
      </div>

      <!-- 비밀번호 확인인 입력 -->
      <div class="input-group">
        <label for="confirmPassword">비밀번호 확인</label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          required
        />
        <p v-if="confirmPasswordError" class="error">
          {{ confirmPasswordError }}
        </p>
      </div>

      <!-- 이름 입력 -->
      <div class="input-group">
        <label for="name">이름</label>
        <input
          id="name"
          v-model="name"
          type="text"
          placeholder="이름을 입력하세요"
          required
        />
        <p v-if="nameError" class="error">{{ nameError }}</p>
      </div>

      <!-- 이메일 입력 -->
      <div class="input-group">
        <label for="email">이메일</label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="이메일을 입력하세요"
          required
        />
        <p v-if="emailError" class="error">{{ emailError }}</p>
      </div>

      <!-- 휴대폰 번호 입력 -->
      <div class="input-group">
        <label for="phone">휴대폰 번호</label>
        <input
          id="phone"
          v-model="phone"
          type="tel"
          placeholder="010-0000-0000"
          required
        />
        <p v-if="phoneError" class="error">{{ phoneError }}</p>
      </div>

      <!-- 회원가입 버튼 -->
      <button type="submit">회원가입</button>
    </form>
  </div>
</template>

<style scoped>
.error {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
.join-container {
  max-width: 450px;
  margin: 80px auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 12px;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.input-group {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #aaa;
  border-radius: 6px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #90caf9;
  color: #f0f0f0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #64b5f6;
}
</style>
