const WIDTH = 800;
const HEIGHT = 600;

/**
 * @type Game
 */
let game;
let gameOver = false;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  game = new Game();
}

function draw() {
  background(240);
  game.update();
  game.draw();

  if (gameOver) {
    textSize(40);
    textAlign(CENTER);
    text("Game Over", WIDTH / 2, HEIGHT / 2);
    noLoop();
  }
}
