/* eslint-disable no-restricted-syntax */
/* eslint-disable brace-style */
/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */

function parseExpr(expr) {
  if (expr === "") {
    console.error("Emtpy expression. Please provide valid expression");
    return;
  }
  const postfixExpr = convertToRpn(expr);
  console.log(`RPL expression : ${postfixExpr}`);
  return evaluateExpr(postfixExpr);
}

function convertToRpn(expr) {
  const opPrecedence = {
    "*": 3, "/": 3, "+": 2, "-": 2, "(": 1,
  };

  const opStack = [];
  const outQueue = [];

  for (const char of expr) {
    if (isOperand(char)) {
      outQueue.push(char);
    }
    else if (isOperator(char)) {
      while (opStack.length !== 0
        && opPrecedence[opStack[opStack.length - 1]] >= opPrecedence[char]) {
        outQueue.push(opStack.pop());
      }
      opStack.push(char);
    }
    /*
    else if (char.match(/\(/)) {
      opStack.push(char);
    }
    else if (char.match(/\)/)) {
      char top = opStack.pop();
      while()
      opStack.push(char);
    }
    */
  }

  while (opStack.length !== 0) {
    outQueue.push(opStack.pop());
  }
  return outQueue;
}

function evaluateExpr(expr) {
  return expr;
}

function isOperand(char) {
  return char.match(/[0-9]/) !== null;
}

function isOperator(char) {
  return char.match(/\*|\/|\+|-/) !== null;
}
