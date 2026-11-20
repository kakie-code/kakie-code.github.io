// 2D Grid-based game assignment
// Hawraa Alibrahim
// Oct 29th
// used this tutorial to better understand grids: 
// 'p5.js Coding Tutorial | 2D Grid w Nested Loop' https://www.youtube.com/watch?v=UKxB2j4h7Ag 
// 'p5.js Coding Tutorial | Color Grid (Nested Loop / 2D Array)' https://www.youtube.com/watch?v=3j_cr44OZTc 
// tutorial to make a game:
// 'p5.js Coding Tutorial | Interactive Grid with Mouse Location'https://www.youtube.com/watch?v=AVMSCFMCz9w 
// used p5.js refrence map code for how to change the color of a circle based on how close the mouse is
// Extra for Experts:
// - not sure yet
// fix gamestate thing

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
let radius = 20;
let revealRadius = 100;
let gameState = false;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = width*2/spacing;
  rows = height*2/spacing;
  highScore = getItem('high score');
  rectMode(CENTER);
  

  window.setInterval(changeColor, 1000); 
  window.setTimeout(show, 6000);
  
}

function draw() {
  background(0);

  for (let y = 0; y < cols; y++) {
    size[y] = [];
    for (let x = 0; x < rows; x++) {
      size[y][x] = dist(mouseY, mouseX,spacing/2 + y * spacing,spacing/2 + x * spacing) * scale;
    }
  }


  if (gameStarted === false && gameState === false){
    showStartScreen();

  }

  else {
    showGrid();
    showObject();

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
    'Click to play.\nMove mouse and click \nwhen you find the objects',
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
    if ( dist(mouseX, mouseY, cx, cy) < 5) {
      score += 1;
      updateObjectCoordinates();
    }
  }
} 

// starts game 
function startGame() {
  updateObjectCoordinates();
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
  gameState = true;
  noLoop();
  score = 0;
  highScore = 0;
}

function showObject() {
  if (dist(mouseX, mouseY, cx, cy) < revealRadius){
    let c = map(mouseX, 0, 100, 0, 255);
    fill(c);
    object = circle(cx, cy, radius);
  }
}

function updateObjectCoordinates() {
  cx = random(30, width - 30);
  cy = random(30, height - 30);
}
