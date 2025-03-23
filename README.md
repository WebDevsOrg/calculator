# Calculator

The `calculator` is a JavaScript-based library designed to parse, convert, and evaluate mathematical expressions. It supports basic arithmetic operations and handles complex expressions with parentheses for operator precedence. This project is created for learning purposes and is inspired by the Microsoft Calculator app on Windows 10.

---

## Features

- **Arithmetic Operations**: Supports addition (`+`), subtraction (`-`), multiplication (`*`), and division (`/`).
- **Parentheses Handling**: Supports nested parentheses for proper operator precedence.
- **Expression Parsing**: Converts infix expressions to postfix notation using the Shunting Yard algorithm.
- **Error Handling**: Provides detailed error messages for invalid expressions or unsupported tokens.
- **Lightweight and Modular**: Can be easily integrated into other JavaScript projects.

---

## Example Usage

```javascript
const calculator = require('./calculator');

// Simple addition
console.log(calculator.parseExpr("5+5")); // Output: 10

// Complex expression
console.log(calculator.parseExpr("2+3*3/(4-3)")); // Output: 11

// Invalid expression
try {
  console.log(calculator.parseExpr("2^3"));
} catch (error) {
  console.error(error.message); // Output: Unsupported token encountered: '^'
}
