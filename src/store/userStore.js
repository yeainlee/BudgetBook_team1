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

  // computed로 userId 추가
  const userId = computed(() => user.value?.id || null);

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

  // 사용자 정보 수정 (put)
  async function updateUser(userId, updatedData) {
    const toastStore = useToastStore();
    loading.value = true;
    error.value = null;

    const mergedData = {
      ...user.value, // 기존 정보
      ...updatedData, // 변경한 정보 (우선 적용됨)
    };

    try {
      // userId로 put 요청
      const patchRes = await axios.put(`${API_URL}/${userId}`, mergedData);

      // 상태 업데이트
      if (user.value && user.value.id === userId) {
        user.value = patchRes.data;
        localStorage.setItem('userId', JSON.stringify(user.value));
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

  // 로그인 (GET)
  async function login(loginId, loginPw) {
    const toastStore = useToastStore();
    loading.value = true;
    error.value = null;

    try {
      // db에서 사용자 id만 가져오기
      const response = await axios.get(`${API_URL}/${loginId}`);
      const foundUser = response.data;

      // 사용자 정보가 존재하는지 확인하고, 비밀번호 비교
      if (foundUser && foundUser.password === loginPw) {
        user.value = foundUser;
        isLoggedIn.value = true;

        // 로그인 성공 시 userid만 로컬스토리지에 저장
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', foundUser.id);

        toastStore.showToast('로그인 성공', 'success');
        console.log('로그인 성공!!');

        return true;
      } else {
        throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (err) {
      // error.value = err.message || '로그인 실패';
      error.value = '로그인 실패';
      toastStore.showToast(error.value, 'error');
      return false;
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
    userId,
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
