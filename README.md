# Calculator

The `calculator` is a JavaScript-based library designed to parse, convert, and evaluate mathematical expressions. It supports basic arithmetic operations and handles complex expressions with parentheses for operator precedence. This project is created for learning purposes and is inspired by the Microsoft Calculator app on Windows 10.

---

## Features

- **Arithmetic Operations**: Supports addition (`+`), subtraction (`-`), multiplication (`*`), and division (`/`).
- **Parentheses Handling**: Supports nested parentheses for proper operator precedence.
- **Expression Parsing**: Converts infix expressions to postfix notation using the Shunting Yard algorithm.
- **Error Handling**: Provides detailed error messages for invalid expressions or unsupported tokens.
- **Lightweight and Modular**: Can be easily integrated into other JavaScript projects.
- **Division by Zero Handling**: Explicitly handles cases like `0 / 0` and `1 / 0`.

---

## Installation

To use the `calculator` library in your project, clone the repository and install the dependencies:

```bash
git clone https://github.com/WebDevsOrg/calculator.git
cd calculator
npm install
```

---

## Example Usage

```javascript
const calculator = require("./calculator");

// Simple addition
console.log(calculator.parseExpr("5+5")); // Output: 10

// Complex expression
console.log(calculator.parseExpr("2+3*3/(4-3)")); // Output: 11

// Nested parentheses
console.log(calculator.parseExpr("(1+(2*3))/(2+4)")); // Output: 1

// Division by zero
try {
  console.log(calculator.parseExpr("1/0"));
} catch (error) {
  console.error(error.message); // Output: Division by zero is undefined (0 / 0).
}

// Invalid expression
try {
  console.log(calculator.parseExpr("2^3"));
} catch (error) {
  console.error(error.message); // Output: Unsupported token encountered: '^'
}
```

---

## Development

### Running Tests

This project uses `mocha` for testing. To run the test suite, use the following command:

```bash
npm test
```

### Linting and Formatting

The project uses `eslint` and `prettier` for linting and formatting. Run the following commands to lint and format the code:

- Lint the code:

  ```bash
  npm run lint
  ```

- Format the code:
  ```bash
  npm run format
  ```

---

## Contributing

Contributions are welcome! If you have ideas for new features or improvements, feel free to open an issue or submit a pull request.

---

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

---

## Issues

If you encounter any issues or have questions, please open an issue on the [GitHub repository](https://github.com/WebDevsOrg/calculator/issues).
