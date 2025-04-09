import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useToastStore } from './toastStore';
import axios from 'axios';

const API_URL = 'http://localhost:3000/user_list';

export const useUserStore = defineStore('user', () => {
  // state
  const users = ref([]); // 전체 사용자 목록
  const user = ref(null); // 현재 로그인된 사용자 정보
  const isLoggedIn = ref(false); // 로그인 여부 상태
  const loading = ref(false); // 로딩 중 여부
  const error = ref(null); // 에러 메시지 저장

  // 상태 복원
  const savedUser = localStorage.getItem('user');
  const savedLoginStatus = localStorage.getItem('isLoggedIn');
  if (savedUser && savedLoginStatus === 'true') {
    user.value = JSON.parse(savedUser);
    isLoggedIn.value = true;
  }

  // actions
  // 특정 사용자 정보 조회 (GET)
  async function getUserById(id) {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`${API_URL}/${id}`); // GET /users/:id
      user.value = response.data; // 조회 결과 저장
      return response.data;
    } catch (err) {
      error.value = err.message || `사용자(ID: ${id} 조회 실패`;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // 사용자 회원가입 (POST)
  async function createUser(userData) {
    const toastStore = useToastStore();
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post(API_URL, userData); // POST /users
      toastStore.showToast('회원가입 성공', 'success');
      return response.data;
    } catch (err) {
      error.value = err.message || '회원가입 실패';
      toastStore.showToast(error.value, 'error');
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // 사용자 정보 수정 (PATCH)
  async function updateUser(userId, updatedData) {
    const toastStore = useToastStore();
    loading.value = true;
    error.value = null;

    try {
      // userId로 PATCH 요청
      const patchRes = await axios.patch(`${API_URL}/${userId}`, updatedData);

      // 상태 업데이트
      if (user.value && user.value.id === userId) {
        user.value = patchRes.data;
        localStorage.setItem('userId', JSON.stringify(userId.value));
      }

      toastStore.showToast('회원정보가 수정되었습니다.', 'success');
      return patchRes.data;
    } catch (err) {
      error.value = err.message || '회원정보 수정 실패';
      toastStore.showToast(error.value, 'error');
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // async function updateUser(userId, updatedData) {
  //   const toastStore = useToastStore();
  //   loading.value = true;
  //   error.value = null;
  //   try {
  //     // Step 1: 해당 사용자 정보 조회해서 numeric ID 얻기
  //     const getRes = await axios.get(`${API_URL}?id=${userId}`);
  //     if (!getRes.data.length) {
  //       throw new Error('해당 사용자를 찾을 수 없습니다.');
  //     }

  //     const numericId = getRes.data[0].id;

  //     // Step 2: 해당 numeric ID로 PATCH 요청
  //     const patchRes = await axios.patch(`${API_URL}/${userId}`, updatedData);

  //     // 상태 업데이트
  //     if (user.value && user.value.id === userId) {
  //       user.value = patchRes.data;
  //       localStorage.setItem('user', JSON.stringify(user.value));
  //     }

  //     toastStore.showToast('회원정보가 수정되었습니다.', 'success');
  //     return patchRes.data;
  //   } catch (err) {
  //     error.value = err.message || '회원정보 수정 실패';
  //     toastStore.showToast(error.value, 'error');
  //     throw err;
  //   } finally {
  //     loading.value = false;
  //   }
  // }

  // 로그인 (GET)
  async function login(loginId, loginPw) {
    const toastStore = useToastStore();
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(
        `${API_URL}?id=${loginId}&password=${loginPw}`
      );
      if (response.data.length) {
        user.value = response.data[0];
        isLoggedIn.value = true;
        toastStore.showToast('로그인 성공', 'success');

        // 로그인 성공 시 상태 저장
        localStorage.setItem('user', JSON.stringify(user.value));
        localStorage.setItem('isLoggedIn', 'true');

        return true;
      } else {
        throw new Error('로그인 실패: 아이디/비밀번호 불일치');
      }
    } catch (err) {
      error.value = err.message;
      toastStore.showToast(error.value, 'error');
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // 아이디 중복 확인 (GET)
  async function checkIdDuplicate(newId) {
    const toastStore = useToastStore();
    try {
      const response = await axios.get(`${API_URL}?id=${newId}`);
      const isDuplicate = response.data.length > 0;

      if (isDuplicate) {
        toastStore.showToast('중복된 아이디입니다.', 'error');
      } else {
        toastStore.showToast('사용 가능한 아이디입니다.', 'success');
      }

      return isDuplicate;
    } catch (err) {
      toastStore.showToast('아이디 중복 확인 실패', 'error');
      console.error('아이디 중복 확인 실패: ', err);
      return false;
    }
  }

  // 로그아웃
  function logout() {
    const toastStore = useToastStore();
    user.value = null;
    isLoggedIn.value = false;
    localStorage.removeItem('user'); // 상태 제거
    localStorage.removeItem('isLoggedIn'); // 상태 제거
    toastStore.showToast('로그아웃 되었습니다.', 'info');
  }

  return {
    users,
    user,
    isLoggedIn,
    loading,
    error,
    getUserById,
    createUser,
    updateUser,
    login,
    logout,
    checkIdDuplicate,
  };
});
