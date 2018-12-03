const fs = require("fs");

function findCommonsLettersBetweenCorrectBoxes(input) {
  for (const id1 of input) {
    for (const id2 of input) {
      let diff = 0;
      let diffIdx = 0;
      let i = 0;

      while (i < Math.min(id1.length, id2.length) && diff <= 1) {
        if (id1[i] != id2[i]) {
          ++diff;
          diffIdx = i;
        }

        ++i;
      }

      if (diff == 1) {
        return id1.slice(0, diffIdx) + id1.slice(diffIdx + 1);
      }
    }
  }
}

const rawInput = fs.readFileSync(`${__dirname}/input.txt`);

const parsedInput = rawInput.toString().split("\n");

console.log(findCommonsLettersBetweenCorrectBoxes(parsedInput));
