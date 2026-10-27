// Grid demo
// learn 2d arrays
// check his code something is wrong here

// let grid = [[1, 0, 1, 0],
//             [0, 1, 1, 0],
//             [1, 0, 0, 1]
//             [0, 1, 0, 1]];
// let cellSize;
// const SQUARE_DIMENSIONS = grid.length;

const SQUARE_DIMENSIONS = 10;
let grid;
let cellSize;
async function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width < height){
    cellSize = width / SQUARE_DIMENSIONS;
  }
  else{
    cellSize = height / SQUARE_DIMENSIONS;
  }
  grid = randomizeGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
}

function draw() {
  background(220);
  showGrid();
}

function showGrid(){
  for(let y = 0; y < SQUARE_DIMENSIONS; y++){
    for(let x = 0; x < SQUARE_DIMENSIONS; x++){
      if (grid[x][y] === 1){
        fill("black");
      }
      else if (grid[x][y] === 0){
        fill("white");
      }
      square(x*cellSize, y*cellSize, cellSize);
    }
  }
}

function randomizeGrid(cols, rows){
  let newGrid = [];
  for ( let y=0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x , cols; x++){
      if (random(100) < 50){
        newGrid[y].push(1);
      }
      else {
        newGrid[y].push(0);

      }
    }
  }
  return newGrid;
}
