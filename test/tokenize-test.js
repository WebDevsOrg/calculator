/* eslint-disable linebreak-style */
const assert = require("assert");
const { tokenize } = require("../tokenizer.js");

describe("Tokenizer", () => {
  describe("NegativeExp()", () => {
    it("should return TOKENS when the expression is -5 + 5", () => {
      const expect = ["-5", "+", "5"];
      const actual = tokenize("-5+5");
      assert.deepEqual(actual, expect);
    });

    it("should return TOKENS when the expression is -100 + ( - 50 + 40) ", () => {
      const expect = ["-100", "+", "(", "-50", "+", "40", ")"];
      const actual = tokenize("-100 + ( - 50 + 40)");
      assert.deepEqual(actual, expect);
    });

    it("should return TOKENS when the expression is -100.5 + ( - 50.5 + 40) ", () => {
      const expect = ["-100.5", "+", "(", "-50.5", "+", "40", ")"];
      const actual = tokenize("-100.5 + ( - 50.5 + 40)");
      assert.deepEqual(actual, expect);
    });
  });
});
