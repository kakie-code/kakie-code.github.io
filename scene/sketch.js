// Interactive scene
// Harwaa Al Ibrahim
// September 22, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// used https://p5js.org/examples/Games-Snake/
// extra for experts is yet to be done

let gameStarted = false;
let score = 0;
let highScore;
let fruit;
let w = 20;
let r = 10; 
let x, cx, y, cy;
let speed = 3;
let bgcolor = "green";

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(20);
  highScore = getItem('high score');
  x = width/2;
  y = height/2;
  cx = random(0, width);
  cy = random(0, height);
  score = 0;
  
}

function draw() {
  if (score >= 5){
    bgcolor = "lightblue";
    if (score >= 10){
      bgcolor = "lightpink";
    }
  }
  
  background(bgcolor);
  if (gameStarted === false) {
    showStartScreen();
  }
    
  else {
    showFruit();
    showCharacter();
    checkForCollision();
    checkForFruit();
    moveCharacter();
    didYouWin();
    // windowResized();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
} 

function showStartScreen() {
  noStroke();
  fill(32);
  rectMode(CENTER);
  rect(width/2, height/2, 300, 300);
  fill(255);
  text(
    'Click to play.\nUse arrow keys to move.',
    width / 2,
    height / 2
  );
  noLoop();
}


function startGame() {
  updateFruitCoordinates();
  gameStarted = true;
  loop();
}

function showFruit() {
  fruit = circle(cx, cy, r);
}

function showCharacter() {
  character = square(x, y, w);
}

function checkForCollision() {
  if ( x >= width || x <= 0 || y >= height || y <= 0  ) {
    gameOver();
  }
}

function mousePressed() {
  if (gameStarted === false) {
    startGame();
  }
} 

function gameOver() {
  noStroke();
  fill(32);
  rectMode(CENTER);
  rect(width/2, height/2, 300, 300);
  fill(255);
  highScore = max(score, highScore);
  storeItem('high score', highScore);
  text(
    `Game over!
Your score: ${score}
High score: ${highScore}
Click to play again.`,
    width / 2,
    height / 2
  );
  gameStarted = false;
  noLoop();
}

function checkForFruit() {
  if ( dist(x, y, cx, cy) < w) {
    w = w + 5;
    score += 1;
    updateFruitCoordinates();
  }
}

function updateFruitCoordinates() {
  cx = random(30, width - 30);
  cy = random(30, height - 30);
}


function moveCharacter() {
  if (keyIsDown('ArrowUp') === true || keyIsDown('w') === true) {
    y -= speed;
  }
  if (keyIsDown('ArrowDown') === true || keyIsDown('s') === true) {
    y += speed;
  }
  if (keyIsDown('ArrowRight') === true || keyIsDown('d') === true) {
    x += speed;
  }
  if (keyIsDown('ArrowLeft') === true || keyIsDown('a') === true) {
    x -= speed;
  }
}

function didYouWin(){
  if ( w >= width){
    noStroke();
    fill(32);
    rectMode(CENTER);
    rect(width/2, height/2, 300, 300);
    fill(255);
    highScore = max(score, highScore);
    storeItem('high score', highScore);
    text(
      `You Win!
Your score: ${score}
High score: ${highScore}
Click to play again.`,
      width / 2,
      height / 2
    );
    gameStarted = false;
    noLoop();
    score = 0;
    highScore = 0;
    w = 20;
    r = 10;
    bgcolor = "green";
  }
}




