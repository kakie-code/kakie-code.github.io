// Oct. 7th
// Hawraa Al Ibrahim
// 


let hit = false;
let terrain = [];
let NUMBER_OF_RECTS;
let gameStarted = false;
let theX = 25;
let theY;
let jump = false;
let speed = 5;
let waitTime = 1000;
let r = 30;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  NUMBER_OF_RECTS = width;
  generateTerrain();
  theY = height - terrain[theX].h - 15;
}

function draw() {
  background("skyblue");
  stroke("green");
  fill("green");

  for (let theRect of terrain){
    rect(theRect.x, theRect.y, theRect.w, theRect.h);
  }
  makeCharacter();
  if (gameStarted === false){
    showStartScreen();
  }
  else {  
    moveCharacter();
    doWeJump();
    checkForCollision();
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
  //circle thing
  // theX = 25;
  // theY = height - terrain[theX].h - 15;
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

function doWeJump(){
  if (jump === true){
    while (theY <= terrain.h + 20){
      theY++;
    }
    if (theY > terrain.h + 20){
      while (theY){
        theY--;
      }
    }
  }
  

}

function checkForCollision() {
  if ( theX <= 0 + r ) {
    theX++;
  }
  if ( theX >= width - r){
    theX--;
  }
}

function moveCharacter() {
  if (keyIsDown('ArrowUp') === true || keyIsDown('w') === true) {
    jump = true;
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

function spawnRectangle(leftSide, rectWidth, rectHeight) {
  let theRect = {
    x: leftSide,
    y: height - rectHeight,
    w: rectWidth,
    h: rectHeight,
  };

  return theRect;
}