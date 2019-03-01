import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home.vue';
import Game2048 from '@/views/2048.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { layout: 'page' },
      component: Home
    },
    {
      path: '/2048',
      name: '2048',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
      component: Game2048
    }
  ]
});
