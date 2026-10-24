// Oct. 7th
// Hawraa Al Ibrahim
// 


let hit = false;
let terrain = [];
let NUMBER_OF_RECTS;
let gameStarted = false;
let theX = 25;
let theY;
let speed = 5;
let waitTime = 2000;
let lastDropTime = 0;
let r = 45; 
let fruits = [];
let fruitR = 7.5;
let fruitSpeed = 3;
let score = 0; 
let highscore;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  NUMBER_OF_RECTS = width;
  generateTerrain();
  theY = height - terrain[theX].h - 15;
  highScore = getItem('high score');
}

function draw() {
  background("skyblue");
  stroke("green");
  fill("green");
  console.log(millis());
  for (let theRect of terrain){
    rect(theRect.x, theRect.y, theRect.w, theRect.h);
  }
  makeCharacter();
  if (gameStarted === false){
    showStartScreen();
  }
  else {  
    moveCharacter();
    checkForCollision();
    dropFruitIfNeeded();
    updateFruit();
    // checkForFruit();
    howLong();
  }
  
}

// shows start screen 
function showStartScreen() {
  push();

  noStroke();
  fill(32);
  rectMode(CENTER);
  rect(width/2, height/2, 300, 300);
  fill(255);
  text(
    'Click to play.\nUse arrow keys to move.',
    width/2,
    height/2
  );

  noLoop();

  pop();
}

function makeCharacter(){
  fill("white");
  circle(theX, theY, 30);
}

function mousePressed(){
  if (gameStarted === false) {
    startGame();
  }
}

function startGame(){
  gameStarted = true;
  loop();
}

function fallingFruit() {
  let fruit = {
    x: random(fruitR, width - fruitR),
    y: 0,
  };
  fruits.push(fruit);
}

function updateFruit(){
  fill("red");
  for (let fruit of fruits){
    fruit.y += fruitSpeed;
    circle(fruit.x, fruit.y, fruitR*2);
  }
}

function dropFruitIfNeeded(){
  if (millis() > lastDropTime + waitTime){
    lastDropTime = millis();
    fallingFruit();
  }
}

// function checkForFruit() {
//   if (dist(theX, theY, fruits.x, fruits.y) < 0){
//     score++;
//   }
// }


function generateTerrain() {
  let theWidth = width/NUMBER_OF_RECTS;
  let time = 0;
  let deltaTime = 0.001;
  for (let i = 0; i < NUMBER_OF_RECTS; i++) {
    let theHeight = noise(time) * height;
    let someRect = spawnRectangle(theWidth * i, theWidth, theHeight);
    terrain.push(someRect);
    time += deltaTime;
  }
}

function checkForCollision() {
  if ( theX < r ) {
    theX = r;
  }
  if ( theX > width - r - 1){
    theX = width - r - 1;
  }
}

function moveCharacter() {
   if (keyIsDown('ArrowUp') === true || keyIsDown('w') === true) {
     theY = height - terrain[theX].h - 15;
   }
  if (keyIsDown('ArrowRight') === true || keyIsDown('d') === true) {
    
    theY = height - terrain[theX].h - 15;
    theX += speed;

  }
  if (keyIsDown('ArrowLeft') === true || keyIsDown('a') === true) {
    
    theY = height - terrain[theX].h - 15;
    theX -= speed;
    
  }
}

function gameOver() {
  push();

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

  pop();
}

 function howLong(){
   if (millis() === 30000){
    gameOver();
   }
 }
 
function spawnRectangle(leftSide, rectWidth, rectHeight) {
  let theRect = {
    x: leftSide,
    y: height - rectHeight,
    w: rectWidth,
    h: rectHeight,
  };

  return theRect;
}