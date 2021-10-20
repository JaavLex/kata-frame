const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function getFrame(rectangle, circle) {
  let xFrameValues = () => {
    let x1 = 0;
    let x2 = 0;
    if (rectangle.x > x1) x1 = rectangle.x;
    if (circle.x - circle.r < x1) x1 = circle.x - circle.r;
    if (rectangle.x + rectangle.w > x2) x2 = rectangle.x + rectangle.w;
    if (circle.x + circle.r > x2) x2 = circle.x + circle.r;
    return { x1: x1, x2: x2 };
  }

  let yFrameValues = () => {
    let y1 = 0;
    let y2 = 0;
    if (rectangle.y > y1) y1 = rectangle.y;
    if (circle.y - circle.r < y1) y1 = circle.y - circle.r;
    if (rectangle.y + rectangle.h > y2) y2 = rectangle.y + rectangle.h;
    if (circle.y + circle.r > y2) y2 = circle.y + circle.r;
    return { y1: y1, y2: y2 };
  }
  return { xFVal: xFrameValues(), yFVal: yFrameValues() };
}

function drawShapes() {
  let rectangle = {
    x: parseInt(document.getElementById("reX").value, 10) || 125,
    y: parseInt(document.getElementById("reY").value, 10) || 125,
    w: parseInt(document.getElementById("reW").value, 10) || 50,
    h: parseInt(document.getElementById("reH").value, 10) || 50
  }

  let circle = {
    x: parseInt(document.getElementById("ciX").value, 10) || 300,
    y: parseInt(document.getElementById("ciY").value, 10) || 300,
    r: parseInt(document.getElementById("ciR").value, 10) || 100
  }

  let frame = {
    x: getFrame(rectangle, circle).xFVal.x1,
    y: getFrame(rectangle, circle).yFVal.y1,
    w: getFrame(rectangle, circle).xFVal.x2 - getFrame(rectangle, circle).xFVal.x1,
    h: getFrame(rectangle, circle).yFVal.y2 - getFrame(rectangle, circle).yFVal.y1
  }

  if (getFrame(rectangle, circle).xFVal.x1 < 0 || getFrame(rectangle, circle).xFVal.x2 > 500 || getFrame(rectangle, circle).yFVal.y1 < 0 || getFrame(rectangle, circle).yFVal.y2 > 500) {
    document.getElementById("alerting").innerHTML = "INVALID";
    document.getElementById("canvas").style = "border: 1px solid; border-color: red";
  } else {
    document.getElementById("alerting").innerHTML = "VALID";
    document.getElementById("canvas").style = "border: 1px solid; border-color: green";
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.log(`rectangle - x: ${rectangle.x} | y: ${rectangle.y} | w: ${rectangle.w} | h: ${rectangle.h}`)
  console.log(`CIRCLE - x: ${circle.x} | y: ${circle.y} | r: ${circle.r}`)
  console.log(`FRAME - x: ${frame.x} | y: ${frame.y} | w: ${frame.w} | h: ${frame.h}`)
  ctx.fillStyle = 'blue';
  ctx.fillRect(rectangle.x, rectangle.y, rectangle.w, rectangle.h);
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.ellipse(circle.x, circle.y, circle.r, circle.r, 0, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
  ctx.strokeRect(frame.x, frame.y, frame.w, frame.h);
}

function randomVals() {
  let reXCoord = Math.floor(Math.random() * 450);
  let reYCoord = Math.floor(Math.random() * 450);
  let reWidth = Math.floor(Math.random() * (500 - reXCoord))
  let reHeight = Math.floor(Math.random() * (500 - reYCoord))
  let ciXCoord = Math.floor(Math.random() * 450);
  let ciYCoord = Math.floor(Math.random() * 450);
  let ciRadius = 1000;

  while (ciRadius > 500 - ciXCoord || ciRadius > 500 - ciYCoord || ciXCoord - ciRadius < 0 || ciYCoord - ciRadius < 0) {
    ciRadius = Math.floor(Math.random() * 450) + 1;
  }

  document.getElementById("reX").value = reXCoord;
  document.getElementById("reY").value = reYCoord;
  document.getElementById("reW").value = reWidth;
  document.getElementById("reH").value = reHeight;
  document.getElementById("ciX").value = ciXCoord;
  document.getElementById("ciY").value = ciYCoord;
  document.getElementById("ciR").value = ciRadius;
}

document.onload = drawShapes();
