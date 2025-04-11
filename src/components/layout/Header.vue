<script setup>
import { computed } from 'vue';
import { useUserStore } from '../../store/userStore';

const userStore = useUserStore();

// 사용자 이름 표시 (로그인된 상태면 사용자 이름, 아니면 기본값)
const userName = computed(() =>
  userStore.isLoggedIn && userStore.user
    ? userStore.user.user_nickname
    : 'BudgetNugget'
);

// 현재 날짜 형식 지정
const currentDateFormatted = computed(() => {
  const now = new Date();
  const options = {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  return now.toLocaleDateString('ko-KR', options);
});
</script>

<template>
  <header class="header">
    <div class="welcome">
      <h2>안녕하세요, {{ userName }}</h2>
      <p>{{ currentDateFormatted }}</p>
    </div>
    <div class="search-notification">
      <div class="notification">
        <i class="fa-solid fa-bell"></i>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.welcome h2 {
  font-size: 20px;
  font-weight: 600;
}

.welcome p {
  color: var(--light-text);
  font-size: 14px;
  margin-top: 4px;
}

.search-notification {
  display: flex;
  align-items: center;
}

.search {
  position: relative;
  margin-right: 20px;
}

.search input {
  padding: 8px 16px;
  padding-left: 40px;
  border-radius: 20px;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  width: 250px;
  font-size: 14px;
}

.search i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--light-text);
}

.notification {
  background-color: var(--background-color);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.notification i {
  color: var(--light-text);
}
</style>
