const clearBtn = document.getElementById("clearBtn");
const grid = document.getElementById("grid");
let gridSize;

// MAKE GRID
function makeGrid(gridSize) {
  container.style.setProperty("--grid-rows", gridSize);
  container.style.setProperty("--grid-cols", gridSize);
  for (c = 0; c < gridSize * gridSize; c++) {
    let cell = document.createElement("div");
    grid.appendChild(cell).className = "cell";
  }
}

clearBtn.addEventListener("click", reset);

function reset() {
  grid.querySelectorAll(".cell").forEach((cell) => cell.remove());
  let prompt = window.prompt("Enter new grid length between 2 & 30");

  if (!(prompt >= 2 && prompt <= 30)) {
    alert("Value must be between 2 & 30");
  }
  if (prompt >= 2 && prompt <= 30) {
    // (gridWidth = parseInt(prompt));
    makeGrid(parseInt(prompt));
  }
}

makeGrid(16);
