import Vuex, { Store } from 'vuex';
import module2048 from '@/store/2048/';
import { RootStore } from '@/store/types';

export const mockStore2048 = (): RootStore => {
  return new Vuex.Store({
    // https://vuex.vuejs.org/guide/strict.html#development-vs-production
    strict: process.env.NODE_ENV !== 'production',

    state: {
      debug: false
    },
    modules: {
      '2048': module2048
    }
  });
};
