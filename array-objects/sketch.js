// Oct. 7th
// Hawraa Al Ibrahim
// 
// extra for experts:
//  - i used "storeItem" so i could use it for the highscore 
// - i added a "getItem" so i could get the previous score from the "storeItem" 
// - i used "ceil" to round a number up to the nearest integer
// - i used "filter", it iterates over each element of an array



// defining variables
let terrain = [];
let NUMBER_OF_RECTS;
let gameState = "start"; // "start", "playing",  or "over"
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
let highScore = 0;
let velocityY = 0;
let gravity = 0.6;
let jumpPower = 15;
let onGround = true;
let startTime = 0;
let gameLength = 30000;
let button = {w: 180, h: 50};

async function setup() {
  createCanvas(windowWidth, windowHeight);
  button.x = width/2 - button.w / 2;
  button.y = height/2 + 60;
  NUMBER_OF_RECTS = width;
  generateTerrain();
  highScore = getItem('high score') || 0;
  theX= r;
  theY = groundY();
}

function draw() {
  background("skyblue");
  stroke("green");
  fill("green");
  for (let theRect of terrain){
    rect(theRect.x, theRect.y, theRect.w, theRect.h);
  }
  makeCharacter();

  if (gameState === "start"){
    showStartScreen();
  }
  else if (gameState === "playing"){  
    moveCharacter();
    checkForCollision();
    doWeJump();
    dropFruitIfNeeded();
    updateFruit();
    checkForFruit();
    showScore();
    howLong();
  }
  else if (gameState === "over"){
    showGameOverScreen();
  }
  
}

// shows start screen 
function showStartScreen() {
  push();

  noStroke();
  fill(32);
  rectMode(CENTER);
  rect(width/2, height/2, 300, 300, 20);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  text(
    'Click to play.\nUse arrow keys to move.',
    width/2,
    height/2
  );


  pop();
}

// shows game over screen
function showGameOverScreen() {
  push();
  noStroke();

  // dark box
  fill(32);
  rectMode(CENTER);
  rect(width/2, height/2, 320, 320, 20);

  //text
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(36);
  text('Game over!', width/2, height/2-100);
  textSize(22);
  text(`Your score: ${score}`, width/2, height/2-40);
  text(`High score: ${highScore}`, width/2, height/2);

  // when mouse over button its lighter
  rectMode(CORNER);
  if (mouseOnButton()){
    fill("limegreen");
  }
  else {
    fill("green");
  }
  rect(button.x, button.y, button.w, button.h, 10);
  fill(255);
  text("Play again", width/2, button.y + button.h/2);

  pop();
}

// checks if mouse is over button
function mouseOnButton(){
  return mouseX > button.x && mouseX < button.x + button.w && mouseY > button.y && mouseY < button.y + button.h;
}

// makes character
function makeCharacter(){
  fill("white");
  circle(theX, theY, r*2);
}

// checks if mouse is pressed
function mousePressed(){
  if (gameState === "start") {
    startGame();
  }
  else if (gameState === "over" && mouseOnButton()){
    startGame();
  }
}

// starts the game
function startGame(){
  gameState = "playing";
  score = 0;
  fruits = [];
  velociyY = 0;
  theX = r;
  theY = groundY();
  startTime = millis();
  lastDropTime = millis();
  
}

// function for making fruit fall
function fallingFruit() {
  let fruit = {
    x: random(fruitR, width - fruitR),
    y: 0,
  };
  fruits.push(fruit);
}

// function for updating the fruit
function updateFruit(){
  fill("red");
  for (let fruit of fruits){
    fruit.y += fruitSpeed;
    circle(fruit.x, fruit.y, fruitR*2);
  }
}

// function to make fruit drop every 2000 millis
function dropFruitIfNeeded(){
  if (millis() > lastDropTime + waitTime){
    lastDropTime = millis();
    fallingFruit();
  }
}

//checks if on the ground
function groundY(){
  return height - terrain[theX].h-r;
}

// checks if fruit is there or not
function checkForFruit() {
  for (let fruit of fruits){
    if (dist(theX, theY, fruit.x, fruit.y) < r + fruitR){
      score++;
      fruit.caught = true;
    }
  }
  fruits = fruits.filter(fruit => fruit.caught !== true && fruit.y < height + fruitR);
}

// shows your score
function showScore() {
  push();
  noStroke();
  fill(0);
  textSize(24);
  let timeLeft = ceil((gameLength- (millis()-startTime)) / 1000);
  text(
    `Score: ${score} 
Time: ${timeLeft}`,
    20,
    40
  );
  pop();
}

//generates your terrain
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

// checks if the circle character collides with the wall or not
function checkForCollision() {
  if ( theX < r ) {
    theX = r;
  }
  if ( theX > width - r - 1){
    theX = width - r - 1;
  }
}

// checks if the circle character jumps or not
function doWeJump(){
  velocityY += gravity;
  theY += velocityY;

  if (theY >= groundY()){
    theY = groundY();
    velocityY= 0;
    onGround= true;
  }
}

// how the character moves
function moveCharacter() {
  if (keyIsDown('ArrowUp') === true || keyIsDown('w') === true) {
    if (onGround){
      velocityY -= jumpPower;
      onGround = false;
    }
  }
  if (keyIsDown('ArrowRight') === true || keyIsDown('d') === true) {
    theX += speed;

  }
  if (keyIsDown('ArrowLeft') === true || keyIsDown('a') === true) {
    theX -= speed;
    
  }
}

// checks how long it has been since game started
function howLong(){
  if (millis() - startTime >= gameLength){
    highScore = max(score, highScore);
    storeItem('high score', highScore);
    gameState = "over";
  }
}
 
// also for terrain
function spawnRectangle(leftSide, rectWidth, rectHeight) {
  let theRect = {
    x: leftSide,
    y: height - rectHeight,
    w: rectWidth,
    h: rectHeight,
  };

  return theRect;
}
