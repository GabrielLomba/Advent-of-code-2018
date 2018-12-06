const fs = require("fs");

function isLower(letter) {
  return letter == letter.toLowerCase();
}

function unitsReact(unit1, unit2) {
  return unit1.toLowerCase() == unit2.toLowerCase() &&
    (isLower(unit1) ? !isLower(unit2) : isLower(unit2));
}

function getInput() {
  const rawInput = fs.readFileSync(`${__dirname}/input.txt`);
  return rawInput.toString();
}

module.exports = {
  unitsReact,
  getInput,
};
