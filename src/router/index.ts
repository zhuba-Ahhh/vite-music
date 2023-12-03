import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../Views/index/Index.vue')
    // import(/* webpackChunkName: "home" */ "../views/HomeView.vue"),
  }
];

export default routes;
