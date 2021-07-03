/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-syntax */
/* eslint-disable brace-style */
/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */

/**
 * Parses an infix algebraic expression, convert it to postfix expressions
 * using shunting yard algorithm  https://en.wikipedia.org/wiki/Shunting-yard_algorithm
 * @param {string} expr valid infix expression to be evaluated i.e. 3+4*5
 * @returns string value of an expression 3+4*5 => 23
 */
exports.parseExpr = (expr) => {
  if (!expr) {
    console.error(
      "Invalid expression. Please provide valid expression i.e 3 + 2. Supported operators are +, -, /, *",
    );
    return expr;
  }

  const infixExprArray = convertToTokens(expr);
  const postfixExprArray = convertToRpn(infixExprArray);
  const result = evaluateExpr(expr, postfixExprArray);
  console.log(`RPN expression : ${postfixExprArray} evaluates to ${result}`);
  return result;
};


/**
 * @param {[]} infixExprArray valid infix expression array to be evaluated i.e. 3, +, 4, *, 5
 * @returns postfix array of a valid infix expression 3,4,5,*,+
 */
function convertToRpn(infixExprArray) {
  if (!infixExprArray) {
    console.log("Empty expression");
    return [];
  }

  // highest to lowest
  const opPrecedence = {
    "*": 3,
    "/": 3,
    "+": 2,
    "-": 2,
  };

  // operator stack
  const opStack = [];

  // stack postfix expression
  const outputQueue = [];

  const len = infixExprArray.length;
  for (let i = 0; i < len; ++i) {
    const token = infixExprArray[i];

    if (isNumber(token)) {
      outputQueue.push(token);
    } else if (isOperator(token)) {
      // if token's precedence is less than or equal to an operator in opStack then pop
      while (
        opStack.length !== 0
        && opPrecedence[token] <= opPrecedence[opStack[opStack.length - 1]]
        && opPrecedence[opStack[opStack.length - 1]] !== "(") {
        outputQueue.push(opStack.pop());
      }
      opStack.push(token);
    } else if (token === "(") {
      opStack.push("(");
    } else if (token === ")") {
      while (
        opStack.length !== 0) {
        if (opStack[opStack.length - 1] !== "(") {
          outputQueue.push(opStack.pop());
        } else {
          opStack.pop();
        }
      }
    } else {
      console.error(`${token} not supported`);
      break;
    }
  }

  while (opStack.length !== 0) {
    outputQueue.push(opStack.pop());
  }

  return outputQueue;
}

/**
 * evaluate post fix expressions to a valid value i.e. 345*+ => 23
 * @param {string} infixExpr valid infix expression i.e. 3+4*5
 * @param {[]} postFixArr array containing operand and operands in postfix form 3, 4, 5, *, +
 * @returns evaluated postfix expression value 345*+ => 23
 */
function evaluateExpr(infixExpr, postFixArr) {
  const len = postFixArr.length;
  if (len === 0) {
    console.error("Nothing to evaluate");
    return 0;
  }

  const operandStack = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < len; ++i) {
    const element = postFixArr[i];
    if (isNumber(element)) {
      operandStack.push(Number(element));
    } else if (isOperator(element)) {
      if (operandStack.length <= 1) {
        console.error(
          `Expression ${infixExpr} cannot be evaluated. Operation: ${element} requires two operand. Second Operand is missing`,
        );
        return operandStack.pop();
      }

      switch (element) {
        case "*": {
          const second = operandStack.pop();
          const first = operandStack.pop();
          operandStack.push(first * second);
          break;
        }
        case "/": {
          const second = operandStack.pop();
          const first = operandStack.pop();
          // check for divide by zero error
          if (second === 0) {
            console.error(
              `Operation : ${first} / ${second} divide by zero error`,
            );
            return 0;
          }
          operandStack.push(first / second);
          break;
        }
        case "+": {
          const second = operandStack.pop();
          const first = operandStack.pop();
          operandStack.push(first + second);
          break;
        }
        case "-": {
          const second = operandStack.pop();
          const first = operandStack.pop();
          operandStack.push(first - second);
          break;
        }
        default:
          console.error(`operation not supported: ${element}`);
          break;
      }
    }
  }
  if (operandStack.length > 0) {
    return operandStack.pop();
  }
  return 0;
}

function convertToTokens(expr) {
  // character array like '1', '0', '0', '0', '0' shall be reduced to single string 10000
  const toNumber = (numTokens) => numTokens.reduce((accum, curValue) => accum + curValue);
  const tokenizer = [];
  let numArray = [];
  const len = expr.length;
  for (let i = 0; i < len; ++i) {
    const c = expr[i];

    // ignore white space
    if (c === " ") continue;

    if (isNumber(c) || c === ".") {
      numArray.push(c);
    } else if (isOperator(c) || isParen(c)) {
      if (numArray.length > 0) {
        tokenizer.push(toNumber(numArray));
        numArray = [];
      }
      tokenizer.push(c);
    }
    else {
      console.error(`operation not supported: ${c}`);
      break;
    }
  }

  if (numArray.length > 0) {
    tokenizer.push(toNumber(numArray));
  }
  return tokenizer;
}

/**
 * checks if param is valid operand, in this case number
 * @param {string} str numeric value
 * @returns true if str is numeric value
 */
function isNumber(str) {
  return /(\d*\.?\d+){1}/.test(str);
}

/**
 * checks is param is valid operator i.e. +, -, *, /
 * @param {string} str binary operators
 * @returns true of str is supported operators
 */
function isOperator(str) {
  return /[\*\/\+\-]/.test(str);
}

/**
 * checks is param is valid operator i.e. +, -, *, /
 * @param {string} str binary operators
 * @returns true of str is supported operators
 */
function isParen(str) {
  return /[\(\)]/.test(str);
}
