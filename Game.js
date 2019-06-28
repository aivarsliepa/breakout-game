class Game {
  constructor() {
    this.player = new Player();
    /**
     * @type {Block[]}
     */
    this.blocks = [];

    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 12; i++) {
        this.blocks.push(new Block(100 + i * 50, 100 + j * 50));
      }
    }

    this.ball = new Ball(this.player, this.blocks);
  }

  draw() {
    this.player.draw();
    this.ball.draw();
    this.blocks.forEach(block => block.draw());
  }

  update() {
    this._checkInput();
    this.player.update();
    this.ball.update();

    if (this.blocks.length === 0) {
      gameOver = true;
    }
  }

  _checkInput() {
    const leftDown = keyIsDown(LEFT_ARROW);
    const rightDown = keyIsDown(RIGHT_ARROW);

    if (leftDown && rightDown) {
      this.player.decelerate();
      return;
    }

    if (leftDown) {
      this.player.accelerateLeft();
      return;
    }

    if (rightDown) {
      this.player.accelerateRight();
      return;
    }

    this.player.decelerate();
  }
}
