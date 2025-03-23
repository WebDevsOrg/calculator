/* eslint-disable linebreak-style */
const assert = require("assert");
const calculator = require("../calculator");

describe("Calculator", () => {
  describe("Addition Tests", () => {
    it("should return 10 when the expression is 5 + 5", () => {
      assert.strictEqual(calculator.parseExpr("5+5"), 10);
    });

    it("should return 0 when the expression is 0 + 0", () => {
      assert.strictEqual(calculator.parseExpr("0+0"), 0);
    });

    it("should return 2000000 when the expression is 1000000 + 1000000", () => {
      assert.strictEqual(calculator.parseExpr("1000000+1000000"), 2000000);
    });

    it("should return 23.23 when the expression is 23 + 0.23", () => {
      assert.strictEqual(calculator.parseExpr("23+0.23").toFixed(2), "23.23");
    });

    it("should return 30 when the expression is 10 + 10 + 5 + 5", () => {
      assert.strictEqual(calculator.parseExpr("10+10+5+5"), 30);
    });

    it("should return 30 when the expression has extra spaces (e.g., ' 10 + 10 + 5 + 5 ')", () => {
      assert.strictEqual(calculator.parseExpr("  10 + 10 + 5 + 5  "), 30);
    });
  });

  describe("Subtraction Tests", () => {
    it("should return 0 when the expression is 5 - 5", () => {
      assert.strictEqual(calculator.parseExpr("5-5"), 0);
    });

    it("should return 1 when the expression is 1 - 0", () => {
      assert.strictEqual(calculator.parseExpr("1-0"), 1);
    });

    it("should return 0.3 when the expression is 0.5 - 0.2", () => {
      assert.strictEqual(calculator.parseExpr("0.5-0.2"), 0.3);
    });
  });

  describe("Multiplication Tests", () => {
    it("should return 25 when the expression is 5 * 5", () => {
      assert.strictEqual(calculator.parseExpr("5*5"), 25);
    });

    it("should return 0 when the expression is 5 * 0", () => {
      assert.strictEqual(calculator.parseExpr("5*0"), 0);
    });

    it("should return 0.25 when the expression is 0.5 * 0.5", () => {
      assert.strictEqual(calculator.parseExpr("0.5*0.5"), 0.25);
    });
  });

  describe("Division Tests", () => {
    it("should return 0 when the expression is 0 / 5", () => {
      assert.strictEqual(calculator.parseExpr("0/5"), 0);
    });

    it("should return NaN when the expression is 0 / 0", () => {
      assert.ok(Number.isNaN(calculator.parseExpr("0/0")));
    });

    it("should return 0.33333 when the expression is 1 / 3", () => {
      assert.strictEqual(calculator.parseExpr("1/3").toFixed(5), "0.33333");
    });

    it("should return 2 when the expression is 6 / 3", () => {
      assert.strictEqual(calculator.parseExpr("6/3"), 2);
    });
  });

  describe("Complex Expressions", () => {
    it("should return 11 when the expression is 2 + 3 * 3 / (4 - 3)", () => {
      assert.strictEqual(calculator.parseExpr("2+3*3/(4-3)"), 11);
    });

    it("should return 19 when the expression is 3 + 8 / 2 * 4", () => {
      assert.strictEqual(calculator.parseExpr("3+8/2*4"), 19);
    });

    it("should return 4 when the expression is 3 + 8 / (2 * 4)", () => {
      assert.strictEqual(calculator.parseExpr("3+8/(2*4)"), 4);
    });

    it("should return 1 when the expression is (3 + 5) / (2 * 4)", () => {
      assert.strictEqual(calculator.parseExpr("(3+5)/(2*4)"), 1);
    });

    it("should return 5 when the expression is 1 + ((3 + 5) * 4 / (2 * 4))", () => {
      assert.strictEqual(calculator.parseExpr("1+((3+5)*4/(2*4))"), 5);
    });

    it("should return 5 when the expression is 1 + ((3 + 5) * (4 / (2 * 4)))", () => {
      assert.strictEqual(calculator.parseExpr("1+((3+5)*(4/(2*4)))"), 5);
    });
  });

  describe("Invalid Expressions", () => {
    it("should throw an error for invalid characters in the expression", () => {
      assert.throws(() => calculator.parseExpr("2^3"), /Unsupported token encountered/);
    });

    it("should throw an error for incomplete expressions like '3+'", () => {
      assert.throws(() => calculator.parseExpr("3+"), /Invalid expression/);
    });

    it("should throw an error for invalid operators like '+*3'", () => {
      assert.throws(() => calculator.parseExpr("+*3"), /Unsupported token encountered/);
    });

    it("should throw an error for mismatched parentheses", () => {
      assert.throws(() => calculator.parseExpr("(3+5)*4/(2*4"), /Invalid postfix expression/);
    });
  });
});
