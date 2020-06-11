const btnNumber = document.querySelectorAll(".btn-number");
const btnOperation = document.querySelectorAll(".btn-operation");
const btnEqual = document.querySelector(".btn-equal");
const btnDelete = document.querySelector(".btn-delete");
const btnClear = document.querySelector(".btn-clear");
const displayPrevious = document.querySelector(".display-previous");
const displayCurrent = document.querySelector(".display-current");

let numCurrent = "";
let numPrev = "";
let operation = undefined;
let clickedEquals = false;

function clear() {
  numCurrent = "";
  numPrev = "";
  operation = undefined;
}

function deleteNumber() {
  numCurrent = numCurrent.toString().slice(0, -1);
}

function appendNumber(number) {
  if (clickedEquals == true) {
    clear();
    clickedEquals = false;
  }
  if (number === "." && numCurrent.includes(".")) return;
  numCurrent = numCurrent.toString() + number.toString();
}

function chooseOperation(operator) {
  if (clickedEquals == true) clickedEquals = false;
  if (numCurrent == "") {
    console.log(`NO current number - can't add operator`);
    return;
  }
  if (numPrev != "") {
    console.log("do math");
    math(operation, parseFloat(numPrev), parseFloat(numCurrent));
  }
  operation = operator;
  numPrev = numCurrent;
  numCurrent = "";
}

function math(operator, prev, current) {
  let computation;
  if ((operator == "÷") & (current == 0)) return;
  if (isNaN(prev) || isNaN(current)) return;
  switch (operator) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
    default:
      return;
  }
  numCurrent = computation;
  operation = undefined;
  numPrev = "";
}

function getDisplayNumber(number) {
  const stringNumber = number.toString();
  const integerDigits = parseFloat(stringNumber.split(".")[0]);
  const decimalDigits = stringNumber.split(".")[1];
  let integerDisplay;
  if (isNaN(integerDigits)) {
    integerDisplay = "";
  } else {
    integerDisplay = integerDigits;
  }
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    return integerDisplay;
  }
}

function updateCalculatorDisplay() {
  displayCurrent.innerText = getDisplayNumber(numCurrent);
  if (operation != null) {
    console.log(operation);
    displayPrevious.innerText = `${getDisplayNumber(numPrev)} ${operation}`;
  } else {
    displayPrevious.innerText = "";
  }
}

// ------- BUTTONS -------

btnNumber.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.innerText);
    updateCalculatorDisplay();
  });
});

btnOperation.forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperation(button.innerText);
    updateCalculatorDisplay();
  });
});

btnEqual.addEventListener("click", (button) => {
  math(operation, parseFloat(numPrev), parseFloat(numCurrent));
  updateCalculatorDisplay();
  clickedEquals = true;
});

btnClear.addEventListener("click", (button) => {
  clear();
  updateCalculatorDisplay();
});

btnDelete.addEventListener("click", (button) => {
  deleteNumber();
  updateCalculatorDisplay();
});
