import Vuex, { Store } from 'vuex';
import module2048 from '@/store/2048/';
import { RootStore } from '@/store/types';
import { Game2048Module } from '@/store/2048/types';
import Game2048Mutations from '@/store/2048/mutations';
import Game from '@/games/2048/game';
import { GAME_STATUS } from '@/games/2048/constants';
import { mock1 } from '../games/game/game.mock';

export const mockGlobalStore = (): RootStore => {
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

export const mock2048Module = (): Game2048Module => {
  return {
    namespaced: true,
    state: {
      game: mock1(),
      status: GAME_STATUS.SELECT,
      size: 4
    },
    getters: {
      isCancelable: jest.fn()
    },
    mutations: Game2048Mutations,
    actions: {
      decreaseSize: jest.fn(),
      increaseSize: jest.fn(),
      newGame: jest.fn(),
      move: jest.fn(),
      moveLeft: jest.fn(),
      moveRight: jest.fn(),
      moveUp: jest.fn(),
      moveDown: jest.fn(),
      exitGame: jest.fn(),
      cancelMove: jest.fn()
    }
  };
};
