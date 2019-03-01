import actions from './actions';
import getters2048 from './getters';
import mutations from './mutations';
import state from './state';
import { Game2048Module } from './types';

const store2048: Game2048Module = {
  namespaced: true,
  state,
  actions,
  getters: getters2048,
  mutations
};

export default store2048;
