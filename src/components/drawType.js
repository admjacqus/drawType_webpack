var w = Math.round(1.0 * window.innerWidth - 16);
var h = Math.round(1.0 * window.innerHeight - 16);

function createDrawBox() {
  document.body.innerHTML +=
    '<button id="clearDrawingBtn">clear</button><canvas id="drawBox" width="' +
    w +
    '" height="' +
    h +
    '"></canvas>';
}

async function drawType() {
  let isDrawing = false,
    x = 0,
    y = 0;

  createDrawBox();

  const context = drawBox.getContext("2d");
  const rect = drawBox.getBoundingClientRect();

  drawBox.addEventListener("mousedown", e => {
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    isDrawing = true;
  });
  drawBox.addEventListener("mousemove", e => {
    if (isDrawing === true) {
      drawLine(context, x, y, e.clientX - rect.left, e.clientY - rect.top);
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
  });
  drawBox.addEventListener("mouseup", e => {
    if (isDrawing === true) {
      drawLine(context, x, y, e.clientX - rect.left, e.clientY - rect.top);
      x = 0;
      y = 0;
      isDrawing = false;
    }
  });

  let i = 0;
  let char = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];

  function drawLine(context, x1, y1, x2, y2) {
    if (i > char.length - 2) {
      i = 0;
    } else {
      i++;
    }
    let fz = 12;
    if (Math.sign(x1 - x2) < 0) {
      context.font = x1 + x2 / fz + "px Helvetica";
      context.strokeText(char[i], x1, y1);
    } else {
      context.font = x1 - x2 / fz + "px Helvetica";
      context.strokeText(char[i], x1, y1);
    }
  }

  const clearDrawingBtn = document.getElementById("clearDrawingBtn");

  clearDrawingBtn.addEventListener("click", e => {
    context.clearRect(0, 0, w, h);
  });

  // window.addEventListener("resize", createDrawBox);
}

export default drawType;
