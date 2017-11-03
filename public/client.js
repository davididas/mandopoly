

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
let width = 400;
let height = 400;
let nShapes = 10;
let maxSides = 10;
let maxRadius = 200;
let ctx = canvas.getContext('2d');


ctx.beginPath();

for(var i = 0; i < nShapes; i++) {
  let radius = Math.random() * maxRadius;
  let circumf = radius * 2;
  // let sides = 3 + Math.floor(Math.random() * (maxSides-3)); // random # sides
  let sides = 3 + Math.floor(radius*.1); // # sides based on radius
  let center = {
    x: 200, y: 200
    // x:radius + Math.random()*(width-circumf), 
    // y:radius + Math.random()*(height-circumf)
  };
  regularPolygon(ctx, center, radius, sides);
}

ctx.stroke();