import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// import './assets/main.css'

import 'vant/lib/index.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

// 设计稿中body的fontSize
const rootValue = 16;
// 设计稿的屏幕宽度
const rootWidth = 390;
// 获取用户设备的屏幕宽度
const deviceWidth = document.documentElement.clientWidth;
// 真实body的fontSize = 真实屏幕宽度 * 设计稿body的字体 / 设计稿屏幕宽度
document.documentElement.style.fontSize = (deviceWidth * rootValue) / rootWidth + 'px';

app.mount('#app');
