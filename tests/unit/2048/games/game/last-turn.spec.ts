import LastTurn from '@/games/2048/game/last-turn';
import Tile from '@/games/2048/board/tile';
import Turn from '@/games/2048/play/turn';
import Game from '@/games/2048/game';
import { mock1 } from './game.mock';
import { MOVE_LEFT } from '@/games/2048/constants';

describe('LastTurn', () => {
  let lastTurn: LastTurn;
  let game: Game;

  describe('via Turn', () => {
    beforeEach(() => {
      game = mock1();
      const turn = new Turn(game, MOVE_LEFT);
      lastTurn = turn.lastTurn;
    });

    test('save game active tiles only', () => {
      const size = game.size;
      // to ensure there is something to test
      expect(game.tiles.length).toBeGreaterThan(size * size);
      // active tiles only
      expect(lastTurn.tiles.length).toBe(size * size);
      // comparison
      expect(lastTurn.tiles).toEqual(game.tiles.slice(0, size * size));
    });

    test('save game score', () => {
      expect(lastTurn.score).toBe(game.score);
    });

    test('is valid', () => {
      expect(lastTurn.valid).toBeTruthy();
    });
  });
});
