/* eslint-disable linebreak-style */
const assert = require("assert");
const calculator = require("../calculator");


describe("Calculator", () => {
  describe("TestAddExpression()", () => {
    it("should return 10 when the expression is 5 + 5", () => {
      assert.equal(calculator.parseExpr("5+5"), 10);
    });

    it("should return 0 when the expression is 0 + 0", () => {
      assert.equal(calculator.parseExpr("0+0"), 0);
    });

    it("should return 2000000 when the expression is 1000000 + 1000000", () => {
      assert.equal(calculator.parseExpr("1000000+1000000"), 2000000);
    });

    it("should return empty string when the expression is a+b+c", () => {
      assert.equal(calculator.parseExpr("a+b+c"), "");
    });

    it("should return empty string when the expression is 33++4", () => {
      assert.equal(calculator.parseExpr("33++4"), "");
    });

    it("should return 30 when the expression is 1 0 + 10 + 5+5", () => {
      assert.equal(calculator.parseExpr("1 0 + 10 + 5+5"), 30);
    });
  });

  describe("TestSubtractExpression()", () => {
    it("should return 0 when the expression is 5 - 5", () => {
      assert.equal(calculator.parseExpr("5-5"), 0);
    });

    it("should return 0 when the expression is 0 - 0", () => {
      assert.equal(calculator.parseExpr("0-0"), 0);
    });

    it("should return 1 when the expression is 1 - 0", () => {
      assert.equal(calculator.parseExpr("1-0"), 1);
    });

    it("should return 1 when the expression is 1", () => {
      assert.equal(calculator.parseExpr("1"), 1);
    });
  });
});
