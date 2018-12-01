const fs = require("fs");

function findFirstRepeatedFrequency(input) {
  let freq = 0;

  const seenFreqs = new Set();

  let i = 0;
  while (!seenFreqs.has(freq)) {
    seenFreqs.add(freq);

    freq += Number(input[i]);
    i = (i + 1) % input.length;
  }

  return freq;
}

const rawInput = fs.readFileSync(`${__dirname}/inputPart2.txt`);

const parsedInput = rawInput.toString().split("\n");

console.log(findFirstRepeatedFrequency(parsedInput));
