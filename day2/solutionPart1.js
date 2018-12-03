const fs = require("fs");

function calculateIdChecksum(input) {
  let contains2Letters = 0;
  let contains3Letters = 0;

  for (const id of input) {
    const letterFreq = new Map();

    for (const letter of id) {
      const previousFreq = letterFreq.get(letter) || 0;
      letterFreq.set(letter, previousFreq + 1);
    }

    const frequencies = [...letterFreq.values()];

    let found2 = false;
    let found3 = false;
    let i = 0;

    while (i < frequencies.length && !(found2 && found3)) {
      found2 = found2 || frequencies[i] == 2;
      found3 = found3 || frequencies[i] == 3;
      ++i;
    }

    if (found2) ++contains2Letters;
    if (found3) ++contains3Letters;
  }

  return contains2Letters * contains3Letters;
}

const rawInput = fs.readFileSync(`${__dirname}/input.txt`);

const parsedInput = rawInput.toString().split("\n");

console.log(calculateIdChecksum(parsedInput));
