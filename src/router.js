import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/visitants',
      name: 'visitors',
      component: () => import('./views/visitors/Visitors.vue'),
    },
  ],
});
