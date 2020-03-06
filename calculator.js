/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-syntax */
/* eslint-disable brace-style */
/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
const { tokenize } = require("./tokenizer");
/**
 * Parses an infix algebraic expression and returns it's value
 * @param expr : expression to be evaluated i.e. 3+4*5-2
 */
exports.parseExpr = (expr) => {
  if (expr === "") {
    console.error("Expression cannot be empty");
    console.error("Test mocha test");
    return expr;
  }

  // remove white spaces
  const newExpr = expr.replace(/(\s)+/g, "");

  // minus in the begining of expression fails i.e. -2 + 3 gives 5 instead of 1
  if (!isValid(newExpr)) {
    console.log(`Invalid expression ${newExpr}. Please provide valid expression.`);
    return expr;
  }

  const postfixExprArray = convertToPostFix(tokenize(newExpr));
  const result = evaluateExpr(postfixExprArray);
  console.log(`Expression \"${newExpr}\" evaluates to \"${postfixExprArray}\"`);
  console.log(`PostFix Expression \"${postfixExprArray}\" evaluates to ${result}`);
  return result;
};

function convertToPostFix(tokens) {
  const opPrecedence = {
    "*": 3, "/": 3, "+": 2, "-": 2, "(": 1,
  };

  const opStack = [];
  const outQueue = [];

  for (const token of tokens) {
    if (isOperand(token)) {
      outQueue.push(token);
    }
    else if (isOperator(token)) {
      while (opStack.length !== 0
        && opPrecedence[opStack[opStack.length - 1]] >= opPrecedence[token]) {
        outQueue.push(opStack.pop());
      }
      opStack.push(token);
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

/**
 * evaluate post fix expressions to value
 * @param postfixExprArray
 */
function evaluateExpr(postfixExprArray) {
  const operandStack = [];
  postfixExprArray.forEach((element) => {
    if (isOperand(element)) {
      operandStack.push(element);
    }
    else if (isOperator(element)) {
      if (operandStack.length <= 1) {
        console.log(`Operation ${element} is missing an operand(s)`);
        return operandStack.toString();
      }
      switch (element) {
        case "*": {
          const second = operandStack.pop();
          const first = operandStack.pop();
          operandStack.push(Number(first) * Number(second));
          break;
        }
        case "/":
        {
          const second = operandStack.pop();
          const first = operandStack.pop();
          operandStack.push(Number(first) / Number(second));
          break;
        }
        case "+":
        {
          const second = operandStack.pop();
          const first = operandStack.pop();
          operandStack.push(Number(first) + Number(second));
          break;
        }
        case "-":
        {
          const second = operandStack.pop();
          const first = operandStack.pop();
          operandStack.push(Number(first) - Number(second));
          break;
        }
        default:
          console.error(`operation not supported: ${element}`);
      }
    }
  });
  return operandStack.toString();
}

function isOperand(char) {
  return /\d+/.test(char);
}

function isOperator(char) {
  return /[\*\/\+\-\(]?/.test(char);
}

function isValid(expr) {
  return /(^[\d\.]+|^\d+[\*\/\+\-\(\.]?)+/.test(expr);
}
