<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore';

// 색상 코드 받아오기
const rootStyle = getComputedStyle(document.documentElement);
const border = rootStyle.getPropertyValue('--border-color').trim();
const button = rootStyle.getPropertyPriority('--button-color').trim();

const router = useRouter();
const userStore = useUserStore(); // Pinia 스토어 사용

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
    <button @click="goToAddPage">+</button>
  </div>
</template>

<style scoped>
.add-button {
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  position: fixed;
}

button {
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0;
  border-radius: 50%;
  background-color: var(--button-color);
  border: 1px solid var(—border-color);
  cursor: pointer;
}
</style>
