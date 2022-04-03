let randomNumber = function(end){
  return Math.floor(Math.random() * end )
}

let Interval;
let boardArray = []
let currentShape, currentBlocks, checkPlace, trailShape;
let nextType = types[nameOfTypes[randomNumber(6)]]

const canvas = document.querySelector('#canvas');
// get the context
let ctx = canvas.getContext('2d'); 

class Block {
  constructor(color, shape) {
    this.coordinateX;
    this.coordinateY;
    this.color = color;
    this.shape = shape;
  }

  createBlock() {
  let coordinateX_pixels=this.coordinateX*BLOCK_SIZE,
      coordinateY_pixels=this.coordinateY*BLOCK_SIZE;

  // set fill and stroke styles
  ctx.fillStyle = this.color;

  // draw a rectangle with fill and stroke
  ctx.fillRect(coordinateX_pixels, coordinateY_pixels, BLOCK_SIZE, BLOCK_SIZE);
}

  cleanBlock() {
    let coordinateX_pixels=this.coordinateX*BLOCK_SIZE,
        coordinateY_pixels=this.coordinateY*BLOCK_SIZE;
    ctx.fillStyle = this.color;
    ctx.clearRect(coordinateX_pixels, coordinateY_pixels, BLOCK_SIZE, BLOCK_SIZE);
    
  }

  drawShape(trailShapeX, trailShapeY) {
    for (let x = 0; x < this.shape.length; x++) {
      for (let y = 0; y < this.shape[x].length;y++) {
        if(this.shape[x][y] == 1) {
          this.coordinateX = x + trailShapeX
          this.coordinateY = y + trailShapeY
          this.createBlock()
        }
      }
    }
  }

  cleanShape(trailShapeX, trailShapeY) {
    for (let x = 0; x < this.shape.length; x++) {
      for (let y = 0; y < this.shape[x].length;y++) {
        if(this.shape[x][y] == 1) {
          this.coordinateX = x + trailShapeX
          this.coordinateY = y + trailShapeY
          this.cleanBlock()
        }
      }
    }
  }
}

function checking_moving_place(beginX, beginY, endX, endY) {
  console.log(beginX, beginY, endX, endY, boardArray.length)

  if(endX == boardArray[0].length-1 || endY == boardArray.length + 1 ) return false
  for(let y = beginY; y < endY; y++){
      for(let x = beginX; x < endX; x++){

        if( boardArray[ y ][ x ] != 0 ){
          return false; }

      }
  }
  return true
}

function createClearBinaryMatrix(rows, cols) {
  let boardArray = []

  for(let y=0; y<cols;y++){
    boardArray[y]=[]
    for(let x=0; x<rows;x++){
      boardArray[ y ][ x ] = 0;
    }
  }
  
  return boardArray
}

function setShapeToArray(state, boardArray, trail) {
  for (let y = 0; y < state.length; y++) {
    for (let x = 0; x < state.length; x++) {
      if(state[x][y] == 1) boardArray[ y + trail[0] ]
    }
  }
}
