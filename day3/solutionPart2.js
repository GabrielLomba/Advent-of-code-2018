const fs = require("fs");

const INPUT_REGEX = /#(\d+)\s@\s(\d+),(\d+): (\d+)x(\d+)/;

function getInputData(entry) {
  const groups = INPUT_REGEX.exec(entry);
  return groups.map(Number);
}

function findNonOverlappingClaim(input) {
  const fabric = new Map();
  const candidates = new Set();

  for (const entry of input) {
    const [, id, left, top, width, height] = getInputData(entry);

    let nonOverlapping = true;
    for (let i = 0; i < width; ++i) {
      for (let j = 0; j < height; ++j) {
        const x = left + i;
        const y = top + j;

        const key = `${x}-${y}`;
        if (fabric.has(key)) {
          nonOverlapping = false;
          const previousCount = fabric.get(key);
          fabric.set(key, previousCount + 1);
        } else {
          fabric.set(key, 1);
        }
      }
    }

    if (nonOverlapping) {
      candidates.add({
        id,
        left,
        top,
        width,
        height
      });
    }
  }

  for (const candidate of candidates) {
    const { id, left, top, height, width } = candidate;

    let nonOverlapping = true;
    for (let i = 0; i < width; ++i) {
      for (let j = 0; j < height; ++j) {
        const x = left + i;
        const y = top + j;

        const key = `${x}-${y}`;
        if (fabric.get(key) >= 2) {
          nonOverlapping = false;
          break;
        }
      }

      if (!nonOverlapping) break;
    }

    if (nonOverlapping) {
      return id;
    }
  }

  return null;
}

const rawInput = fs.readFileSync(`${__dirname}/input.txt`);

const parsedInput = rawInput.toString().split("\n");

console.log(findNonOverlappingClaim(parsedInput));
