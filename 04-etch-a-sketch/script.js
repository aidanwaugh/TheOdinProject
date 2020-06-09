const clearBtn = document.getElementById("clearBtn");
const grid = document.getElementById("grid");
const toggleBtn = document.getElementById("opacityBtn");
let drawOpacity = true;
let gridSize;

clearBtn.addEventListener("click", reset);
toggleBtn.addEventListener("click", toggleDraw);

// DRAW GRID
function makeGrid(gridSize) {
  container.style.setProperty("--grid-rows", gridSize);
  container.style.setProperty("--grid-cols", gridSize);
  for (c = 0; c < gridSize * gridSize; c++) {
    let cell = document.createElement("div");
    grid.appendChild(cell).className = "cell";
  }
  //when the oust is over a single cell in the grid, draw on it
  document.querySelectorAll(".cell").forEach((cell) => cell.addEventListener("mouseover", colorChange));
}

//SELECT VALUE FOR NEW GRID + DRAW
function reset() {
  grid.querySelectorAll(".cell").forEach((cell) => cell.remove());
  let gridSize = prompt("Enter new grid size between 2 & 64");
  while (isNaN(gridSize) || gridSize > 64 || gridSize < 2) {
    gridSize = prompt("Invalid! Please select a size between 2-64");
  }
  makeGrid(gridSize);
}

function toggleDraw() {
  if (drawOpacity == true) {
    drawOpacity = false;
  } else {
    drawOpacity = true;
    console.log(drawOpacity + " draw opacity");
  }
}

//CHANGE COLOR WHEN MOUSE OVER
function colorChange() {
  if (drawOpacity == true) {
    let opacity = Number(this.style.opacity);
    this.style.opacity = 0.1;
    this.style.backgroundColor = "black"; //must have bg color. can't change opacity on non existing color

    if (this.style.opacity < 1) {
      this.style.opacity = opacity + 0.1;
    }
  } else {
    this.style.opacity = 1;
    this.style.backgroundColor = "black";
  }
}

makeGrid(16);
