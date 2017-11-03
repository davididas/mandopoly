class RegularPolygon {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this._radius = 0;
    this.sectors = 0;
    this.sectorRadians = 0;
    this.fillStyle = 'rgba(' + [
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255),
      Math.round(Math.random() * 255),
      Math.random()
    ].join(',')  + ')';
  }
  
  draw() {
    this.ctx.save();
    
    this.ctx.translate(this.x,this.y);
    this.ctx.rotate(this.rotation);
    this.ctx.beginPath();
    
    this.drawPolygon();
    
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.fill();
    this.ctx.stroke();
    
    this.ctx.restore();
  }
  
  set radius(val) {
    this._radius = val;
    this.sectors = 3 + Math.floor(this.radius*.03);
    this.sectorRadians = 2 * Math.PI / this.sectors;
  }
  
  get radius() {
    return this._radius;
  }
  
  drawPolygon() {
    this.ctx.moveTo(
      Math.cos(0) * this.radius,
      Math.sin(0) * this.radius
    );

    for(var i=1; i<=this.sectors; i++) {
      ctx.lineTo(
        Math.cos(i * this.sectorRadians) * this.radius,
        Math.sin(i * this.sectorRadians) * this.radius
      );
    }
  }
}


let canvas = document.getElementById('canvas');
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
let ctx = canvas.getContext('2d');
let currentCanvas;
let currentPoly;

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('touchstart', startDraw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("touchend", stopDraw);

function startDraw(e) {
  e.preventDefault();
  
  currentCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height);
  currentPoly = new RegularPolygon(ctx, e.layerX, e.layerY);
  
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('touchmove', draw);
}

function draw(e) {
  e.preventDefault();
  
  ctx.putImageData(currentCanvas, 0, 0);
  
  let a = currentPoly.x - e.layerX;
  let b = currentPoly.y - e.layerY;
  
  currentPoly.radius = Math.sqrt(a*a + b*b);
  currentPoly.rotation = Math.atan2(e.layerY - currentPoly.y, e.layerX - currentPoly.x);
  currentPoly.draw();
  
  // line
  ctx.save();
  ctx.moveTo(currentPoly.x,currentPoly.y);
  ctx.lineTo(
      e.layerX,
      e.layerY
    );
  ctx.stroke();
  ctx.restore();
}

function stopDraw(e) {
  e.preventDefault();
  
  ctx.putImageData(currentCanvas, 0, 0);
  currentPoly.draw();
  
  currentCanvas = null;
  currentPoly = null;
  canvas.removeEventListener('mousemove', draw);
}
