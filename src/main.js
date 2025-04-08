import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import axios from 'axios';
import './assets/main.css';

axios.defaults.baseURL = 'http://localhost:3000';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia); // 먼저 pinia를 앱에 등록

// 이제 pinia가 활성화된 후에 스토어를 사용
import { useUserStore } from './store/index';
const userStore = useUserStore();
userStore.initializeStore();

app.use(router);
app.mount('#app');
