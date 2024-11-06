const body = document.body;
const digits = document.querySelector("#digits");
const operators = document.querySelector("#operators");
const display = document.querySelector("#display");
const equation = document.querySelector("#equation");

let num1 = null;
let num2 = null;
let operator = null;
let result = null;

function add(operand1, operand2) {
  return operand1 + operand2;
}

function subtract(operand1, operand2) {
  return operand1 - operand2;
}

function multiply(operand1, operand2) {
  return operand1 * operand2;
}

function divide(operand1, operand2) {
  if (operand2 === 0) return "Error: Can not divide by 0";
  return operand1 / operand2;
}

function operate(operation, operand1, operand2) {
  if (operation === "+") result = add(operand1, operand2);
  if (operation === "-") result = subtract(operand1, operand2);
  if (operation === "*") result = multiply(operand1, operand2);
  if (operation === "/") result = divide(operand1, operand2);

  // Rounds to 8 decimals:
  result = Math.round(result * 100000000) / 100000000;

  display.innerText = result;
  equation.innerHTML += num2 + " &equals; ";
  num1 = result;
  num2 = null;
  operator = null;
}

function populateDisplay(digit) {
  // Overwrite "0" if only number on screen with no

  if (display.innerText === "0") display.innerText = "";

  // Clear calculation if user enters new number after result-display:

  if (result && num1 === result && !operator) {
    display.innerText = "";
    equation.innerText = "";
    num1 = null;
    num2 = null;
    operator = null;
    result = null;
  }

  // "Chaining operations" handler:

  if (num1 === result && operator) {
    display.innerText = "";
    equation.innerText = num1;
    operator === "+"
      ? (equation.innerHTML += " &plus; ")
      : operator === "-"
      ? (equation.innerHTML += " &minus; ")
      : operator === "*"
      ? (equation.innerHTML += " &times; ")
      : (equation.innerHTML += " &div; ");
    result = null; //unlocks if double-pressing operator in chaining-mode
  }

  if (display.innerText.length >= 7) return;

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
      operator = null;
      break;
    case "backspace":
      let temp = display.innerText.split("");
      temp.pop();
      display.innerText = temp.join("");
      break;
    case "percent":
      if (num1) {
        display.innerText *= num1 / 100;
        break;
      }
      display.innerText /= 100;
      break;
  }
}

function getInput() {
  return parseFloat(display.innerText);
}

function getOperator(operatorChoice) {
  // Prevents consecutive operators in chaining-mode:

  if (result && num1 && operator) return;

  // Log input into variable num1:

  if (!num1) {
    num1 = getInput();
    display.innerText = "";
    equation.innerText = num1;
  }

  // Populate num2 if num1 is populated and operator has been chosen:

  if (num1 && operator) num2 = getInput();

  switch (operatorChoice.id) {
    case "divide":
      // Operators chaining-mode:
      if (operator && num1 && num2) {
        operate(operator, num1, num2);
        operator = "/";
        break;
      }
      // Avoid consecutive operators:
      if (operator) break;
      //Standard operator:
      operator = "/";
      equation.innerHTML += " &div; ";
      break;
    case "multiply":
      // Operators chaining-mode:
      if (operator && num1 && num2) {
        operate(operator, num1, num2);
        operator = "*";
        break;
      }
      // Avoid consecutive operators:
      if (operator) break;
      //Standard operator:
      operator = "*";
      equation.innerHTML += " &times; ";
      break;
    case "subtract":
      // Operators chaining-mode:
      if (operator && num1 && num2) {
        operate(operator, num1, num2);
        operator = "-";
        break;
      }
      // Avoid consecutive operators:
      if (operator) break;
      //Standard operator:
      operator = "-";
      equation.innerHTML += " &minus; ";
      break;
    case "add":
      // Operators chaining-mode:
      if (operator && num1 && num2) {
        console.log(num2);
        operate(operator, num1, num2);
        operator = "+";
        break;
      }
      // Avoid consecutive operators:
      if (operator) break;
      //Standard operator:
      operator = "+";
      equation.innerHTML += " &plus; ";
      break;
    case "equals":
      // Avoid "equals" if no operator or value for num2 is set:
      if (!operator || num2 === null) break;
      operate(operator, num1, num2);
      break;
  }
}

digits.addEventListener("click", (event) => {
  let digit = event.target;

  populateDisplay(digit);
});

operators.addEventListener("click", (event) => {
  let operatorChoice = event.target;

  getOperator(operatorChoice);
});

body.addEventListener("keydown", (event) => {
  let keyPress = event.key;

  switch (keyPress) {
    case "0":
      document.querySelector("#zero").click();
      break;
    case ".":
    case ",":
      document.querySelector("#decimalPoint").click();
      break;
    case "1":
      document.querySelector("#one").click();
      break;
    case "2":
      document.querySelector("#two").click();
      break;
    case "3":
      document.querySelector("#three").click();
      break;
    case "4":
      document.querySelector("#four").click();
      break;
    case "5":
      document.querySelector("#five").click();
      break;
    case "6":
      document.querySelector("#six").click();
      break;
    case "7":
      document.querySelector("#seven").click();
      break;
    case "8":
      document.querySelector("#eight").click();
      break;
    case "9":
      document.querySelector("#nine").click();
      break;
    case "Escape":
      document.querySelector("#clear").click();
      break;
    case "Backspace":
      document.querySelector("#backspace").click();
      break;
    case "%":
      document.querySelector("#percent").click();
      break;
    case "+":
      document.querySelector("#add").click();
      break;
    case "-":
      document.querySelector("#subtract").click();
      break;
    case "*":
      document.querySelector("#multiply").click();
      break;
    case "/":
      document.querySelector("#divide").click();
      break;
    case "Enter":
      document.querySelector("#equals").click();
      break;
  }
});
