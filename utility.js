
const operators = ["=", "+", "-", "*", "/", ">", "<", ">=", "<=", "==", "!="];
const paranthesis = ["(", ")"];

exports.operators = operators;
exports.paranthesis = paranthesis;

/**
 * Checks whether the input is a paranthesis
 * @param {*} v : string to be check against
 */
exports.isNum = (v) => !isNaN(parseFloat(v)) && isFinite(v);

/**
 * Checks whether the input is a paranthesis
 * @param {*} v : string to be check against
 */
exports.isOp = (v) => operators.includes(v);

/**
 * Checks whether the input is a paranthesis
 * @param {*} v : string to be check against
 */
exports.isParan = (v) => paranthesis.includes(v);
