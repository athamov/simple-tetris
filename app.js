// const BLOCK_SIZE = 30;
// const COLS = 10;
// const ROWS = 20;
// const BLOCK_GAP = 1;
let Interval;
let boardArray = []
let currentType, randomTypeBegin, currentBlock

let randomNumber = function(end){
  return Math.floor(Math.random()* end )
}

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

  moveBLock(side) {
    let coordinateX_pixels=this.coordinateX*BLOCK_SIZE,
        coordinateY_pixels=this.coordinateY*BLOCK_SIZE;
    ctx.fillStyle = this.color;
    ctx.clearRect(coordinateX_pixels, coordinateY_pixels, BLOCK_SIZE, BLOCK_SIZE);
    switch(side) {
      case 'right':
        this.coordinateX_pixels+=30;
    }
    this.coordinateY += 30;
    console.log("moveToDownBLock coordinateY:" + this.coordinateY)
    ctx.fillRect(this.coordinateX, this.coordinateY, BLOCK_SIZE,BLOCK_SIZE)
  }

  moveToDownBLock() {

  }

  drawShape() {
    for (let x = 0; x < this.shape.length; x++) {
      for (let y = 0; y < this.shape[x].length;y++) {
        console.log(this.shape[x][y])
        if(this.shape[x][y] == 1) {
          this.coordinateX = x + beginX
          this.coordinateY = y
          this.createBlock()
        }
      }
    }
  }
}

// let current = new Block(0, 0,"red");
// current.createBlock();



function initArray(){
  for(let y=0; y<ROWS;y++){
    boardArray[y]=[]
    for(let x=0; x<COLS;x++){
    boardArray[ y ][ x ] = 0;
  }
  }
  console.table(boardArray)
}

initArray()


function setType(){
  currentType = types[nameOfTypes[randomNumber(6)]]
  randomTypeBegin = randomNumber(currentType.size)
  console.log(currentType)
  for(let y = 0; y < currentType.size; y++){
    for(let x = 0; x < currentType.size; x++){
      boardArray[ y ][ x + beginX ] = currentType.states[randomTypeBegin][ y ][ x ]
    }
  }
  currentBlock = new Block(currentType.color,currentType.states[randomTypeBegin]);
  currentBlock.drawShape()
  console.table(boardArray)
}


//! keyboard function
// function doKeyDown(evt){
//   switch (evt.keyCode) {
//   case 38:  /* Up arrow was pressed */
//   if (y - dy > 0){
//   y -= dy;
//   }
//   break;
//   case 40:  /* Down arrow was pressed */
//   if (y + dy < HEIGHT){
//   y += dy;
//   }
//   break;
//   case 37:  /* Left arrow was pressed */
//   if (x - dx > 0){
//   x -= dx;
//   }
//   break;
//   case 39:  /* Right arrow was pressed */
//   if (x + dx < WIDTH){
//   x += dx;
//   }
//   break;
//   }
//   }
// window.addEventListener('keydown',doKeyDown,true);