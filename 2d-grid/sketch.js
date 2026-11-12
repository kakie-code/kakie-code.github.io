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

//if randomizing the grid
const SQUARE_DIMENSIONS = 10;
let grid;
let cellSize;
let rows;
let cols;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width < height) {
    cellSize = width / SQUARE_DIMENSIONS;
  }
  else {
    cellSize = height / SQUARE_DIMENSIONS;
  }
}

function draw() {
  background(220);
  showGrid();
  
}

function showGrid() {
  for (let y = 0; y < SQUARE_DIMENSIONS; y++) {
    for (let x = 0; x < SQUARE_DIMENSIONS; x++) {
      circle(x * cellSize + cellSize/2, y * cellSize + cellSize/2, cellSize);
      let randomColor = random(0, 255);
      fill(randomColor);
      
    }
  }
}

function mousePressed(){
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);
  toggleCell(x, y);
}

function toggleCell(x, y) {
  //make sure you're in the grid
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === 0) {
      fill("white");
    }
    else if (grid[y][x] === 1) {
      fill("black");
    }
  }
}
