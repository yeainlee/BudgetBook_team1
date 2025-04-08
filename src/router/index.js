import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import TransactionPage from '../views/TransactionPage.vue';
import TransactionEditPage from '../views/TransactionEditPage.vue';
import MyPage from '../views/MyPage.vue';
import LoginPage from '../views/LoginPage.vue';
import JoinPage from '../views/JoinPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/main',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/transactions',
    name: 'TransactionPage',
    component: TransactionPage,
  },
  {
    path: '/transactions/edit',
    name: 'TransactionEditPage',
    component: TransactionEditPage,
  },
  {
    path: '/my',
    name: 'MyPage',
    component: MyPage,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/join',
    name: 'JoinPage',
    component: JoinPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
