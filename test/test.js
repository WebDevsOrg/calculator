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
      assert.equal(calculator.parseExpr("a+b+c"), "a+b+c");
    });

    it("should return empty string when the expression is 33++4", () => {
      assert.equal(calculator.parseExpr("33++4"), "37");
    });

    it("should return 30 when the expression is 1 0 + 10 + 5+5", () => {
      assert.equal(calculator.parseExpr("  1 0 + 10 + 5+  5  "), 30);
    });

    it("should return 1 when the expression is 1+", () => {
      assert.equal(calculator.parseExpr("1+"), 1);
    });

    it("should return error when the expression is +", () => {
      assert.equal(calculator.parseExpr("+"), "+");
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

  describe("TestMultiplyExpression()", () => {
    it("should return 0 when the expression is 0 * 0", () => {
      assert.equal(calculator.parseExpr("0*0"), 0);
    });

    it("should return 0 when the expression is 1 * 0", () => {
      assert.equal(calculator.parseExpr("1*0"), 0);
    });

    it("should return 1 when the expression is 1 * 1", () => {
      assert.equal(calculator.parseExpr("1 * 1"), 1);
    });

    it("should return 4.4 when the expression is 2.2 * 2", () => {
      assert.equal(calculator.parseExpr("2.2*2"), 4.4);
    });

    it("should return .25 when the expression is .5 * .5", () => {
      assert.equal(calculator.parseExpr(".5*.5"), .25);
    });

    it("should return 1 when the expression is .5 * 2", () => {
      assert.equal(calculator.parseExpr(".5*2"), 1);
    });

    it("should return 25 when the expression is 5 * 5", () => {
      assert.equal(calculator.parseExpr("5*5"), 25);
    });

    it("should return 100 when the expression is 10 * 10", () => {
      assert.equal(calculator.parseExpr("10*10"), 100);
    });

    it("should return 100 when the expression is 25 * 4", () => {
      assert.equal(calculator.parseExpr("25*4"), 100);
    });

    it("should return 10000 when the expression is 100 * 100", () => {
      assert.equal(calculator.parseExpr("100*100"), 10000);
    });

    it("should return 1000000 when the expression is 1000 * 1000", () => {
      assert.equal(calculator.parseExpr("1000*1000"), 1000000);
    });
    it("should return 1234567900987654400 when the expression is 1111111111 * 1111111111", () => {
      assert.equal(calculator.parseExpr("1111111111*1111111111"), 1234567900987654400);
    });

    it("should return 30864197524691358000 when the expression is 5555555555 * 5555555555", () => {
      assert.equal(calculator.parseExpr("5555555555*5555555555"), 30864197524691358000);
    });

    it("should return 25 when the expression is 10 * 5 - 25", () => {
      assert.equal(calculator.parseExpr("10*5 - 25"), 25);
    });

    it("should return 0 when the expression is 10 * 100 - 1000", () => {
      assert.equal(calculator.parseExpr("10 * 100 - 1000"), 0);
    });

    it("should return 50 when the expression is 10 * 10 + 50 - 100", () => {
      assert.equal(calculator.parseExpr("10 * 10 + 50 - 100"), 50);
    });

    it("should return 3125 when the expression is 5 * 5 * 5 * 5 * 5", () => {
      assert.equal(calculator.parseExpr("5 * 5 * 5 * 5 * 5"), 3125);
    });

    it("should return 980 when the expression is 10 * 10 * 10 - 20", () => {
      assert.equal(calculator.parseExpr("10 * 10 * 10 - 20"), 980);
    });
  });
});
