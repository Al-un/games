import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

// global scss
// import './assets/scss/main.scss';
// import '@/assets/scss/common/_variables.scss';
// import '@/assets/scss/common/_mixins.scss';

// Layouts
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import LayoutPage from '@/layouts/LayoutPage.vue';

// Global import layouts 
// https://itnext.io/anyway-heres-how-to-create-a-multiple-layout-system-with-vue-and-vue-router-b379baa91a05
Vue.component('default-layout', LayoutDefault);
Vue.component('page-layout', LayoutPage);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
