import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import ArScene from './components/ArScene.vue';
import LoginPage from './components/LoginPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/ar/:id',
    name: 'ar',
    props: true,
    component: ArScene,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
