class Game {
  constructor() {
    this.player = new Player();
    this.ball = new Ball(this.player);
  }

  draw() {
    this.player.draw();
    this.ball.draw();
  }

  update() {
    this._checkInput();
    this.player.move();
    this.ball.move();
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
