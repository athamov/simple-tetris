//! listeners 
const playButton = document.querySelector('#play');
const pause = document.querySelector('#pause');
const scoreView = document.querySelector("#Score");
const lineView = document.querySelector("#Lines");

let move = (direction=0) => {
  // direction: down:0 right:1 left:-1 
  currentBlock.direction = direction;

  checkPlace = checking_move_place(boardArray, currentBlock,currentBlock.shape)
  //if shape moves to down it clean shape in cancas and draw in down 
  if(gameIs=='play') {
    if(checkPlace) {
      changeShapeInCanvas(currentBlock);
      if(currentBlock.direction==0) scoreView.innerHTML=++score
    }
    else if(currentBlock.direction==0) {
      boardArray = changeBoard(boardArray, currentBlock)
      currentBlock = new CurrentCanvas(nextType.sendType());  
      nextType = new NextCanvas(types[nameOfTypes[randomNumber(6)]])
      nextType.drawShape()
      if(checkEndGame(boardArray)) endGame() 
    }
  }
}

let changeBoard = (boardArray,currentBlock) => {
  boardArray = setShapeToBoard(boardArray, currentBlock)
  fullLines = check_line(boardArray);

  score += addLineScore(fullLines.length);
  lineScore += fullLines.length
  lineView.innerHTML=lineScore

  while(fullLines.length!=0) {
    currentBlock.cleanLine(fullLines[0]);
    boardArray[fullLines[0]] = createClearArray(ROWS);
    boardArray = move_line_to_top(boardArray, fullLines[0])
    currentBlock.drawFullBoard(boardArray);
    fullLines.shift()
    // console.log(fullLines)
  }

  return boardArray;
}

let playGame = () => {
  if(gameIs!='play') {
    boardArray = createClearBinaryMatrix(COLS,ROWS)
    ctx.clearRect(0,0,COLS*BLOCK_SIZE,ROWS*BLOCK_SIZE)
    nextType = new NextCanvas(types[nameOfTypes[randomNumber(6)]])
    nextType.drawShape()
    currentBlock = new CurrentCanvas(nextType.sendType());
    score=0,lineScore=0,gameIs='play';
    Interval = setInterval(move, 500);
  }
}

let changeShapeInCanvas = (currentBlock) => {
  if(currentBlock.direction==0) {
    currentBlock.cleanShape();
    currentBlock.trailShapeY += 1
  }
  else {
    currentBlock.cleanShape();
    currentBlock.trailShapeX += currentBlock.direction
  }
  currentBlock.drawShape()
}

function stopInterval() {
  if(Interval) {
    console.log("stop")
    clearInterval(Interval);
    Interval = 0
  }
}

let pauseGame =() => {
  // pause.style.visibility="hidden"
  // playButton.style.visibility="visible"
  console.log(gameIs)
  if(gameIs=='play') {
    stopInterval()
    gameIs = 'pause'
  }
  else if(gameIs=='pause') {
    Interval=setInterval(move,500)
    gameIs = 'play'
  }
};

let endGame = () => { 
  // console.log("first")
  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", canvas.width/2, canvas.height/2);
  stopInterval()
  gameIs='end'
}

pause.addEventListener("click",pauseGame)



//! keyboard function
function doKeyDown(evt) {
  switch (evt.keyCode) {
    case 13: 
      playGame();
    break;
    case 38:  /* Up arrow was pressed */
      let changedState = changeState(types,currentBlock.type,currentBlock.indexState)
      checkPlace = checking_move_place(boardArray, currentBlock,changedState);
      if(gameIs=='play'&&checkPlace) {
      currentBlock.cleanShape();
      currentBlock.shape = changedState 
      currentBlock.drawShape()
    }
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
    case 32: /* HARDROP space was pressed */
    while(checkPlace!=false){
      move()
      scoreView.innerHTML=++score;
    }
    break;
    case 80: /* p was pressed */
      pauseGame()
    break;
  }
}

playButton.addEventListener("click",playGame);
window.addEventListener('keydown',doKeyDown,true);
