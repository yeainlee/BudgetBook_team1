<script setup>
import { ref } from 'vue';

const userId = ref('');
const password = ref('');
const confirmPassword = ref('');
const name = ref('');
const email = ref('');
const phone = ref('');
</script>

<template>
  <!-- <RouterView /> -->
  <!-- <ToastNotification /> -->

  <div class="join-container">
    <h1>CREATE ACCOUNT</h1>
    <form @submit.prevent="() => {}">
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
      </div>

      <!-- 회원가입 버튼 -->
      <button type="submit">회원가입</button>
    </form>
  </div>
</template>

<style scoped>
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
