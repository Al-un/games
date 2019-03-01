import {
  MOVE_LEFT,
  MOVE_UP,
  MOVE_DOWN,
  MOVE_RIGHT
} from '@/games/2048/constants';
import Direction, { getDirection } from '@/games/2048/board/direction';

describe('Direction', () => {
  test('properly initialises', () => {
    const direction = new Direction('left', false, true);
    expect(direction.horizontal).toBeFalsy();
    expect(direction.reverse).toBeTruthy();
  });
});

describe('#getDirection', () => {
  test('works', () => {
    expect(getDirection('left')).toEqual(MOVE_LEFT);
    expect(getDirection('right')).toEqual(MOVE_RIGHT);
    expect(getDirection('up')).toEqual(MOVE_UP);
    expect(getDirection('down')).toEqual(MOVE_DOWN);
  });
});
