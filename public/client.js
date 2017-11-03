

function regularPolygon(ctx, center, radius, sides) {
  let radians = 2 * Math.PI / sides;

  ctx.moveTo(
    center.x + Math.cos(0) * radius,
    center.y + Math.sin(0) * radius
  );

  for(var i=1; i<=sides; i++) {
    ctx.lineTo(
      center.x + Math.cos(i * radians) * radius,
      center.y + Math.sin(i * radians) * radius
    );
  }     
}



let canvas = document.getElementById('canvas');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
let ctx = canvas.getContext('2d');
let currentCenter = {x:0, y:0};
let currentColor;
let lastCanvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('touchstart', startDraw, {passive: false});
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("touchend", stopDraw, {passive: false});


function startDraw(e) {
  e.preventDefault();
  currentCenter = {
    x: e.layerX, y: e.layerY
  };
  currentColor = [
    Math.round(Math.random() * 255),
    Math.round(Math.random() * 255),
    Math.round(Math.random() * 255),
    Math.random()
  ].join(',');
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('touchmove', draw);
}

function draw(e) {
  e.preventDefault();
  
  let a = currentCenter.x - e.layerX;
  let b = currentCenter.y - e.layerY;

  let radius = Math.sqrt( a*a + b*b );
  let sides = 3 + Math.floor(radius*.08); // # sides based on radius
  
  ctx.putImageData(lastCanvasData, 0, 0);
  ctx.beginPath();
  regularPolygon(ctx, currentCenter, radius, sides);

  
  
  ctx.fillStyle = 'rgba(' + currentColor + ')';
  ctx.fill();
  ctx.stroke();
}

function stopDraw(e) {
  e.preventDefault();
  lastCanvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  canvas.removeEventListener('mousemove', draw);
}


