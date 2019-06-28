class Ball {
  /**
   *
   * @param {Player} player
   * @param {Block[]} blocks
   */
  constructor(player, blocks) {
    this.environment = {
      player,
      blocks
    };
    this.width = 20;
    this.height = 20;
    this.radius = 5;
    this.pos = createVector(WIDTH / 2, HEIGHT - 60);
    this.velocity = createVector(5, -5);
  }

  draw() {
    rect(this.pos.x, this.pos.y, this.width, this.height, this.radius);
  }

  update() {
    if (this._checkCollisionsWithWallsAndPlayer()) {
      return;
    }

    for (let i = 0; i < this.environment.blocks.length; i++) {
      const block = this.environment.blocks[i];
      if (this._checkCollisionWithBlock(block)) {
        this.environment.blocks.splice(i, 1);
        return;
      }
    }

    this.pos = p5.Vector.add(this.pos, this.velocity);
  }

  _checkCollisionsWithWallsAndPlayer() {
    const newY = this.pos.y + this.velocity.y;
    const newX = this.pos.x + this.velocity.x;
    const rightWallBorder = WIDTH - this.width;
    const bottomWallBorder = HEIGHT - this.height;
    const playerTopBorder = this.environment.player.pos.y - this.height;
    const playerLeftBorder = this.environment.player.pos.x - this.width;
    const playerRightBorder = this.environment.player.pos.x + this.environment.player.width;

    // check horizontal collisions with wall
    if (newX > rightWallBorder) {
      this.velocity.set(-this.velocity.x, this.velocity.y);
      this.pos.set(rightWallBorder, newY);
      return true;
    }
    if (newX < 0) {
      this.velocity.set(-this.velocity.x, this.velocity.y);
      this.pos.set(0, newY);
      return true;
    }

    // check vertical collisions with wall or player
    if (newY < 0) {
      this.velocity.set(this.velocity.x, -this.velocity.y);
      this.pos.set(newX, 0);
      return true;
    }
    if (newY > playerTopBorder && newX < playerRightBorder && newX > playerLeftBorder) {
      this.velocity.set(this.velocity.x, -this.velocity.y);
      this.pos.set(newX, playerTopBorder);
      return true;
    }
    if (newY > bottomWallBorder) {
      gameOver = true;
      this.pos.set(newX, bottomWallBorder);
      return true;
    }

    return false;
  }

  /**
   * Current implementation just assumes that velocity is lower than block height and width
   * Meaning, that it is not possible to fly throught a block in one cycle
   * @param {Block} block
   */
  _checkCollisionWithBlock(block) {
    const newY = this.pos.y + this.velocity.y;
    const newX = this.pos.x + this.velocity.x;

    const bottomY = this.pos.y + this.height;
    const rightX = this.pos.x + this.width;

    const newBottomY = bottomY + this.velocity.y;
    const newRightX = rightX + this.velocity.x;

    const blockRightX = block.pos.x + block.width;
    const blockBottomY = block.pos.y + block.height;

    // check vertical collision

    const leftBorderXCrossed = rightX <= block.pos.x && newRightX >= block.pos.x;
    const rightBorderXCrossed = this.pos.x >= blockRightX && newX <= blockRightX;

    if (leftBorderXCrossed || rightBorderXCrossed) {
      const prevYRangeMatch = this.pos.y <= blockBottomY && bottomY >= block.pos.y;
      const newYRangeMatch = newY <= blockBottomY && newBottomY >= block.pos.y;

      if (newYRangeMatch || prevYRangeMatch) {
        if (leftBorderXCrossed) {
          this.pos.set(block.pos.x - this.width, newY);
        } else {
          this.pos.set(blockRightX, newY);
        }
        this.velocity.set(-this.velocity.x, this.velocity.y);
        return true;
      }
    }

    // check horizontal collision

    const topBorderYCrossed = bottomY <= block.pos.y && newBottomY >= block.pos.y;
    const bottomBorderYCrossed = this.pos.y >= blockBottomY && newY <= blockBottomY;

    if (topBorderYCrossed || bottomBorderYCrossed) {
      const prevXRangeMatch = this.pos.x <= blockRightX && rightX >= block.pos.x;
      const newXRangeMatch = newX <= blockRightX && newRightX >= block.pos.x;

      if (prevXRangeMatch || newXRangeMatch) {
        if (topBorderYCrossed) {
          this.pos.set(newX, block.pos.y - this.height);
        } else {
          this.pos.set(newX, blockBottomY);
        }

        this.velocity.set(this.velocity.x, -this.velocity.y);
        return true;
      }
    }
  }
}
