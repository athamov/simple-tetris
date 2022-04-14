let randomNumber = function(end){
  return Math.floor(Math.random() * end )
}

let Interval,boardArray,currentShape, currentBlock, checkPlace, trailShape;
let nextType = types[nameOfTypes[randomNumber(6)]]

const currentCanvas = document.querySelector('#canvas');
// get the context
let ctx = currentCanvas.getContext('2d'); 

class CurrentCanvas {
  constructor(Type) {
    this.coordinateX;
    this.coordinateY;
    this.trailShapeX;
    this.trailShapeY;
    console.log(Type)
    this.color = Type.color;
    this.shape = Type.states[randomNumber(Type.size)];
    console.table(this.shape)
  }

  createBlock(coordinateX,coordinateY) {
  let coordinateX_pixels=coordinateX*BLOCK_SIZE,
      coordinateY_pixels=coordinateY*BLOCK_SIZE;

  // set fill and stroke styles
  ctx.fillStyle = this.color;

  // draw a rectangle with fill and stroke
  ctx.fillRect(coordinateX_pixels, coordinateY_pixels, BLOCK_SIZE, BLOCK_SIZE);
}

  cleanBlock(coordinateX,coordinateY) {
    let coordinateX_pixels=coordinateX*BLOCK_SIZE,
        coordinateY_pixels=coordinateY*BLOCK_SIZE;
    ctx.clearRect(coordinateX_pixels, coordinateY_pixels, BLOCK_SIZE, BLOCK_SIZE);
  }

  drawShape(trailShapeX, trailShapeY) {
    this.trailShapeX = trailShapeX;
    this.trailShapeY = trailShapeY;
    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape.length;x++) {
        if(this.shape[y][x] == 1) {
          this.createBlock(x + trailShapeX, y + trailShapeY)
        }
      }
    }
  }

  cleanShape(trailShapeX, trailShapeY) {
    let length = this.shape.length
    for (let y = 0; y < length;y++) {
      for (let x = 0; x < length; x++) {
        if(this.shape[y][x] == 1) {
          this.cleanBlock(x+trailShapeX,y+trailShapeY)
        }
      }
    }
  }

  rotate() {
    this.cleanShape(this.trailShapeX, this.trailShapeY)
    this.shape = rotateCounterClockwise(this.shape)
     this.drawShape(this.trailShapeX , this.trailShapeY )
  }
}






function checking_moving_place(boardArray, shape, trailShape) {
  // if(trailShape.x + shape.length == boardArray[0].length + 1 || trailShape.y + shape.length == boardArray.length) return false
  //if direction is left checkWallX is 0,direction is right checkWallX is boardArray's length
  // checkWallX = boardArray[0].length/2 + trailShape.direction*boardArray[0].length/2-1;
  // console.log(checkWallX)
  console.log(shape,trailShape)
  let lastLineEmpty = 0,length =shape.length

  if(!shape[length-1].includes(1)) lastLineEmpty = 1

  if(trailShape.direction == 0) {
    for(let y = length-1; y >=0; y--) { 
      for(let x = 0; x < length; x++) {
        // console.log(trailShape.y,shape.length,i)
        if(boardArray[ trailShape.y + length - 1 - lastLineEmpty ]===undefined || boardArray[ trailShape.y + y - lastLineEmpty][ trailShape.x + x - 1 ] + shape[length-1][x]==2) {
          return false
        }
      }
    }
  }
  // direction is left, right
  else {
  for(let y=0;y<length;y++) {
      if(boardArray[0][checkWallX]) {}
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