let randomNumber = function(end){
  return Math.floor(Math.random() * end )
}

let Interval,boardArray, currentBlock, checkPlace,fullLines,nextType,score,lineScore,gameIs;

const currentCanvas = document.querySelector('#canvas');
// get the context
let ctx = currentCanvas.getContext('2d'); 

class CurrentCanvas {
  constructor(Type) {
    this.trailShapeX=beginX;
    this.trailShapeY=0;
    this.direction=0;
    this.color = Type.color;
    this.indexState=Type.states.length-1
    this.shape = Type.states[this.indexState];
    this.type = Type.type;
  }

  drawBlock(coordinateX,coordinateY,color=this.color) {
  let coordinateX_pixels=coordinateX*BLOCK_SIZE,
      coordinateY_pixels=coordinateY*BLOCK_SIZE;
  // set fill and stroke styles
  ctx.fillStyle = color;
  // draw a rectangle with fill and stroke
  ctx.fillRect(coordinateX_pixels, coordinateY_pixels, BLOCK_SIZE, BLOCK_SIZE);
}

  drawShape() {
    let shape = this.shape,length = shape.length,trailShapeY = this.trailShapeY,trailShapeX = this.trailShapeX;
    for (let y = 0; y < length; y++) {
      for (let x = 0; x < length;x++) {
        if(this.shape[y][x] != 0) {
          this.drawBlock(x + trailShapeX, y + trailShapeY)
        }
      }
    }
  }

  drawFullBoard(boardArray) {
    for(let y =0; y< ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if(boardArray[ y ][ x ] != 0) {
          this.drawBlock(x,y,types[nameOfTypes[boardArray[ y ][ x ]-1]].color)
        }
        else {
          this.cleanBlock(x,y)
        }
      }
    }
  }

  cleanBlock(coordinateX,coordinateY) {
    let coordinateX_pixels=coordinateX*BLOCK_SIZE,
        coordinateY_pixels=coordinateY*BLOCK_SIZE;
    ctx.clearRect(coordinateX_pixels, coordinateY_pixels, BLOCK_SIZE, BLOCK_SIZE);
  }
  cleanShape() {
    let trailShapeX = this.trailShapeX,
        trailShapeY = this.trailShapeY
        length = this.shape.length
    for (let y = 0; y < length;y++) {
      for (let x = 0; x < length; x++) {
        if(this.shape[y][x] != 0) {
          this.cleanBlock(x+trailShapeX,y+trailShapeY)
        }
      }
    }
  }

  cleanLine(y) {
    for(let x = 0; x < COLS; x++) {
      this.cleanBlock(x,y)
    }
  }

  rotate() {
    this.cleanShape()
    this.shape = rotateCounterClockwise(this.shape)
    this.drawShape()
  }
}

function addLineScore(num) {
  if(num==4) return 200
  else if(num == 3) return 90
  else if(num == 2) return 40
  else if(num == 1) return 10
  else return 0
}

function checking_move_place(boardArray, currentBlock,shape) {
  let direction = currentBlock.direction,
      trailShapeY = currentBlock.trailShapeY,
      trailShapeX = currentBlock.trailShapeX,
      length = shape.length;

  for(let y=0; y<length; y++) {
    for(let x=0;x<length;x++) {
      if (shape[ y ][ x ] != 0) {
        if(direction == 0) {
          if(boardArray[ y + trailShapeY+1]==undefined ||
            boardArray[ y + trailShapeY+1][ x + trailShapeX]!=0) {
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

function checkEndGame(array) {
  for(let i = 0; i < array[0].length; i++) {
      if(array[2][i]>=1) {
        console.log(array[3])
        return true
      }
  }
  return false
}

function changeState(types,type,indexState) {
  console.log(indexState)
  console.log(indexState!=types[type].states.length-1)
  if(indexState!=types[type].states.length-1) {
    console.log(indexState)
    indexState++;
  }
  else {
    indexState=0
  } 
  console.log(indexState)
  currentBlock.indexState=indexState
  return types[type].states[indexState]
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

function check_line(array) {
  let length = array.length,
      countLine=[]
  for(let y = length-1; y >= 0;y--) {
    // console.log(array[y])
    if(!array[y].includes(0)) {
      countLine.push(y)
    }
  }

  return countLine
}

// copied https://www.codegrepper.com/code-examples/javascript/how+to+move+an+element+of+an+array+in+javascript
function move_line_to_top(array,fromIndex) {
  var element = array[fromIndex];
  array.splice(fromIndex, 1);
  array.splice(0, 0, element);
  return array;
}

// copied https://stackoverflow.com/questions/15170942/how-to-rotate-a-matrix-in-an-array-in-javascript/48377330#48377330
function rotateCounterClockwise(state){
  let len=state.length;
  for (var i=0; i<len/2; i++) {
      for (var j=i; j<len-i-1; j++) {
          let tmp=state[i][j];
          state[i][j]=state[j][len-i-1];
          state[j][len-i-1]=state[len-i-1][len-j-1];
          state[len-i-1][len-j-1]=state[len-j-1][i];
          state[len-j-1][i]=tmp;
      }
  }
  return state;
}