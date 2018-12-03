const fs = require("fs");

const INPUT_REGEX = /#\d+\s@\s(\d+),(\d+): (\d+)x(\d+)/;

function getInputData(entry) {
  const groups = INPUT_REGEX.exec(entry);
  return groups.map(Number);
}

function countOverlappingSquares(input) {
  let overlappingSquareInches = 0;
  const fabric = new Map();

  for (const entry of input) {
    const [, left, top, width, height] = getInputData(entry);

    for (let i = 0; i < width; ++i) {
      for (let j = 0; j < height; ++j) {
        const x = left + i;
        const y = top + j;

        const key = `${x}-${y}`;
        if (fabric.has(key)) {
          const previousCount = fabric.get(key);

          if (previousCount == 1) {
            ++overlappingSquareInches;
          }

          fabric.set(key, previousCount + 1);
        } else {
          fabric.set(key, 1);
        }
      }
    }
  }

  return overlappingSquareInches;
}

const rawInput = fs.readFileSync(`${__dirname}/input.txt`);

const parsedInput = rawInput.toString().split("\n");

console.log(countOverlappingSquares(parsedInput));
