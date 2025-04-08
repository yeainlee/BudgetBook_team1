<template>
  <aside class="sidebar">
    <div
      v-for="(item, index) in menuItems"
      :key="index"
      class="icon"
      :class="{ active: isActive(item.route) }"
      @click="navigateTo(item.route)"
    >
      <i :class="item.icon"></i>
    </div>
    <div class="logout-container">
      <div class="icon logout" @click="logout">
        <i class="fa-solid fa-sign-out-alt"></i>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '../../store/index';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

// 메뉴 아이템 정의
const menuItems = [
  {
    icon: 'fa-solid fa-house-signal',
    route: '/main',
    name: '대시보드',
  },
  {
    icon: 'fa-solid fa-chart-line',
    route: '/transactions',
    name: '거래내역',
  },
  {
    icon: 'fa-solid fa-plus',
    route: '/transactions/edit',
    name: '거래추가',
  },
  {
    icon: 'fa-solid fa-user-pen',
    route: '/my',
    name: '프로필',
  },
];

// 현재 활성화된 메뉴 확인
const isActive = (path) => {
  if (path === '/main' && route.path === '/main') {
    return true;
  }
  if (
    path === '/transactions' &&
    route.path.startsWith('/transactions') &&
    route.path !== '/transactions/edit'
  ) {
    return true;
  }
  if (path === '/transactions/edit' && route.path === '/transactions/edit') {
    return true;
  }
  if (path === '/my' && route.path === '/my') {
    return true;
  }
  return false;
};

// 네비게이션 함수
const navigateTo = (path) => {
  if (route.path !== path) {
    router.push(path);
  }
};

const logout = () => {
  userStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.sidebar {
  width: 60px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 0 4px rgba(0, 0, 0, 0.05);
}

.icon {
  font-size: 22px;
  margin: 18px 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.4;
  cursor: pointer;
  transition: all 0.3s ease;
}

.icon:hover {
  opacity: 0.7;
  background-color: #f5f5f5;
  border-radius: 10px;
}

.icon.active {
  opacity: 1;
  background-color: #eef7ff;
  border-radius: 10px;
  padding: 8px;
  color: #1e88e5;
}

.logout-container {
  margin-top: 200px; /* 상단 아이템과 최대한 거리 확보 */
}

.logout {
  color: #e53935; /* 로그아웃 아이콘 색상을 빨간색으로 변경 */
}

.logout:hover {
  background-color: rgba(229, 57, 53, 0.1); /* 호버 시 빨간색 배경 */
}
</style>
