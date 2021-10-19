const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function drawShapes() {
  let square = {
    x: parseInt(document.getElementById("sqX").value, 10) || 125,
    y: parseInt(document.getElementById("sqY").value, 10) || 125,
    w: parseInt(document.getElementById("sqW").value, 10) || 50,
    h: parseInt(document.getElementById("sqH").value, 10) || 50
  }

  let circle = {
    x: parseInt(document.getElementById("ciX").value, 10) || 425,
    y: parseInt(document.getElementById("ciY").value, 10) || 425,
    r: parseInt(document.getElementById("ciR").value, 10) || 100
  }

  let xFrameValues = () => {
    let x1 = 0;
    let x2 = 0;
    if (square.x > x1) x1 = square.x;
    if (circle.x - circle.r < x1) x1 = circle.x - circle.r;
    if (square.x + square.w > x2) x2 = square.x + square.w;
    if (circle.x + circle.r > x2) x2 = circle.x + circle.r;
    return { x1: x1, x2: x2 };
  }

  let yFrameValues = () => {
    let y1 = 0;
    let y2 = 0;
    if (square.y > y1) y1 = square.y;
    if (circle.y - circle.r < y1) y1 = circle.y - circle.r;
    if (square.y + square.h > y2) y2 = square.y + square.h;
    if (circle.y + circle.r > y2) y2 = circle.y + circle.r;
    return { y1: y1, y2: y2 };
  }

  let frame = {
    x: xFrameValues().x1,
    y: yFrameValues().y1,
    w: xFrameValues().x2 - xFrameValues().x1,
    h: yFrameValues().y2 - yFrameValues().y1
  }

  if (xFrameValues().x1 < 0 || xFrameValues().x2 > 500 || yFrameValues().y1 < 0 || yFrameValues().y2 > 500) {
    document.getElementById("alerting").innerHTML = "INVALID";
    document.getElementById("canvas").style = "border: 1px solid; border-color: red";
  } else {
    document.getElementById("alerting").innerHTML = "VALID";
    document.getElementById("canvas").style = "border: 1px solid; border-color: green";
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.log(`SQUARE - x: ${square.x} | y: ${square.y} | w: ${square.w} | h: ${square.h}`)
  console.log(`CIRCLE - x: ${circle.x} | y: ${circle.y} | r: ${circle.r}`)
  console.log(`FRAME - x: ${frame.x} | y: ${frame.y} | w: ${frame.w} | h: ${frame.h}`)
  ctx.fillStyle = 'blue';
  ctx.fillRect(square.x, square.y, square.w, square.h);
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.ellipse(circle.x, circle.y, circle.r, circle.r, 0, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  ctx.strokeRect(frame.x, frame.y, frame.w, frame.h);
}

document.onload = drawShapes();
