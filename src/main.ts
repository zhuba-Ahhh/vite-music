import { createApp } from 'vue';
import App from './App.vue';
import routes from './router';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';

import './assets/css/global.css';
import './styles/reset.less';
import './styles/main.less';
import './assets/fonts/fonts.css';

const pinia = createPinia();
const history = createWebHistory();
const router = createRouter({
  history,
  routes
});
const app = createApp(App);
app
  .use(router)
  .use(pinia)
  .mount(document.querySelector('#app') as Element);
