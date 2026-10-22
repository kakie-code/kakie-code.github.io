
// - used opengameart.org

let coinImg;
let coinSound;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  coinImg = await loadImage("Coin.png");
  coinSound = await loadSound("Coin.wav");
}

function draw() {
  background(220);

  image(coinImg, width/2, height/2);
}

function mousePressed() {
  coinSound.play();
}
