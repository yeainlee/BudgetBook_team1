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

app.use(router);
app.mount('#app');
