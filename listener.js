//! listeners 
const playButton = document.querySelector('#play');
const pause = document.querySelector('#pause');



let playGame = () => {
  playButton.style.visibility="hidden"
  pause.style.visibility="visible"

  boardArray = createClearBinaryMatrix(COLS,ROWS)

  // direction: down:0 right:1 left:-1 
  trailShape = { x: beginX, y: 0,direction:0} 
  currentShape = nextType
  nextType = types[nameOfTypes[randomNumber(6)]]
  currentBlock = new Block(currentShape.color,currentShape.states[randomNumber(currentShape.size)]);


  Interval = setInterval(()=>{
    trailShape.direction = 0
    checkPlace = checking_moving_place(boardArray, currentBlock.shape, trailShape)
    // console.log("Checking" + checkPlace)

    if(checkPlace) {
      currentBlock.cleanShape(trailShape.x , trailShape.y-1)
      currentBlock.drawShape(trailShape.x, trailShape.y) 

    }
    else {
      console.log(trailShape);
      boardArray = setShapeToBoard(boardArray, currentBlock.shape,trailShape)
      trailShape = {x:beginX,y:0,direction:0}
      currentShape = nextType
      nextType = types[nameOfTypes[randomNumber(6)]]
      currentBlock = new Block(currentShape.color,currentShape.states[randomNumber(currentShape.size)]);    
    }

    trailShape.y += 1

    // if(current.coordinateY==19*BLOCK_SIZE) stop()
  }, 500);
}

pause.addEventListener("click",()=>{
  pause.style.visibility="hidden"
  playButton.style.visibility="visible"

})
function stop() {
  console.log("stop")
  clearInterval(Interval);
}



playButton.addEventListener("click",playGame)

//! keyboard function
function doKeyDown(evt){
  switch (evt.keyCode) {
  case 13: 
    playGame();
  break;
  case 38:  /* Up arrow was pressed */
    currentBlock.rotate();
  break;
  case 40:  /* Down arrow was pressed */
  if (y + dy < HEIGHT){
  y += dy;
  }
  break;
  case 37:  /* Left arrow was pressed */
  trailShape.direction=-1;
  checking_moving_place(boardArray, currentBlock.shape, trailShape)
  break;
  case 39:  /* Right arrow was pressed */
  if (x + dx < WIDTH){
  x += dx;
  }
  break;
  }
  }
window.addEventListener('keydown',doKeyDown,true);
