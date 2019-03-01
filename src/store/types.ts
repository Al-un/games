import { Store, StoreOptions, ModuleTree } from 'vuex';
import { Game2048Module } from './2048/types';

export interface RootState {
  debug: boolean;
}

export interface RootStore extends Store<RootState> {}

export interface RootModuleTree extends ModuleTree<RootState> {
  '2048': Game2048Module;
}

export interface RootStoreOptions extends StoreOptions<RootState> {
  state: RootState;
  modules: RootModuleTree;
}
