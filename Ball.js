class Ball {
  /**
   *
   * @param {Player} player
   */
  constructor(player) {
    this.environment = {
      player
    };
    this.width = 20;
    this.height = 20;
    this.radius = 5;
    this.pos = createVector(WIDTH / 2, HEIGHT / 2);
    this.direction = createVector(5, -5);
  }

  draw() {
    rect(this.pos.x, this.pos.y, this.width, this.height, this.radius);
  }

  move() {
    let newY = this.pos.y + this.direction.y;
    let newX = this.pos.x + this.direction.x;
    const rightWallBorder = WIDTH - this.width;
    const bottomWallBorder = HEIGHT - this.height;
    const playerTopBorder = this.environment.player.pos.y - this.height;
    const playerLeftBorder = this.environment.player.pos.x - this.width;
    const playerRightBorder = this.environment.player.pos.x + this.environment.player.width;

    // check horizontal collisions with wall
    if (newX > rightWallBorder) {
      this.direction.set(-this.direction.x, this.direction.y);
      newX = rightWallBorder;
    } else if (newX < 0) {
      this.direction.set(-this.direction.x, this.direction.y);
      newX = 0;
    }

    // check vertical collisions with wall or player
    if (newY < 0) {
      this.direction.set(this.direction.x, -this.direction.y);
      newY = 0;
    } else if (newY > playerTopBorder && newX < playerRightBorder && newX > playerLeftBorder) {
      this.direction.set(this.direction.x, -this.direction.y);
      newY = playerTopBorder;
    } else if (newY > bottomWallBorder) {
      gameOver = true;
      return;
    }

    this.pos.set(newX, newY);
  }
}
