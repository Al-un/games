import Cell from '@/games/2048/board/cell';

describe('Cell', () => {
  test('properly initialises', () => {
    const cell = new Cell(3, 2);
    expect(cell.x).toBe(3);
    expect(cell.y).toBe(2);
  });
});
