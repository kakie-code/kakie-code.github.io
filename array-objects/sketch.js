// Oct. 7th
// Hawraa Al Ibrahim
// 


let x, y;
let hit = false;
let terrain = [];
let NUMBER_OF_RECTS;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  NUMBER_OF_RECTS = width;
  generateTerrain();
  
  if (!hit){
    x = 10;
    y += 1;
  }
  if (hit){
    x = yh;
  }
  


  
}

function draw() {
  background("skyblue");

  stroke("green");
  fill("green");
  moveCharacter();
  for (let theRect of terrain){
    rect(theRect.x, theRect.y, theRect.w, theRect.h);

    // rect(x,  y, 100, 100);
  }


  //circle thing
  let theX = mouseX;
  let theY = height - terrain[theX].h;
  // console.log(terrain[theX]);
  fill("white");
  circle(theX, theY, 30);

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

function spawnRectangle(leftSide, rectWidth, rectHeight) {
  let theRect = {
    x: leftSide,
    y: height - rectHeight,
    w: rectWidth,
    h: rectHeight,
  };

  return theRect;
}