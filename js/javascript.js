const digits = document.querySelector("#digits");
const operators = document.querySelector("#operators");
const display = document.querySelector("#display");
const equation = document.querySelector("#equation");

let num1 = null;
let num2 = null;
let operator = null;
let result = 0;

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) return "Error: Can not divide by 0";
  return num1 / num2;
}

function operate(operator, num1, num2) {
  // console.log(num1);
  // console.log(num2);
  // console.log(operator);

  if (operator === "+") return add(num1, num2);
  if (operator === "-") return subtract(num1, num2);
  if (operator === "*") return multiply(num1, num2);
  if (operator === "/") return divide(num1, num2);
}

function populateDisplay(digit) {
  if (num1 === result && operator === null) {
    display.innerText = "";
    num1 = null;
  } else if (operator !== null) {
    display.innerText = "";
  }

  switch (digit.id) {
    case "zero":
    case "one":
    case "two":
    case "three":
    case "four":
    case "five":
    case "six":
    case "seven":
    case "eight":
    case "nine":
      display.innerText += digit.innerText;
      break;
    case "plusMinus":
      if (display.innerText.split("").length === 0) break;
      display.innerText *= -1;
      break;
    case "decimalPoint":
      if (display.innerText.includes(".")) break;
      if (display.innerText.split("").length === 0) {
        display.innerText += "0.";
        break;
      }
      display.innerText += ".";
      break;
    case "clear":
      display.innerText = "";
      equation.innerText = "";
      num1 = null;
      num2 = null;
      break;
    case "backspace":
      let temp = display.innerText.split("");
      temp.pop();
      display.innerText = temp.join("");
      break;
  }
}

function getInput() {
  console.log(display.innerText);
  return parseFloat(display.innerText);
}

function getOperator(operatorChoice) {
  if (num1 === null) {
    num1 = getInput();
    equation.innerText = num1;
    display.innerText = "";
  }
  if (num1 === result) display.innerText = "";

  switch (operatorChoice.id) {
    case "divide":
      operator = "/";
      display.innerHTML = "&div;";
      equation.innerHTML += " &div; ";
      break;
    case "multiply":
      operator = "*";
      display.innerHTML = "&times;";
      equation.innerHTML += " &times; ";
      break;
    case "subtract":
      operator = "-";
      display.innerHTML = "&minus;";
      equation.innerHTML += " &minus; ";
      break;
    case "add":
      operator = "+";
      display.innerHTML = "&plus;";
      equation.innerHTML += " &plus; ";
      break;
    case "equals":
      num2 = getInput();
      // console.log(num2);
      result = operate(operator, num1, num2);
      display.innerText = result;
      equation.innerHTML += num2 + " &equals; " + result;
      num1 = result;
      num2 = null;
      operator = null;
      break;
  }
}

digits.addEventListener("click", (event) => {
  let digit = event.target;

  populateDisplay(digit);
});

operators.addEventListener("click", (event) => {
  let operatorChoice = event.target;

  return getOperator(operatorChoice);
});
