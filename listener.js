
//! listeners 
const playButton = document.querySelector('#play');
const pause = document.querySelector('#pause');

let move = (direction=0) => {
  trailShape.direction = direction;


  checkPlace = checking_moving_place(boardArray, currentBlock.shape, trailShape)
  // console.log("Checking direction" + trailShape.direction +checkPlace)




  if(checkPlace) {
    if(trailShape.direction === 0) {
      trailShape.y += 1
      currentBlock.cleanShape(trailShape.x, trailShape.y-1);
    }
      else {
        trailShape.x += trailShape.direction
        currentBlock.cleanShape(trailShape.x-trailShape.direction, trailShape.y);
      }
      currentBlock.drawShape(trailShape.x, trailShape.y) 
  }
  else {
    // console.log(trailShape);
    boardArray = setShapeToBoard(boardArray, currentBlock.shape,trailShape)
    trailShape = {x:beginX,y:0,direction:0}
    nextType = new NextCanvas(types[nameOfTypes[randomNumber(6)]])
    currentBlock = new CurrentCanvas(nextType.type);    
  }

}

let playGame = () => {
  boardArray = createClearBinaryMatrix(COLS,ROWS)

  // direction: down:0 right:1 left:-1 
  trailShape = { x: beginX, y: 0,direction:0} 
  nextType = new NextCanvas(types[nameOfTypes[randomNumber(6)]])
  currentBlock = new CurrentCanvas(nextType.sendType());
  Interval = setInterval(move(), 500);
}

pause.addEventListener("click",()=>{
  pause.style.visibility="hidden"
  playButton.style.visibility="visible"

})
function stopInterval() {
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
  move(0)
  break;
  case 37:  /* Left arrow was pressed */
  move(-1) // x will move to the left
  break;
  case 39:  /* Right arrow was pressed */
  move(1) // x will move to the left
  break;
  }
  }
window.addEventListener('keydown',doKeyDown,true);
