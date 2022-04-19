const canvasNext = document.querySelector('#nextShape');
// get the context
let ctxNext = canvasNext.getContext('2d');

class NextCanvas {
  constructor(Type) {
    this.type = Type
    this.color = Type.color;
    this.shape = Type.states[randomNumber(Type.size)];
  }
  
  sendType() {
    return this.type
  }

  createBlock(coordinateX,coordinateY) {
    let coordinateX_pixels=coordinateX*BLOCK_SIZE,
        coordinateY_pixels=coordinateY*BLOCK_SIZE;
  
    // set fill and stroke styles
    ctxNext.fillStyle = this.color;
  
    // draw a rectangle with fill and stroke
    ctxNext.fillRect(coordinateX_pixels, coordinateY_pixels, BLOCK_SIZE, BLOCK_SIZE);
  }

  drawShape() {
    let shape = this.shape;

    ctxNext.clearRect(0, 0, 4*BLOCK_SIZE, 4*BLOCK_SIZE);
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape.length;x++) {
        if(shape[y][x] != 0) {
          this.createBlock(x, y)
        }
      }
    }
  }
}