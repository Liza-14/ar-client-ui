import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import ArScene from './components/ArScene.vue';
import LoginPage from './components/LoginPage.vue';
import CreateExhibitionPage from './components/CreateExhibitionPage.vue';
import EditExhibitionPage from './components/EditExhibitionPage.vue';

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
  {
    path: '/createExhibition',
    name: 'exhibitionCreatePage',
    component: CreateExhibitionPage,
  },
  {
    path: '/editExhibition/:id',
    name: 'exhibitionEditPage',
    component: EditExhibitionPage,
    props: true,
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
