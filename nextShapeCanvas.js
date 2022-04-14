const canvasNext = document.querySelector('#canvas');
// get the context
let ctxNext = currentCanvas.getContext('2d');

class NextCanvas {
  constructor(Type) {
    this.type = Type
    this.color = Type.color;
    this.shape = Type.states[randomNumber(Type.size)];
  }
  
  sendType() {
    return this.type
  }
}