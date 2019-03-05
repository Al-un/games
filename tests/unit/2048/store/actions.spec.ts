import actions from '@/store/2048/actions';
import { Game2048ActionContext } from '@/store/2048/types';
import { initialState } from '@/store/2048/state';
import { GAME_STATUS } from '@/games/2048/constants';
import { mock1, mock2 } from '../games/game/game.mock';
import { getConsoleLogSpy } from '../../utils';
import mutations from '@/store/2048/mutations';

let actionContext: Game2048ActionContext;
let commit: jest.Mock;
let dispatch: jest.Mock;
const consoleLogSpy: jest.SpyInstance = getConsoleLogSpy();

describe('2048 actions', () => {
  beforeEach(() => {
    // cannot mock all mutations commits
    commit = jest.fn().mockImplementation((...args: any) => {
      const mutation = args[0];
      switch (mutation) {
        case 'updateGame':
          return mutations.updateGame(actionContext.state, args[1]);
        case 'seed':
          return mutations.seed(actionContext.state, args[1]);
        default:
          return jest.fn();
      }
    });
    // All dispatch are mocked
    dispatch = jest.fn();

    actionContext = {
      state: initialState(),
      dispatch,
      commit,
      getters: jest.fn(),
      rootGetters: jest.fn(),
      rootState: { debug: false }
    };

    consoleLogSpy.mockClear();
  });

  describe('increaseSize', () => {
    describe('when size is 4', () => {
      beforeEach(() => {
        actionContext.state.size = 4;
        actions.increaseSize(actionContext);
      });

      test('commits "updateBoardSize" to 5', () => {
        expect(commit).toHaveBeenCalledWith('updateBoardSize', 5);
      });
    });

    describe('when size is 8', () => {
      beforeEach(() => {
        actionContext.state.size = 8;
        actions.increaseSize(actionContext);
      });

      test('commits "updateBoardSize" to 3', () => {
        expect(commit).toHaveBeenCalledWith('updateBoardSize', 3);
      });
    });

    describe('when rootState.debug is false', () => {
      beforeEach(() => {
        actionContext.rootState.debug = false;
        actions.increaseSize(actionContext);
      });

      test('does not print anything in console.log', () => {
        expect(consoleLogSpy).not.toHaveBeenCalled();
      });
    });

    describe('when rootState.debug is true', () => {
      beforeEach(() => {
        actionContext.rootState.debug = true;
        actions.increaseSize(actionContext);
      });

      test('prints once in console.log', () => {
        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('decreaseSize', () => {
    describe('when size is 5', () => {
      beforeEach(() => {
        actionContext.state.size = 5;
        actions.decreaseSize(actionContext);
      });

      test('commits "updateBoardSize" to 4', () => {
        expect(commit).toHaveBeenCalledWith('updateBoardSize', 4);
      });
    });

    describe('when size is 3', () => {
      beforeEach(() => {
        actionContext.state.size = 3;
        actions.decreaseSize(actionContext);
      });

      test('commits "updateBoardSize" to 8', () => {
        expect(commit).toHaveBeenCalledWith('updateBoardSize', 8);
      });
    });

    describe('when rootState.debug is false', () => {
      beforeEach(() => {
        actionContext.rootState.debug = false;
        actions.decreaseSize(actionContext);
      });

      test('does not print anything in console.log', () => {
        expect(consoleLogSpy).not.toHaveBeenCalled();
      });
    });

    describe('when rootState.debug is true', () => {
      beforeEach(() => {
        actionContext.rootState.debug = true;
        actions.decreaseSize(actionContext);
      });

      test('prints once in console.log', () => {
        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('newGame', () => {
    describe('when status is "select"', () => {
      beforeEach(() => {
        actionContext.state.status = GAME_STATUS.SELECT;
        actions.newGame(actionContext);
      });

      test('commit "initialiseGame" with two seeds', () => {
        expect(commit).toHaveBeenCalled();
        const lastCallArguments = commit.mock.calls.pop();
        expect(lastCallArguments[0]).toBe('initialiseGame');
        expect(lastCallArguments[1].length).toBe(2);
      });
    });

    describe('when rootState.debug is false', () => {
      beforeEach(() => {
        actionContext.state.status = GAME_STATUS.SELECT;
        actionContext.rootState.debug = false;
        actions.newGame(actionContext);
      });

      test('does not print anything in console.log', () => {
        expect(consoleLogSpy).not.toHaveBeenCalled();
      });
    });

    describe('when rootState.debug is true', () => {
      beforeEach(() => {
        actionContext.state.status = GAME_STATUS.SELECT;
        actionContext.rootState.debug = true;
        actions.newGame(actionContext);
      });

      test('prints three times in console.log', () => {
        expect(consoleLogSpy).toHaveBeenCalledTimes(3);
      });
    });

    describe('when status is "playing"', () => {
      test('does nothing', () => {
        actionContext.state.status = GAME_STATUS.PLAYING;
        actions.newGame(actionContext);

        expect(commit).not.toHaveBeenCalled();
        expect(dispatch).not.toHaveBeenCalled();
      });
    });
  });

  describe('moveLeft', () => {
    describe('when status is "select"', () => {
      test('dispatch "decreaseSize"', () => {
        actionContext.state.status = GAME_STATUS.SELECT;
        actions.moveLeft(actionContext);

        expect(dispatch).toHaveBeenCalledWith('decreaseSize');
      });
    });

    describe('when status is "playing"', () => {
      test('dispatch "move" with "left"', () => {
        actionContext.state.status = GAME_STATUS.PLAYING;
        actions.moveLeft(actionContext);

        expect(dispatch).toHaveBeenCalledWith('move', 'left');
      });
    });
  });

  describe('moveRight', () => {
    describe('when status is "select"', () => {
      test('dispatch "increaseSize"', () => {
        actionContext.state.status = GAME_STATUS.SELECT;
        actions.moveRight(actionContext);

        expect(dispatch).toHaveBeenCalledWith('increaseSize');
      });
    });

    describe('when status is "playing"', () => {
      test('dispatch "move" with "right"', () => {
        actionContext.state.status = GAME_STATUS.PLAYING;
        actions.moveRight(actionContext);

        expect(dispatch).toHaveBeenCalledWith('move', 'right');
      });
    });
  });

  describe('moveUp', () => {
    describe('when status is "select"', () => {
      test('does nothing', () => {
        actionContext.state.status = GAME_STATUS.SELECT;
        actions.moveUp(actionContext);

        expect(commit).not.toHaveBeenCalled();
        expect(dispatch).not.toHaveBeenCalled();
      });
    });

    describe('when status is "playing"', () => {
      test('dispatch "move" with "up"', () => {
        actionContext.state.status = GAME_STATUS.PLAYING;
        actions.moveUp(actionContext);

        expect(dispatch).toHaveBeenCalledWith('move', 'up');
      });
    });
  });

  describe('moveDown', () => {
    describe('when status is "select"', () => {
      test('does nothing', () => {
        actionContext.state.status = GAME_STATUS.SELECT;
        actions.moveDown(actionContext);

        expect(commit).not.toHaveBeenCalled();
        expect(dispatch).not.toHaveBeenCalled();
      });
    });

    describe('when status is "playing"', () => {
      test('dispatch "move" with "down"', () => {
        actionContext.state.status = GAME_STATUS.PLAYING;
        actions.moveDown(actionContext);

        expect(dispatch).toHaveBeenCalledWith('move', 'down');
      });
    });
  });

  describe('move', () => {
    describe('when no tiles is moved', () => {
      beforeEach(() => {
        actionContext.state.game = mock2();
        actions.move(actionContext, 'left');
      });

      test('has no commits', () => {
        expect(commit).not.toHaveBeenCalled();
      });
    });

    describe('when some tiles are moved', () => {
      beforeEach(() => {
        actionContext.state.game = mock1();
        actions.move(actionContext, 'left');
      });

      test('has one commit', () => {
        expect(commit).toHaveBeenCalledTimes(1);
      });

      test('commits "updateGame" with a Turn', () => {
        const commit1 = commit.mock.calls[0];
        expect(commit1[0]).toBe('updateGame');
        expect(commit1[1].constructor.name).toBe('Turn');
      });
    });

    describe('when rootState.debug = false', () => {
      beforeEach(() => {
        actionContext.state.game = mock1();
        actions.move(actionContext, 'left');
      });

      test('prints nothing in console', () => {
        expect(consoleLogSpy).not.toHaveBeenCalled();
      });
    });

    describe('when rootState.debug = true', () => {
      beforeEach(() => {
        actionContext.rootState.debug = true;
      });

      describe('when no tile is moved', () => {
        beforeEach(() => {
          actionContext.state.game = mock2();
          actions.move(actionContext, 'left');
        });

        test('prints console once', () => {
          expect(consoleLogSpy).toHaveBeenCalledTimes(1);
        });
      });

      describe('when some tiles are moved', () => {
        beforeEach(() => {
          actionContext.state.game = mock1();
          actions.move(actionContext, 'left');
        });

        test('prints console four times', () => {
          expect(consoleLogSpy).toHaveBeenCalledTimes(4);
        });
      });
    });
  });

  describe('cancelMove', () => {
    test('commits "cancelMove"', () => {
      actions.cancelMove(actionContext);
      expect(commit).toHaveBeenCalledWith('cancelMove');
    });

    describe('when rootState.debug is false', () => {
      test('does not print anything in console.log', () => {
        actions.cancelMove(actionContext);
        expect(consoleLogSpy).not.toHaveBeenCalled();
      });
    });

    describe('when rootState.debug is true', () => {
      test('prints once in console.log', () => {
        actionContext.rootState.debug = true;
        actions.cancelMove(actionContext);
        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('exitGame', () => {
    test('commits "changeGameStatus" to GAME_STATUS.SELECT', () => {
      actions.exitGame(actionContext);
      expect(commit).toHaveBeenCalledWith(
        'changeGameStatus',
        GAME_STATUS.SELECT
      );
    });
  });
});
