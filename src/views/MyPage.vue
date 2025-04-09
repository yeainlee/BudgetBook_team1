<script setup>
import { ref } from 'vue';
import profileImage from '@/assets/profile.png';
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
      name: form.value.name,
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
          <label>아이디</label>
          <input v-model="form.username" type="text" disabled />
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
          <button type="button" @click="handleUpdate">저장</button>
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
  background-color: #b7e9fc;
  cursor: pointer;
}

.profile-section img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid rgb(62, 59, 59);
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
  background-color: #b7e9fc;
  cursor: pointer;
}
</style>
