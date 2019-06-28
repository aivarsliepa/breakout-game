const WIDTH = 800;
const HEIGHT = 600;

/**
 * @type Game
 */
let game;
let gameOver = false;

function setup() {
  createCanvas(WIDTH, HEIGHT).parent("sketch-container");
  setupGame();
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

function setupGame() {
  game = new Game();
  gameOver = false;
  loop();
}
