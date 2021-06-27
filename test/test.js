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

    it("should return 3 when the expression is +3", () => {
      assert.strictEqual(claculator.parseExpr("+3"), 3);
    });

    it("should return 3 when the expression is +*3", () => {
      assert.strictEqual(claculator.parseExpr("+*3"), 3);
    });

    it("should return 3 when the expression is 3+", () => {
      assert.strictEqual(claculator.parseExpr("3+"), 3);
    });


    it("should return 23 + 0.23 when the expression is 23 + 0.23", () => {
      assert.strictEqual(claculator.parseExpr("23 + 0.23").toFixed(2), "23.23");
    });

    it("should return 2^3 when the expression is 2^3", () => {
      assert.strictEqual(claculator.parseExpr("2^3"), "2^3");
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

    it("should return 0.3 when the expression is 0.5 - 0.2", () => {
      assert.strictEqual(claculator.parseExpr("0.5 - 0.2"), 0.3);
    });

    it("should return -1 when the expression is -3 + 2", () => {
      assert.strictEqual(claculator.parseExpr("-3 + 2"), -1);
    });

    it("should return -3 when the expression is -3", () => {
      assert.strictEqual(claculator.parseExpr("-3"), -3);
    });
  });

  describe("TestDivideExpression()", () => {
    it("should return 0 when the expression is 0 / 5", () => {
      assert.strictEqual(claculator.parseExpr("0/5"), 0);
    });

    it("result is undefined and should return 0 when the expression is 0 - 0", () => {
      assert.strictEqual(claculator.parseExpr("0/0"), 0);
    });

    it("should return 0.33333 when expression is 1/3", () => {
      // toFixed() returns a string
      assert.strictEqual(claculator.parseExpr("1/3").toFixed(5), "0.33333");
    });
  });
});
