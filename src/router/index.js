import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import TransactionPage from '../views/TransactionPage.vue';
import TransactionEditPage from '../views/TransactionEditPage.vue';
import MyPage from '../views/MyPage.vue';
import LoginPage from '../views/LoginPage.vue';
import JoinPage from '../views/JoinPage.vue';
import { useUserStore } from '@/store/userStore';
import { useToastStore } from '@/store/toastStore';

const routes = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/main',
    name: 'MainPage',
    component: MainPage,
    meta: { requiresAuth: true },
    // 로그인 했을 때 접근 가능함 -> true
  },
  {
    path: '/transaction',
    name: 'TransactionPage',
    component: TransactionPage,
    meta: { requiresAuth: true },
  },

  {
    path: '/transaction/edit',
    name: 'TransactionEditNew',
    component: TransactionEditPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/transaction/edit/:id',
    name: 'TransactionEditPage',
    component: () => import('@/views/TransactionEditPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/my',
    name: 'MyPage',
    component: MyPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/join',
    name: 'JoinPage',
    component: JoinPage,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//로그인 관련해서 리다이렉트 하는 함수입니다. 모두의 테스트를 위해 주석처리 해놓겠습니다.

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isLoggedIn = userStore.isLoggedIn;

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'LoginPage' }); // 로그인 페이지로 리다이렉트
  }
  // 이미 로그인된 상태에서 로그인/회원가입 페이지로 가려는 경우
  else if (
    !to.meta.requiresAuth &&
    isLoggedIn &&
    (to.name === 'LoginPage' || to.name === 'JoinPage')
  ) {
    next({ name: 'MainPage' }); // 메인 페이지로 리다이렉트
  } else {
    next(); // 정상적으로 라우팅 계속 진행
  }
});

export default router;
