//! listeners 
const play = document.querySelector('#play');
const pause = document.querySelector('#pause');

play.addEventListener("click",()=>{
  play.style.visibility="hidden"
  pause.style.visibility="visible"

  boardArray = createClearBinaryMatrix(COLS,ROWS)

  trailShape = {x:beginX,y:0}
  currentShape = nextType
  nextType = types[nameOfTypes[randomNumber(6)]]
  currentBlock = new Block(currentShape.color,currentShape.states[randomNumber(currentShape.size)]);


  Interval = setInterval(()=>{
    // gets beginX, beginY, endX, endY
    checkPlace = checking_moving_place(trailShape.x , trailShape.y, trailShape.x + currentShape.size, trailShape.y + currentShape.size)
    console.log("Checking" + checkPlace)

    if( checkPlace ) {
      currentBlock.cleanShape(trailShape.x , trailShape.y-1)
      currentBlock.drawShape(trailShape.x, trailShape.y)
      trailShape.y += 1
    }
    else {
      boardArray = setShapeToArray(currentShype.states, boardArray, trailShape)
      trailShape.x=beginX,trailShape.y=0
      currentShape = nextType
      nextType = types[nameOfTypes[randomNumber(6)]]
      currentBlock = new Block(currentShape.color,currentShape.states[randomNumber(currentShape.size)]);
    }


    // if(current.coordinateY==19*BLOCK_SIZE) stop()
  }, 1000);
})

pause.addEventListener("click",()=>{
  pause.style.visibility="hidden"
  play.style.visibility="visible"

})
function stop() {
  console.log("stop")
  clearInterval(Interval);
}




//! keyboard function
function doKeyDown(evt){
  switch (evt.keyCode) {
  case 38:  /* Up arrow was pressed */
  if (y - dy > 0){
  y -= dy;
  }
  break;
  case 40:  /* Down arrow was pressed */
  if (y + dy < HEIGHT){
  y += dy;
  }
  break;
  case 37:  /* Left arrow was pressed */
  if (x - dx > 0){
  x -= dx;
  }
  break;
  case 39:  /* Right arrow was pressed */
  if (x + dx < WIDTH){
  x += dx;
  }
  break;
  }
  }
window.addEventListener('keydown',doKeyDown,true);
