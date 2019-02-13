/**
 * Readline helper
 */
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const { Board } = require('./model');

class Game {
  constructor() {
    this.board = new Board();
    this.board.seed();
  }

  play() {
    this.board.print();
    rl.question('Play (q,z,s,d & "w" to exit)!', answer => {
      // console.log(`input is ${answer}`);
      if (answer !== 'w') {
        if (answer === 'q') {
          this.board.moveLeft();
        } else if (answer === 'z') {
          this.board.moveUp();
        } else if (answer === 's') {
          this.board.moveDown();
        } else if (answer === 'd') {
          this.board.moveRight();
        }

        this.play();
      } else {
        rl.close();
        console.log('Ending game!');
      }
    });
  }
}

const game = new Game();
game.play();
