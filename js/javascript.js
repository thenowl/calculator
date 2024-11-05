const body = document.body;
const digits = document.querySelector("#digits");
const operators = document.querySelector("#operators");
const display = document.querySelector("#display");
const equation = document.querySelector("#equation");

let num1 = null;
let num2 = null;
let operator = null;
let result = 0;

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

  display.innerText = result;
  equation.innerHTML += num2 + " &equals; ";
  num1 = result;
  num2 = null;
  operator = null;
}

function populateDisplay(digit) {
  // if (
  //   typeof parseFloat(digit) === "number" ||
  //   digit === "," ||
  //   digit === "." ||
  //   digit === "%" ||
  //   digit === "Backspace" ||
  //   digit === "Escape"
  // ) {
  //   switch (digit) {
  //     case "0":
  //     case "1":
  //     case "2":
  //     case "3":
  //     case "4":
  //     case "5":
  //     case "6":
  //     case "7":
  //     case "8":
  //     case "9":
  //       display.innerText += digit;
  //       break;
  //     case ".":
  //     case ",":
  //       if (display.innerText.includes(".")) break;
  //       if (display.innerText.split("").length === 0) {
  //         display.innerText += "0.";
  //         break;
  //       }
  //       display.innerText += ".";
  //       break;
  //     case "Escape":
  //       display.innerText = "";
  //       equation.innerText = "";
  //       num1 = null;
  //       num2 = null;
  //       operator = null;
  //       break;
  //     case "Backspace":
  //       let temp = display.innerText.split("");
  //       temp.pop();
  //       display.innerText = temp.join("");
  //       break;
  //     case "%":
  //       if (num1) {
  //         display.innerText *= num1 / 100;
  //         break;
  //       }
  //       display.innerText /= 100;
  //       break;
  //   }
  // }

  // Overwrite "0" if only number on screen with no

  if (display.innerText === "0") display.innerText = "";

  // Clear calculation if user enters new number after result-display:

  if (num1 === result && !operator) {
    display.innerText = "";
    equation.innerText = "";
    num1 = null;
    result = 0;
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
    result = 0;
  }
  console.log(digit);
  switch (digit.id || digit) {
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
  // Log input into variable num1:

  if (!num1 && !operator) {
    num1 = getInput();
    display.innerText = "";
    equation.innerText = num1;
  }

  if (num1 === result) equation.innerText = num1;

  // Populate num2 if num1 is populated and operator has been chosen:

  if (num1 && operator) num2 = getInput();

  switch (operatorChoice.id) {
    case "divide":
      // Chaining operators:
      if (operator && num1 && num2) {
        operate(operator, num1, num2);
        operator = "/";
        break;
      }
      // Avoid consecutive operators:
      if (operator) break;
      operator = "/";
      equation.innerHTML += " &div; ";
      break;
    case "multiply":
      if (operator && num1 && num2) {
        operate(operator, num1, num2);
        operator = "*";
        break;
      }
      if (operator) break;
      operator = "*";
      equation.innerHTML += " &times; ";
      break;
    case "subtract":
      if (operator && num1 && num2) {
        operate(operator, num1, num2);
        operator = "-";
        break;
      }
      if (operator) break;
      operator = "-";
      equation.innerHTML += " &minus; ";
      break;
    case "add":
      if (operator && num1 && num2) {
        operate(operator, num1, num2);
        operator = "+";
        break;
      }
      if (operator) break;
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
