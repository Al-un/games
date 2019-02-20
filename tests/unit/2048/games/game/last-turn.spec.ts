import LastTurn from '@/games/2048/game/last-turn';
import Tile from '@/games/2048/board/tile';

describe('LastTurn', () => {
  test('properly initialises', () => {
    const tile = new Tile(1, 1, 0);
    const lastTurn = new LastTurn([tile], 2);
    expect(lastTurn).toBeTruthy();
  });
});
