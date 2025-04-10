<script setup>
import { ref } from 'vue';
import profileImage from '@/img/bunny.png';

import { useUserStore } from '@/store/userStore';
import { useToastStore } from '@/store/toastStore';
import ToastMessage from '@/components/ToastNotification.vue';

const userStore = useUserStore();
const toastStore = useToastStore();
const selectedImage = ref(profileImage);
const fileInput = ref(null);

// 프로필 변경 버튼 클릭 시
const changeProfile = () => {
  fileInput.value.click(); // 숨겨진 파일 input 클릭
};

// 파일 선택되면 이미지 변경
const onFileSelected = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    selectedImage.value = URL.createObjectURL(file);
  } else {
    toastStore.showToast('이미지 파일만 선택해주세요.', 'error');
  }
};

// 입력 폼 초기 정보
const form = ref({
  username: userStore.user?.id || '',
  password: userStore.user?.password || '',
  email: userStore.user?.email || '',
  name: userStore.user?.user_name || '',
});

// 초기화 함수
const resetForm = () => {
  form.value = {
    username: form.value.username,
    password: '',
    email: '',
    name: '',
  };
};
const handleUpdate = async () => {
  console.log('PATCH 요청에 사용되는 ID:', userStore.user?.id);
  try {
    // 사용자 정보 업데이트 (PATCH 요청)
    await userStore.updateUser(userStore.user.id, {
      id: form.value.username,
      password: form.value.password,
      email: form.value.email,
      user_name: form.value.name,
    });

    // 수정된 정보로 현재 사용자 정보 갱신
    userStore.user = {
      ...userStore.user,
      password: form.value.password,
      email: form.value.email,
      user_name: form.value.name,
    };

    toastStore.showToast('회원 정보가 수정되었습니다.', 'success');
    localStorage.setItem('user', JSON.stringify(userStore.user)); // 저장소에도 반영
  } catch (err) {
    console.error('회원정보 수정 실패:', err);
    toastStore.showToast('회원정보 수정에 실패했습니다.', 'error');
  }
};
</script>

<template>
  <div class="mypage-container">
    <div class="setting-wrapper">
      <!-- 왼쪽: 프로필 -->
      <div class="profile-section">
        <img :src="selectedImage" alt="프로필 이미지" />
        <!-- 숨겨진 파일 선택 input -->
        <input
          type="file"
          accept="image/*"
          ref="fileInput"
          style="display: none"
          @change="onFileSelected"
        />
        <!-- 버튼 -->
        <button @click="changeProfile" class="profile-button">
          프로필 변경
        </button>
      </div>

      <ToastMessage />

      <!-- 오른쪽: 입력 폼 -->
      <form class="form-section">
        <h1 class="form-title">SETTING ACCOUNT</h1>
        <div class="icon-wrapper">
          <i class="fa-solid fa-pen-to-square edit-icon" @click="resetForm"></i>
        </div>
        <div>
          <!-- 아이디는 변경 불가능 -->
          <p>아이디</p>
          <input v-model="form.username" type="text" disabled />
        </div>

        <div>
          <p>비밀번호 변경</p>
          <input v-model="form.password" type="password" />
        </div>

        <div>
          <p>이메일 확인</p>
          <input v-model="form.email" type="email" />
        </div>

        <div>
          <p>이름</p>
          <input v-model="form.name" type="text" />
        </div>

        <div class="form-buttons">
          <button type="button" @click="handleUpdate">저장</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.mypage-container {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  margin: 5rem auto;
  padding: 3rem;
  background-color: white;
  border-radius: 7px;
}

.mypage-container h1 {
  font-size: 24px;
  margin-bottom: 30px;
}

.setting-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5rem;
}

.profile-section {
  flex: 0.6;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-button {
  width: 50%;
  padding: 0.75rem 0;
  border: none;
  margin: 0 10rem 0 0;
  font-size: 1rem;
  border-radius: 10px;
  background-color: var(--button-color);
  cursor: pointer;
}

.profile-section img {
  margin: 10rem 10rem 3rem auto;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid var(--dark-text);
}

.form-title {
  text-align: center;
  font-weight: 1000;
}

.icon-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: -1.3rem;
}

.edit-icon {
  font-size: 20px;
  color: black;
}

.form-section {
  width: 35rem;
  flex: none;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-section label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-section input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 7px;
}

.form-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.form-buttons button {
  width: 100%;
  padding: 0.75rem 0;
  font-size: 1rem;
  border: var(--border-color);
  padding: 12rem auto;
  border-radius: 10px;
  background-color: var(--button-color);
  cursor: pointer;
}
</style>
