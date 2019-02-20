import Movement from '@/games/2048/play/movement';

describe('Movement', () => {
  test('properly initialises without seed', () => {
    const move = new Movement('left', 1);
    expect(move).toBeTruthy();
    expect(move.timestamp).toBeDefined();
    expect(move.seed).toBeUndefined();
  });
});
