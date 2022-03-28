
//! listeners 
const play = document.querySelector('#play');
const pause = document.querySelector('#pause');

play.addEventListener("click",()=>{
  play.style.visibility="hidden"
  pause.style.visibility="visible"

  if(currentType==undefined) setType()

  // Interval = setInterval(()=>{
    
  //   if(current.coordinateY==19*BLOCK_SIZE) stop()
  // }, 1000);
})

pause.addEventListener("click",()=>{
  pause.style.visibility="hidden"
  play.style.visibility="visible"
})
function stop() {
  console.log("stop")
  clearInterval(Interval);
}