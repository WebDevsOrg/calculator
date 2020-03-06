/* eslint-disable no-use-before-define */

const { isNum, isOp, isParan } = require("./utility");

/**
 * Will tokenize and the input string in opertor and operand
 * @param {*} expr : string arithmetic expression
 * @returns : a list of operator-operand tokens
 */
exports.tokenize = (expr) => {
  const str = expr.replace(/\s/g, "");
  let s = "";
  const tokens = [];
  for (let index = 0; index < str.length; index += 1) {
    s += str[index];
    const peek = str[index + 1];

    if (isNum(s.trim()) && !isNum(peek) && peek !== ".") {
      tokens.push(s.trim());
      s = "";
    }

    if (isOp(s.trim()) && !isOp(peek)) {
      tokens.push(s.trim());
      s = "";
    }

    if (isParan(s.trim())) {
      tokens.push(s.trim());
      s = "";
    }
  }

  return fixSign(tokens);
};

/**
 * will identify negative values in tokens and prepare a new tokens list with negative numbers
 * Criteria:
 * if '-'ve operator is not followed by any number it will be a negative sign for the number
 * @param {*} tokens : parsed tokens
 */
function fixSign(tokens) {
  const mTokens = [];
  for (let i = 0; i < tokens.length; i += 1) {
    let token = tokens[i];
    if (token === "-") {
      if (i === 0 || (i > 0 && !isNum(tokens[i - 1]))) {
        i += 1;
        token = `-${tokens[i]}`;
      }
    }
    mTokens.push(token);
  }
  return mTokens;
}
