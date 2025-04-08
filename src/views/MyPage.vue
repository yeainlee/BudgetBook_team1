<script setup>
import { ref } from 'vue';

const form = ref({
  username: '',
  password: '',
  email: '',
  name: '',
});

const resetForm = () => {
  form.value = {
    username: '',
    password: '',
    email: '',
    name: '',
  };
};
</script>

<template>
  <div class="mypage-container">
    <div class="setting-wrapper">
      <!-- 왼쪽: 프로필 -->
      <div class="profile-section">
        <img :src="'https://placekitten.com/100/100'" alt="프로필 이미지" />
        <button @click="changeProfile" class="profile-button">
          프로필 변경
        </button>
      </div>

      <!-- 오른쪽: 입력 폼 -->
      <form class="form-section">
        <h1 class="form-title">SETTING ACCOUNT</h1>
        <div class="icon-wrapper">
          <i class="fa-solid fa-pen-to-square edit-icon" @click="resetForm"></i>
        </div>
        <div>
          <label>아이디 변경</label>
          <input v-model="form.username" type="text" />
        </div>

        <div>
          <label>비밀번호 변경</label>
          <input v-model="form.password" type="password" />
        </div>

        <div>
          <label>이메일 확인</label>
          <input v-model="form.email" type="email" />
        </div>

        <div>
          <label>이름</label>
          <input v-model="form.name" type="text" />
        </div>

        <div class="form-buttons">
          <button type="button" @click="handleUpdate">수정</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.mypage-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background-color: white;
  border-radius: 10px;
}

.mypage-container h1 {
  font-size: 24px;
  margin-bottom: 30px;
}

.setting-wrapper {
  display: flex;
  gap: 40px;
  align-items: center;
}

.profile-section {
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.profile-button {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  background-color: #c9eaff;
  cursor: pointer;
}

.profile-section img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #e5e7eb;
}

.form-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 5px;
}

.icon-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0px;
}

.edit-icon {
  font-size: 20px;
  color: black;
}

.form-section {
  width: 400px;
  flex: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-section label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-section input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5;
}

.form-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.form-buttons button {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  background-color: #c9eaff;
  cursor: pointer;
}
</style>
