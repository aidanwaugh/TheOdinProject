const clearBtn = document.getElementById("clearBtn");
const grid = document.getElementById("grid");
let gridSize;

clearBtn.addEventListener("click", reset);

// DRAW GRID
function makeGrid(gridSize) {
  container.style.setProperty("--grid-rows", gridSize);
  container.style.setProperty("--grid-cols", gridSize);
  for (c = 0; c < gridSize * gridSize; c++) {
    let cell = document.createElement("div");
    grid.appendChild(cell).className = "cell";
  }
  document
    .querySelectorAll(".cell")
    .forEach((cell) => cell.addEventListener("mouseover", colorChange));
}

//SELECT VALUE FOR NEW GRID + DRAW
function reset() {
  grid.querySelectorAll(".cell").forEach((cell) => cell.remove());
  let gridSize = prompt("Enter new grid length between 2 & 64");
  while (isNaN(gridSize) || gridSize > 64 || gridSize < 2) {
    gridSize = prompt("Invalid! Please select a size between 2-64");
  }
  makeGrid(gridSize);
}

//CHANGE COLOR WHEN MOUSE OVER
function colorChange() {
  this.style.backgroundColor = "black";
}

makeGrid(16);
