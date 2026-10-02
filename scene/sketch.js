// Interactive scene
// Harwaa Al Ibrahim
// September 22, 2026
//
// - also i worked on p5.js first so i copied it off of there
// Extra for Experts:
// - i used "storeItem" so i could use it for the highscore 
// - i added a "getItem" so i could get the previous score from the "storeItem"
// - i used "rectMode(CENTER)" to make the rectangle draw from the center and not the corner
// - used "dist" to find out the distance between two points 
// - i also used "text" to explane to the player what to do
// - i also used  "resizeCanvas" to change the canvas size to adjust to the screen
// - i used "noloop" and "loop" to stop and start the draw loop when needed
// used https://p5js.org/examples/Games-Snake/

// defining the things 
let gameStarted = false;
let score = 0;
let highScore;
let fruit;
let w = 20;
let r = 10; 
let x, cx, y, cy;
let speed = 3;
let bgcolor = "green";

// setup where things only happen once 
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

// draw loop where all other functions are called
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
  }
}

// Defining functions 

// resizes window 
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
} 

// shows start screen 
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

// starts game 
function startGame() {
  updateFruitCoordinates();
  gameStarted = true;
  loop();
  score = 0;
  w = 20;
  r = 10;
  x = width/2;
  y = height/2;
  bgcolor = "green";
}


// shows fruit
function showFruit() {
  fruit = circle(cx, cy, r);
}


// shows character 
function showCharacter() {
  character = square(x, y, w);
}

// checks to see if you hit a edge
function checkForCollision() {
  if ( x >= width || x <= 0 || y >= height || y <= 0  ) {
    gameOver();
  }
}

// checks if mouse was clicked
function mousePressed() {
  if (gameStarted === false) {
    startGame();
  }
} 


// shows that you lost the game
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

// checks to see if you "ate" a fruit
function checkForFruit() {
  if ( dist(x, y, cx, cy) < w) {
    w = w + 5;
    score += 1;
    updateFruitCoordinates();
  }
}

// randomly changes fruits place when eaten 
function updateFruitCoordinates() {
  cx = random(30, width - 30);
  cy = random(30, height - 30);
}

// so you can move the character 
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

// asks if you won and if so then shows your score and ends the game 
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




