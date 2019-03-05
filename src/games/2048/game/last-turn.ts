import Tile from '../board/tile';
import Game from '.';
import _ from 'lodash';

/**
 * Saving game last turn to roll back once only
 */
export default class LastTurn {
  /**
   * Saved tiles. Previously flag for deletion tiles are ignored
   */
  public tiles: Tile[];
  /**
   * Saved score
   */
  public score: number;
  /**
   * LastTurn can be used
   */
  public valid: boolean;

  /**
   *
   * @param game to save game
   * @param valid defines if this last turn can be used (default to true)
   */
  constructor(game: Game | undefined) {
    if (game !== undefined) {
      this.tiles = _.cloneDeep(game.tiles).slice(0, game.size * game.size);
      this.score = game.score;
      this.valid = true;
    } else {
      this.tiles = [];
      this.score = -1;
      this.valid = false;
    }
  }
}
