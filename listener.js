//! listeners 
const playButton = document.querySelector('#play');
const pause = document.querySelector('#pause');

let move = (direction=0) => {
  // direction: down:0 right:1 left:-1 
  currentBlock.direction = direction;

  checkPlace = checking_move_place(boardArray, currentBlock)
  //if shape moves to down it clean shape in cancas and draw in down 
  if(checkPlace) changeShapeInCanvas(currentBlock);

  else if(currentBlock.direction==0) {
    boardArray = changeBoard(boardArray, currentBlock)
    currentBlock = new CurrentCanvas(nextType.sendType());    
    nextType = new NextCanvas(types[nameOfTypes[randomNumber(6)]])
    nextType.drawShape()
    
  }
}

let changeBoard = (boardArray,currentBlock) => {
  boardArray = setShapeToBoard(boardArray, currentBlock)
  fullLines = check_line(boardArray);
  while(fullLines.length!=0) {
    currentBlock.cleanLine(fullLines[0]);
    boardArray[fullLines[0]] = createClearArray(ROWS);
    boardArray = move_line_to_top(boardArray, fullLines[0])
    currentBlock.drawFullBoard(boardArray);
    fullLines.shift()
  }
  return boardArray;
}

let playGame = () => {
  if(!Interval) {
    boardArray = createClearBinaryMatrix(COLS,ROWS)
    ctx.clearRect(0,0,COLS*BLOCK_SIZE,ROWS*BLOCK_SIZE)
    nextType = new NextCanvas(types[nameOfTypes[randomNumber(6)]])
    nextType.drawShape()
    currentBlock = new CurrentCanvas(nextType.sendType());
    Interval = setInterval(move, 500);
  }
}

let changeShapeInCanvas = (currentBlock) => {
  if(currentBlock.direction==0) {
    currentBlock.trailShapeY += 1
    currentBlock.cleanShape(currentBlock.trailShapeX, currentBlock.trailShapeY-1);
  }
  else {
    currentBlock.trailShapeX += currentBlock.direction
    currentBlock.cleanShape(currentBlock.trailShapeX-currentBlock.direction, currentBlock.trailShapeY);
  }
  currentBlock.drawShape()
}

pause.addEventListener("click",()=>{
  // pause.style.visibility="hidden"
  // playButton.style.visibility="visible"
  stopInterval()
})

function stopInterval() {
  if(Interval) {
    console.log("stop")
    clearInterval(Interval);
    Interval = 0
  }
}

//! keyboard function
function doKeyDown(evt) {
  switch (evt.keyCode) {
    case 13: 
      playGame();
    break;
    case 38:  /* Up arrow was pressed */
      currentBlock.rotate();
    break;
    case 40:  /* Down arrow was pressed */
      move()
    break;
    case 37:  /* Left arrow was pressed */
      move(-1)
    break;
    case 39:  /* Right arrow was pressed */
      move(1)
    break;
    case 32: /* space was pressed */
    while(checkPlace!=false){
      move()
    }
    break;
    case 80: /* p was pressed */
      stopInterval()
    break;
  }
}

playButton.addEventListener("click",playGame);
window.addEventListener('keydown',doKeyDown,true);
