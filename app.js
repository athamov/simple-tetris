let randomNumber = function(end){
  return Math.floor(Math.random() * end )
}

let Interval,boardArray, currentBlock, checkPlace,countLine,nextType;

const currentCanvas = document.querySelector('#canvas');
// get the context
let ctx = currentCanvas.getContext('2d'); 

class CurrentCanvas {
  constructor(Type) {
    this.coordinateX;
    this.coordinateY;
    this.trailShapeX=beginX;
    this.trailShapeY=0;
    this.direction=0;
    console.log(Type)
    this.color = Type.color;
    this.shape = Type.states[randomNumber(Type.states.length)];
  }

  createBlock(coordinateX,coordinateY,color=this.color) {
  let coordinateX_pixels=coordinateX*BLOCK_SIZE,
      coordinateY_pixels=coordinateY*BLOCK_SIZE;

  // set fill and stroke styles
  ctx.fillStyle = color;

  // draw a rectangle with fill and stroke
  ctx.fillRect(coordinateX_pixels, coordinateY_pixels, BLOCK_SIZE, BLOCK_SIZE);
}

  cleanBlock(coordinateX,coordinateY) {
    let coordinateX_pixels=coordinateX*BLOCK_SIZE,
        coordinateY_pixels=coordinateY*BLOCK_SIZE;
    ctx.clearRect(coordinateX_pixels, coordinateY_pixels, BLOCK_SIZE, BLOCK_SIZE);
  }

  drawShape() {
    let shape = this.shape,length = shape.length,trailShapeY = this.trailShapeY,trailShapeX = this.trailShapeX;
    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape.length;x++) {
        if(this.shape[y][x] != 0) {
          this.createBlock(x + trailShapeX, y + trailShapeY)
        }
      }
    }
  }

  cleanShape(trailShapeX, trailShapeY) {
    let length = this.shape.length
    for (let y = 0; y < length;y++) {
      for (let x = 0; x < length; x++) {
        if(this.shape[y][x] != 0) {
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

function checking_move_place(boardArray, currentBlock) {
  let shape = currentBlock.shape,
      direction = currentBlock.direction,
      trailShapeY = currentBlock.trailShapeY,
      trailShapeX = currentBlock.trailShapeX,
      length =shape.length;

  for(let y=0; y<length; y++) {
    for(let x=0;x<length;x++) {
      if (shape[ y ][ x ] != 0) {
        if(direction == 0) {
          if(boardArray[ y + trailShapeY+1]==undefined ||
            boardArray[ y + trailShapeY+1][ x + trailShapeX]!=0) {
              console.table(boardArray)
             return false;}
        }
        else {
          if(boardArray[ y + trailShapeY-1][ x + trailShapeX + direction]==undefined ||
             boardArray[ y + trailShapeY][ x + trailShapeX + direction]!=0)
              return false
        }
      }
    }
  }

  return true
}

function createClearBinaryMatrix(rows, cols) {
  let boardArray = []
  for(let y=0; y<cols;y++){
    boardArray[y]=[]
    boardArray[ y ] = createClearArray(rows)
  }
  return boardArray
}

function createClearArray(rows) {
  let array = []
  for(let x=0; x<rows;x++){
    array[ x ] = 0;
  }

  return array
}

function setShapeToBoard(boardArray,currentBlock) {
  let shape = currentBlock.shape,
      length = shape.length,
      trailShapeY = currentBlock.trailShapeY,
      trailShapeX = currentBlock.trailShapeX;
  for(let y=0; y<length; y++) {
    for(let x=0;x<length;x++) {
      if (shape[ y ][ x ] != 0) {
        boardArray[ y + trailShapeY][ x + trailShapeX] = shape[ y ][ x ];
      }
    }
  }
  return boardArray
}

function check_and_clean_line(array) {
  let length = array.length,
      countLine=0;
  for(let y = length-1; y <= 0;y++) {
    if(array[y].includes(0)) {
      countLine = countLine + 1
      array[y] = createClearArray(ROWS)
      array= move_line_to_top(array,y)
    }
  }
  return array
}

// copied https://www.codegrepper.com/code-examples/javascript/how+to+move+an+element+of+an+array+in+javascript
function move_line_to_top(array,fromIndex) {
  var element = array[fromIndex];
  array.splice(fromIndex, 1);
  array.splice(0, 0, element);
  return array;
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