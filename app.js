let randomNumber = function(end){
  return Math.floor(Math.random() * end )
}

let Interval;
let boardArray = []
let currentShape, currentBlock, checkPlace, trailShape;
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
    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape.length;x++) {
        if(this.shape[y][x] == 1) {
          this.coordinateX = x + trailShapeX
          this.coordinateY = y + trailShapeY
          this.createBlock()
        }
      }
    }
  }

  cleanShape(trailShapeX, trailShapeY) {
    for (let y = 0; y < this.shape.length;y++) {
      for (let x = 0; x < this.shape.length; x++) {
        if(this.shape[y][x] == 1) {
          this.coordinateX = x + trailShapeX
          this.coordinateY = y + trailShapeY
          this.cleanBlock()
        }
      }
    }
  }

  rotate() {
    console.table(this.shape);
    console.log(this.coordinateX - this.shape.length, this.coordinateY - this.shape.length);
    this.cleanShape(this.coordinateX - this.shape.length, this.coordinateY - this.shape.length)
    this.shape = rotateCounterClockwise(this.shape)
    // this.drawShape(this.coordinateX , this.coordinateY )
  }
}





function checking_moving_place(beginX, beginY, endX, endY, boardArray) {
  if(endX == boardArray[0].length + 1 || endY == boardArray.length + 1) return false

  for(let y = beginY; y < endY; y++){
    for(let x = beginX; x < endX; x++){
      if( boardArray[ y ][ x ] != 0 )  return false;
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

function setShapeToBoard(boardArray,shape, trailShape) {
  for(let y=0; y<shape.length; y++) {
    for(let x=0;x<shape.length;x++) {
      if (shape[ y ][ x ] == 1) {
        // console.log( y, x, trailShape.y, trailShape.x)
        // console.table(boardArray);
        // console.table(shape);
        boardArray[ y + trailShape.y-1][ x + trailShape.x-1] = 1
      }
    }
  }
  // console.log(boardArray);
  return boardArray
}

// copied https://stackoverflow.com/questions/15170942/how-to-rotate-a-matrix-in-an-array-in-javascript/48377330#48377330
function rotateCounterClockwise(a){
  let n=a.length;
  for (var i=0; i<n/2; i++) {
      for (var j=i; j<n-i-1; j++) {
          let tmp=a[i][j];
          a[i][j]=a[j][n-i-1];
          a[j][n-i-1]=a[n-i-1][n-j-1];
          a[n-i-1][n-j-1]=a[n-j-1][i];
          a[n-j-1][i]=tmp;
      }
  }
  return a;
}