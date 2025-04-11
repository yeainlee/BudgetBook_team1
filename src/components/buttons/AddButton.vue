<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore';

// css 코드 블럭애서 색상 코드 받아오기
const rootStyle = getComputedStyle(document.documentElement);
const border = rootStyle.getPropertyValue('--border-color').trim();
const button = rootStyle.getPropertyPriority('--button-color').trim();

// 라우터 인스턴스 가져오기
const router = useRouter();

// 사용자 pinia 스토어 인스턴스 가져오기
const userStore = useUserStore();

// 사용자 로그인 여부 및 아이디 확인 (계산 속성으로 반응형 처리)
const userName = computed(() =>
  userStore.isLoggedIn && userStore.user ? userStore.user.id : null
);

// 거래 등록 페이지로 이동
function goToAddPage() {
  router.push('/transaction/edit');
}
</script>

<template>
  <div class="add-button">
    <!-- 플로팅 버튼: 클릭 시 거래 등록 페이지로 이동 -->
    <button @click="goToAddPage">+</button>
  </div>
</template>

<style scoped>
/* 버튼이 화면 오른쪽 아래 고정되도록 설정 */
.add-button {
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  position: fixed;
}

/* 버튼 스타일 지정 (둥글고 강조된 + 버튼) */
button {
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0;
  border-radius: 50%;
  background-color: var(--button-color);
  border: none;
  cursor: pointer;
}
</style>
