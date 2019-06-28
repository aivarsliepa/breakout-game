class Player {
  constructor() {
    this.height = 20;
    this.width = 100;
    this.accelerationRate = 10;
    this.maxSpeed = 10;
    this.pos = createVector(WIDTH / 2 - this.width / 2, HEIGHT - this.height);
    this.direction = createVector(0, 0);
  }

  draw() {
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }

  decelerate() {
    const currentSpeed = this.direction.x;
    let newSpeed = 0;

    if (currentSpeed > 0) {
      newSpeed = Math.max(0, currentSpeed - this.accelerationRate);
    } else if (currentSpeed < 0) {
      newSpeed = Math.min(0, currentSpeed + this.accelerationRate);
    }

    this.direction.set(newSpeed, this.direction.y);
  }

  accelerateLeft() {
    const newSpeed = Math.max(-this.maxSpeed, this.direction.x - this.accelerationRate);
    this.direction.set(newSpeed, this.direction.y);
  }

  accelerateRight() {
    const newSpeed = Math.min(this.maxSpeed, this.direction.x + this.accelerationRate);
    this.direction.set(newSpeed, this.direction.y);
  }

  update() {
    let newPosX = this.pos.x + this.direction.x;
    const rightWallBorder = WIDTH - this.width;

    // check collision with wall
    if (newPosX > rightWallBorder) {
      this.direction.set(0, this.direction.y);
      newPosX = rightWallBorder;
    } else if (newPosX < 0) {
      this.direction.set(0, this.direction.y);
      newPosX = 0;
    }

    this.pos.set(newPosX, this.pos.y);
  }
}
