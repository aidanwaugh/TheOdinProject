const numberButtons = document.querySelectorAll(".btnNumber");
const operatorButtons = document.querySelectorAll(".btnOperator");
const equalsButton = document.querySelector(".btnEquals");
const deleteButton = document.querySelector(".btnDelete");
const clearButton = document.querySelector(".btnClear");
const displayHistoryTextElement = document.getElementById("displayHistory");
const displayCurrentTextElement = document.getElementById("displayCurrent");

let numCurrent = "";
let numPrev = "";
let numHistoryString = "";
let numResult = "";
let operandCalculate = "";
let operandNext = "";

function math(operator, a, b) {
  switch (operator) {
    case "+":
      numResult = a + b;
      console.log(numResult);
      break;
    case "-":
      numResult = a - b;
      console.log(numResult);
      break;
    case "*":
      numResult = a * b;
      console.log(numResult);
      break;
    case "/":
      numResult = a / b;
      console.log(numResult);
      break;
    default:
      console.log("error with switch");
      return;
  }
  numCurrent = numResult;
  operandCalculate = operandNext;
  operandNext = "";
  numResult = "";
  numPrev = "";
}

console.log(`START numPrev: =${numPrev}  numCurrent:${numCurrent}  numResult:${numResult} operandCalculate:${operandCalculate} operandNext:${operandNext}`);

function appendNumber(buttonNumberInnerText) {
  numCurrent += buttonNumberInnerText;
  console.log(`APPENDstart numPrev: =${numPrev}  numCurrent:${numCurrent}  numResult:${numResult} operandCalculate:${operandCalculate} operandNext:${operandNext}`);
}
/* 


*/
function operate(buttonOperatorInnerText) {
  if (numCurrent == "" && numPrev == "") return;
  if (numPrev != "") {
    operandNext = buttonOperatorInnerText;
    console.log(operandNext);
    math(operandCalculate, parseInt(numPrev), parseInt(numCurrent));
    console.log(`OPERATEconcat numPrev: =${numPrev}  numCurrent:${numCurrent}  numResult:${numResult} operandCalculate:${operandCalculate} operandNext:${operandNext}`);
  }
  if (numPrev == "") {
    numPrev = numCurrent;
    numCurrent = "";
    operandCalculate = buttonOperatorInnerText;
    console.log(`OPERATEempty numPrev: =${numPrev}  numCurrent:${numCurrent}  numResult:${numResult} operandCalculate:${operandCalculate} operandNext:${operandNext}`);
  }

  //   numCurrent = "";
}

function clear() {}
/* 



*/
function updateCalculatorDisplay() {
  //show in HTML
  displayCurrentTextElement.innerText = numCurrent;
  displayHistoryTextElement.innerText = numHistoryString;
}

/* 




*/
//ADD EVENT LISTENERS
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.innerText);
    updateCalculatorDisplay();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    operate(button.innerText);
    updateCalculatorDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  math(operandCalculate, parseInt(numPrev), parseInt(numCurrent));
});

clearButton.addEventListener("click", () => {
  clearButton();
});
