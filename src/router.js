import { createRouter, createWebHashHistory } from 'vue-router';
import VueSimpleAlert from 'vue3-simple-alert-next';
import HomePage from './components/HomePage.vue';
import ArScene from './components/ArScene.vue';
import RegisterPage from './components/RegisterPage.vue';
import LoginPage from './components/LoginPage.vue';
import CreateExhibitionPage from './components/CreateExhibitionPage.vue';
import EditExhibitionPage from './components/EditExhibitionPage.vue';
import store from './store/store';

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
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
  {
    path: '/createExhibition',
    name: 'exhibitionCreatePage',
    component: CreateExhibitionPage,
    meta: {
      requiredRole: 'artist',
      requiredAuth: true,
    },
  },
  {
    path: '/editExhibition/:id',
    name: 'exhibitionEditPage',
    component: EditExhibitionPage,
    props: true,
    meta: {
      requiredRole: 'artist',
      requiredAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// eslint-disable-next-line consistent-return
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiredAuth && store.state.user == null) {
    VueSimpleAlert.alert('Login is required', 'Error');
    next({ name: 'login' });
  }

  if (to.meta.requiredRole && to.meta.requiredRole !== store.state.user.role) {
    VueSimpleAlert.alert('No permissions', 'Error');
    next({ name: 'login' });
  }

  next();
});

export default router;
