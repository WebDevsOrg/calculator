/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-syntax */
/* eslint-disable brace-style */
/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */

const OPERATOR_PRECEDENCE = {
  "*": 3,
  "/": 3,
  "+": 2,
  "-": 2,
};

const SUPPORTED_OPERATORS = /[\*\/\+\-]/;
const SUPPORTED_PARENS = /[\(\)]/;

const ERRORS = {
  INVALID_POSTFIX: "Postfix array is empty or invalid.",
  INVALID_OPERATOR: (expr, token) => `Invalid expression: ${expr}. Operator '${token}' requires two operands.`,
  UNSUPPORTED_TOKEN: (token) => `Unsupported token encountered: '${token}'`,
  INVALID_EXPRESSION: (postFixArr) => `Invalid postfix expression: ${postFixArr.join(" ")}`,
};

/**
 * Parses an infix algebraic expression, converts it to postfix notation,
 * and evaluates the result.
 * @param {string} expr - A valid infix expression to be evaluated (e.g., "3+4*5").
 * @returns {number} - The evaluated result of the expression.
 * @throws {Error} - Throws an error if the input is invalid or unsupported.
 */
exports.parseExpr = (expr) => {
  if (typeof expr !== "string" || expr.trim() === "") {
    throw new Error("Invalid expression: Expression must be a non-empty string.");
  }

  const infixTokens = tokenizeExpression(expr); // Tokenize the input expression into an array of tokens.
  const postfixTokens = convertToPostfix(infixTokens); // Convert the infix tokens to postfix notation.
  return evaluatePostfixExpression(expr, postfixTokens); // Evaluate the postfix expression and return the result.
};

/**
 * Converts an infix expression array to a postfix expression array using the Shunting Yard algorithm.
 * @param {string[]} infixTokens - Array of tokens in infix notation.
 * @returns {string[]} - Array of tokens in postfix notation.
 * @throws {Error} - Throws an error if the input is invalid or contains unsupported tokens.
 */
function convertToPostfix(infixTokens) {
  if (!Array.isArray(infixTokens) || infixTokens.length === 0) {
    throw new Error("Input must be a non-empty array of tokens.");
  }

  const operatorStack = []; // Stack to hold operators and parentheses.
  const outputQueue = []; // Queue to hold the final postfix expression.

  for (const token of infixTokens) {
    if (isNumber(token)) {
      outputQueue.push(token); // Push numbers directly to the output queue.
    } else if (isOperator(token)) {
      // Pop operators from the stack to the output queue based on precedence.
      while (
        operatorStack.length > 0 &&
        OPERATOR_PRECEDENCE[token] <= OPERATOR_PRECEDENCE[operatorStack[operatorStack.length - 1]] &&
        operatorStack[operatorStack.length - 1] !== "("
      ) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.push(token); // Push the current operator to the stack.
    } else if (token === "(") {
      operatorStack.push(token); // Push opening parentheses to the stack.
    } else if (token === ")") {
      // Pop operators from the stack to the output queue until an opening parenthesis is encountered.
      while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== "(") {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.pop(); // Remove the opening parenthesis from the stack.
    } else {
      throw new Error(ERRORS.UNSUPPORTED_TOKEN(token)); // Throw an error for unsupported tokens.
    }
  }

  // Pop any remaining operators from the stack to the output queue.
  while (operatorStack.length > 0) {
    outputQueue.push(operatorStack.pop());
  }

  return outputQueue;
}

/**
 * Evaluates a postfix expression to a valid numerical result.
 * @param {string} infixExpr - The original infix expression (used for error context).
 * @param {string[]} postfixTokens - Array of tokens in postfix notation.
 * @returns {number} - The evaluated result of the postfix expression.
 * @throws {Error} - Throws an error if the postfix expression is invalid.
 */
function evaluatePostfixExpression(infixExpr, postfixTokens) {
  if (!Array.isArray(postfixTokens) || postfixTokens.length === 0) {
    throw new Error(ERRORS.INVALID_POSTFIX);
  }

  const operandStack = []; // Stack to hold operands during evaluation.

  for (const token of postfixTokens) {
    if (isNumber(token)) {
      operandStack.push(Number(token)); // Push numbers to the operand stack.
    } else if (isOperator(token)) {
      // Ensure there are at least two operands for the operator.
      if (operandStack.length < 2) {
        throw new Error(ERRORS.INVALID_OPERATOR(infixExpr, token));
      }
      const second = operandStack.pop(); // Pop the second operand.
      const first = operandStack.pop(); // Pop the first operand.
      operandStack.push(performOperation(token, first, second)); // Perform the operation and push the result.
    } else {
      throw new Error(ERRORS.UNSUPPORTED_TOKEN(token)); // Throw an error for unsupported tokens.
    }
  }

  // Ensure there is exactly one result left in the stack.
  if (operandStack.length !== 1) {
    throw new Error(ERRORS.INVALID_EXPRESSION(postfixTokens));
  }

  return operandStack.pop(); // Return the final result.
}

/**
 * Performs a mathematical operation on two operands.
 * @param {string} operator - The operator to apply (e.g., "+", "-", "*", "/").
 * @param {number} first - The first operand.
 * @param {number} second - The second operand.
 * @returns {number} - The result of the operation.
 * @throws {Error} - Throws an error if the operator is unsupported.
 */
function performOperation(operator, first, second) {
  const OPERATIONS = {
    "*": (a, b) => a * b,
    "/": (a, b) => (b === 0 ? NaN : a / b), // Handle division by zero.
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
  };

  if (!OPERATIONS[operator]) {
    throw new Error(`Unsupported operator: ${operator}`);
  }

  return OPERATIONS[operator](first, second);
}

/**
 * Tokenizes an infix expression into an array of string tokens.
 * @param {string} expr - A valid infix expression (e.g., "2+3*4+(8+2)").
 * @returns {string[]} - Array of tokens (numbers, operators, parentheses).
 * @throws {Error} - Throws an error if unsupported characters are encountered.
 */
function tokenizeExpression(expr) {
  const tokens = [];
  let currentNumber = "";

  for (const char of expr) {
    if (char === " ") continue; // Ignore spaces.

    if (isNumber(char) || char === ".") {
      currentNumber += char; // Build multi-digit numbers or decimals.
    } else if (isOperator(char) || isParen(char)) {
      if (currentNumber) {
        tokens.push(currentNumber); // Push the current number to tokens.
        currentNumber = "";
      }
      tokens.push(char); // Push the operator or parenthesis to tokens.
    } else {
      throw new Error(ERRORS.UNSUPPORTED_TOKEN(char)); // Throw an error for unsupported characters.
    }
  }

  if (currentNumber) {
    tokens.push(currentNumber); // Push any remaining number to tokens.
  }

  return tokens;
}

/**
 * Checks if a string is a valid number.
 * @param {string} str - The string to check.
 * @returns {boolean} - True if the string is a valid number, false otherwise.
 */
function isNumber(str) {
  return /^(\d*\.?\d+)$/.test(str);
}

/**
 * Checks if a string is a valid operator.
 * @param {string} str - The string to check.
 * @returns {boolean} - True if the string is a supported operator, false otherwise.
 */
function isOperator(str) {
  return SUPPORTED_OPERATORS.test(str);
}

/**
 * Checks if a string is a valid parenthesis.
 * @param {string} str - The string to check.
 * @returns {boolean} - True if the string is a supported parenthesis, false otherwise.
 */
function isParen(str) {
  return SUPPORTED_PARENS.test(str);
}
