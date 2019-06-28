class Block {
  constructor(x, y) {
    this.width = 40;
    this.height = 40;
    this.radius = 5;
    this.pos = createVector(x, y);
  }

  draw() {
    rect(this.pos.x, this.pos.y, this.width, this.height, this.radius);
  }
}
