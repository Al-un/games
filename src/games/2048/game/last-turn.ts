import Tile from '../board/tile';

/**
 * Saving game last turn to roll back once only
 */
export default class LastTurn {
  /**
   *
   * @param tiles last turn tiles state
   * @param score last turn score
   */
  constructor(public tiles: Tile[], public score: number) {}
}
