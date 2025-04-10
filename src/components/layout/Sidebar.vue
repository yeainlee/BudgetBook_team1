<template>
  <aside class="sidebar">
    <!-- 기존 메뉴 아이템들 -->
    <div class="menu-items">
      <div
        v-for="(item, index) in menuItems"
        :key="index"
        class="icon"
        :class="{ active: isActive(item.route) }"
        @click="navigateTo(item.route)"
      >
        <i :class="item.icon"></i>
      </div>
    </div>

    <!-- 로그아웃 버튼 (하단에 고정) -->
    <div class="logout-container">
      <div class="icon logout" @click="handleLogout">
        <i class="fa-solid fa-sign-out-alt"></i>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '../../store/userStore'; // Pinia 스토어 import
import { computed } from 'vue';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore(); // Pinia 스토어 사용
console.log(userStore.isLoggedIn);

// 사용자 이름 표시 (로그인된 상태면 사용자 이름, 아니면 기본값)
const userName = computed(() =>
  userStore.isLoggedIn && userStore.user ? userStore.user.id : null
);

// 메뉴 아이템 정의
const menuItems = [
  {
    icon: 'fa-solid fa-house-signal',
    route: '/main',
    name: '대시보드',
  },
  {
    icon: 'fa-solid fa-chart-line',
    route: '/transaction',
    name: '거래내역',
  },
  {
    icon: 'fa-solid fa-plus',
    route: '/transaction/edit',
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
  const currentPath = route.path;
  if (path === '/main' && route.path === '/main') {
    return true;
  }
  if (
    path === '/transaction' &&
    currentPath.startsWith('/transaction') &&
    !currentPath.startsWith('/transaction/edit')
  ) {
    return true;
  }
  if (
    path === '/transaction/edit' &&
    currentPath.startsWith('/transaction/edit')
  ) {
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

// 로그아웃
const handleLogout = () => {
  userStore.logout(); // userStore의 logout 액션 호출
  router.push('/login');
};
</script>

<style scoped>
.sidebar {
  width: 60px;
  background: var(--background);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 중앙 정렬로 변경 */
  box-shadow: 1px 0 4px var(--border-color);
  height: 100vh; /* 전체 높이 사용 */
  padding: 20px 0; /* 상하 패딩 추가 */
}

.menu-items {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 100px; /* 메뉴와 로그아웃 버튼 사이 간격 조정 */
}

.icon {
  font-size: 22px;
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
  background-color: var(--blue-light);
  border-radius: 10px;
  color: var(--blue-dark);
}

.icon.active {
  opacity: 1;
  background-color: var(--background-color);
  border-radius: 10px;
  padding: 8px;
  color: var(--button-color);
}

.logout-container {
  position: absolute; /* 절대 위치 지정 */
  bottom: 40px; /* 하단에서 간격 조정 */
}

.logout {
  color: var(--red-color); /* 로그아웃 아이콘 색상을 빨간색으로 변경 */
}

.logout:hover {
  background-color: var(--red-hover); /* 호버 시 빨간색 배경 */
  color: var(--red-color);
}
</style>
