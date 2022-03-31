//! listeners 
const play = document.querySelector('#play');
const pause = document.querySelector('#pause');

play.addEventListener("click",()=>{
  play.style.visibility="hidden"
  pause.style.visibility="visible"

  boardArray = createClearMatrix(COLS,ROWS)

  trailShape = [beginX,0]
  currentType = nextType
  nextType = types[nameOfTypes[randomNumber(6)]]
  currentBlock = new Block(currentType.color,currentType.states[randomNumber(currentType.size)]);


  Interval = setInterval(()=>{
    checkPlace = checking_moving_place(trailShape[0] , trailShape[1], trailShape[0] + currentType.size, trailShape[1] + currentType.size)
    console.log("Checking" + checkPlace)

    if(checkPlace) {
      currentBlock.cleanShape(trailShape[0] , trailShape[1]-1)
      currentBlock.drawShape(trailShape[0], trailShape[1])
    }
    else {

    }


    trailShape[1] += 1
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
