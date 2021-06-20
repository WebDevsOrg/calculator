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
  // minus in the begining of expression fails i.e. -2 + 3 gives 5 instead of 1
  if (!isValid(expr)) {
    console.error(
      "Invalid expression. Please provide valid expression i.e 3 + 2",
    );
    return expr;
  }
  const postfixExprArray = convertToRpn(expr);
  const result = evaluateExpr(postfixExprArray);
  console.log(`RPN expression : ${postfixExprArray} evaluates to ${result}`);
  return result;
};

/**
 * @param {string} expr valid infix expression to be evaluated i.e. 3+4*5
 * @returns postfix version of a valid infix expression 345*+
 */
function convertToRpn(expr) {
  // highest to lowest
  const opPrecedence = {
    "*": 3,
    "/": 3,
    "+": 2,
    "-": 2,
    "(": 1,
  };

  // operator stack
  const opStack = [];

  // stack postfix expression
  const postFixQueue = [];

  // tokenize numeric characters
  let tokenizer = [];

  // character array like '1', '0', '0', '0', '0' shall be reduced to single string 10000
  const reduceTo = (strTokens) => strTokens.reduce((accum, curValue) => accum + curValue);

  for (const c of expr) {
    if (isOperand(c)) {
      tokenizer.push(c);
    } else if (isOperator(c)) {
      if (tokenizer.length > 0) {
        postFixQueue.push(reduceTo(tokenizer));
        tokenizer = [];
      }
      // if c's precedence is less than or euqla to an operator in opStack then pop
      while (
        opStack.length !== 0
        && opPrecedence[c] <= opPrecedence[opStack[opStack.length - 1]]
      ) {
        postFixQueue.push(opStack.pop());
      }
      opStack.push(c);
    } else {
      console.error(`${c} not supported`);
    }
  }

  if (tokenizer.length > 0) {
    postFixQueue.push(reduceTo(tokenizer));
    tokenizer = [];
  }

  while (opStack.length !== 0) {
    postFixQueue.push(opStack.pop());
  }
  return postFixQueue;
}

/**
 * evaluate post fix expressions to a valid value i.e. 345*+ => 3+4*5 => 23
 * @param {*} postFixArr array containing operand and operands in postfix form 3, 4, 5, *, +
 * @returns evaluated postfix expression value 345*+ => 23
 */
function evaluateExpr(postFixArr) {
  const len = postFixArr.length;
  if (len === 0) {
    console.error("Nothing to evaluate");
    return 0;
  }

  const operandStack = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < len; ++i) {
    const element = postFixArr[i];
    if (isOperand(element)) {
      operandStack.push(Number(element));
    } else if (isOperator(element)) {
      if (operandStack.length <= 1) {
        console.error(
          `Operation : ${element} requires two operand. Second Operand is missing`,
        );
        return 0;
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

/**
 * checks if param is valid operand, in this case number
 * @param {string} str numeric value
 * @returns true if str is numeric value
 */
function isOperand(str) {
  return /[0-9]+/.test(str);
}

/**
 * checks is param is valid operator i.e. +, -, *, /
 * @param {string} str binary operators
 * @returns true of str is supported operators
 */
function isOperator(str) {
  return /[\*\/\+\-\(]/.test(str);
}

/**
 * checks if expression is valid, can have numbers and binary operators
 * @param {string} expr simple expressions like 3+4*5
 * @returns returns true if expr is either number, operator or
 * combination of both
 */
function isValid(expr) {
  return /([0-9][\*\/\+\-\(])+/.test(expr);
}
