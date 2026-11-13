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

  showGrid();
}

function changeColor(){
  theColor = color(random(255), random (255), random(255));
}

function showGrid() {
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      // noStroke();
      rect(spacing/2 + x * spacing, spacing/2 + y * spacing, size[y][x], size[y][x]);
      fill(theColor);
    }
  }
}



