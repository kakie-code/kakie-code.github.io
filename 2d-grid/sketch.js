// 2D Grid-based game assignment
// Hawraa Alibrahim
// Oct 29th
// used this tutorial to better understand grids: 
// 'p5.js Coding Tutorial | 2D Grid w Nested Loop' https://www.youtube.com/watch?v=UKxB2j4h7Ag 
// 'p5.js Coding Tutorial | Color Grid (Nested Loop / 2D Array)' https://www.youtube.com/watch?v=3j_cr44OZTc 
// tutorial to make a game:
// 'p5.js Coding Tutorial | Interactive Grid with Mouse Location'https://www.youtube.com/watch?v=AVMSCFMCz9w 
// Extra for Experts:
// - not sure yet


let spacing = 20;
let size = []; 
let rows;
let cols;
let theColor;
let scale = 0.1;
let object;
let gameStarted = false;
let score = 0;
let highScore;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = width*2/spacing;
  rows = height*2/spacing;
  rectMode(CENTER);
  

  window.setInterval(changeColor, 1000); 
}

function draw() {
  background(0);

  for (let y = 0; y < cols; y++) {
    size[y] = [];
    for (let x = 0; x < rows; x++) {
      size[y][x] = dist(mouseY, mouseX,spacing/2 + y * spacing,spacing/2 + x * spacing) * scale;
    }
  }


  if (gameStarted === false){
    showStartScreen();

  }
  else {
    showGrid();
    checkForObject();

  }

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

function mousePressed() {
  if (gameStarted === false) {
    startGame();
  }
  else {
    // placeholder
  }
} 

// starts game 
function startGame() {
  updateFruitCoordinates();
  gameStarted = true;
  loop();
  score = 0;
}


function changeColor(){
  theColor = color(random(255), random (255), random(255));
}

function showGrid() {
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      noStroke();
      rect(spacing/2 + x * spacing, spacing/2 + y * spacing, size[y][x], size[y][x]);
      fill(theColor);
    }
  }
}


function checkForObject() {
  showObject();
  if ( dist(mouseX, mouseY, cx, cy) < 5) {
    score += 1;
    updateObjectCoordinates();
  }
}

function showObject() {
  if (dist(mouseX, mouseY, cx, cy) < 20){
    object = circle(cx, cy, r);
  }
}

function updateObjectCoordinates() {
  cx = random(30, width - 30);
  cy = random(30, height - 30);
}
