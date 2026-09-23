// Square moving around edge of screen
// my way

let speed;
let x, w, y;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  speed = 10;
  x= 100;
  y= 10;
  w=100;
}
 
function draw() {
  background(220);
  drawMovingSquare();
}

function drawMovingSquare(){
  square(x, y, w);

  if ( y === 10 ){
    x += speed;
  }

  if (x>= windowWidth - w ){
    y+= speed;
  }

  if (y >= windowHeight - w ){
    x-= speed; 
  }

  if (x === 0){
    y-= speed;
  }
}
 