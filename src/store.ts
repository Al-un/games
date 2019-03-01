import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import module2048 from './store/2048/';
import { RootState, RootStoreOptions } from './store/types';

Vue.use(Vuex);

const storeOptions: RootStoreOptions = {
  // https://vuex.vuejs.org/guide/strict.html#development-vs-production
  strict: process.env.NODE_ENV !== 'production',

  state: {
    debug: false
  },
  modules: {
    '2048': module2048
  }
};

const store: Store<RootState> = new Vuex.Store(storeOptions);

export default store;
