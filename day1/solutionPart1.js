const fs = require("fs");

function calculateFinalFrequency(input) {
  let freq = 0;

  for (const changes of input) {
    freq += Number(changes);
  }

  return freq;
}

const rawInput = fs.readFileSync(`${__dirname}/inputPart1.txt`);

const parsedInput = rawInput.toString().split("\n");

console.log(calculateFinalFrequency(parsedInput));
