<template>
  <header class="header">
    <div class="welcome">
      <h2>Welcome, {{ username }}</h2>
      <p>{{ currentDateFormatted }}</p>
    </div>
    <div class="search-notification">
      <div class="search">
        <input type="text" placeholder="Search" />
        <i class="fa-solid fa-search"></i>
      </div>
      <div class="notification">
        <i class="fa-solid fa-bell"></i>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useUserStore } from '@/store/index';

const userStore = useUserStore();
const username = computed(() => userStore.user?.username || 'BudgetNugget');

// 현재 날짜 형식 지정
const currentDateFormatted = computed(() => {
  const now = new Date();
  const options = {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  return now.toLocaleDateString('en-US', options);
});

// 컴포넌트 마운트 시 사용자 정보 로드
onMounted(() => {
  if (localStorage.getItem('token')) {
    userStore.dispatch('fetchUserProfile');
  }
});
</script>

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
  color: #888;
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
  border: 1px solid #eee;
  background-color: #f9f9f9;
  width: 250px;
  font-size: 14px;
}

.search i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
}

.notification {
  background-color: #f9f9f9;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.notification i {
  color: #888;
}
</style>
