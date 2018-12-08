const fs = require("fs");

function getInput() {
  const rawInput = fs.readFileSync(`${__dirname}/input.txt`);

  return rawInput.toString().split(" ").map(Number);
}

module.exports = {
  getInput,
};
