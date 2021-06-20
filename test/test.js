/* eslint-disable linebreak-style */
const assert = require("assert");
const claculator = require("../calculator");


describe("Calculator", () => {
  describe("TestAddExpression()", () => {
    it("should return 10 when the expression is 5 + 5", () => {
      assert.strictEqual(claculator.parseExpr("5+5"), 10);
    });

    it("should return 0 when the expression is 0 + 0", () => {
      assert.strictEqual(claculator.parseExpr("0+0"), 0);
    });

    it("should return 2000000 when the expression is 1000000 + 1000000", () => {
      assert.strictEqual(claculator.parseExpr("1000000+1000000"), 2000000);
    });
  });

  describe("TestSubtractExpression()", () => {
    it("should return 0 when the expression is 5 - 5", () => {
      assert.strictEqual(claculator.parseExpr("5-5"), 0);
    });

    it("should return 0 when the expression is 0 - 0", () => {
      assert.strictEqual(claculator.parseExpr("0-0"), 0);
    });

    it("should return 1 when the expression is 1 - 0", () => {
      assert.strictEqual(claculator.parseExpr("1-0"), 1);
    });
  });
});
