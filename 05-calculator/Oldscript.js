const numberButtons = document.querySelectorAll(".btnNumber");
const operatorButtons = document.querySelectorAll(".btnOperator");
const equalsButton = document.querySelector(".btnEquals");
const deleteButton = document.querySelector(".btnDelete");
const clearButton = document.querySelector(".btnClear");
const displayHistoryTextElement = document.getElementById("displayHistory");
const displayCurrentTextElement = document.getElementById("displayCurrent");

let numCurrent = "";
let numPrev = "";
let numResult = "";
let numHistoryString = "";

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      numResult = a + b;
      break;
    case "-":
      numResult = a - b;
      break;
    case "*":
      numResult = a * b;
      break;
    case "/":
      numResult = a / b;
      break;
    default:
      return;
  }
  numCurrent = numResult;
}

console.log(`START numPrev: =${numPrev}  numCurrent:${numCurrent}  numResult:${numResult}`);

function appendNumber(buttonNumberInnerText) {
  if (numPrev == "") {
    numCurrent += buttonNumberInnerText;
    numHistoryString += buttonNumberInnerText;
    console.log(`APPENDstart numPrev: =${numPrev}  numCurrent:${numCurrent}  numResult:${numResult}`);
  }
  if (numPrev != "") {
    numCurrent = "";
    numCurrent += buttonNumberInnerText;
    numHistoryString += buttonNumberInnerText;
    console.log(`APPENDsecond numPrev: =${numPrev}  numCurrent:${numCurrent}  numResult:${numResult}`);
  }
}
/* 


*/
function calculate(buttonOperatorInnerText) {
  if (numPrev == "") {
    numPrev = numCurrent;
    numCurrent = "";
    numHistoryString += buttonOperatorInnerText;
    console.log(`OPERATE numPrev: =${numPrev}  numCurrent:${numCurrent}  numResult:${numResult}`);
  }

  if (numPrev != "") {
    operate(buttonOperatorInnerText, parseInt(numPrev), parseInt(numCurrent));
    numCurrent = numResult;
    numHistoryString += buttonOperatorInnerText;

    console.log(`OPERATE numPrev: =${numPrev}  numCurrent:${numCurrent}  numResult:${numResult}`);
  }
}
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
    calculate(button.innerText);
    updateCalculatorDisplay();
  });
});
