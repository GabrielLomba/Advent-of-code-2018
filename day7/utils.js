const fs = require("fs");

const INPUT_REGEX = /Step (\w) must be finished before step (\w) can begin./;

function getInput() {
  const rawInput = fs.readFileSync(`${__dirname}/input.txt`);

  return rawInput.toString().split("\n");
}

function getStepsAndDependencies() {
  const instructions = getInput();

  const dependencyMap = new Map();

  const steps = new Set();
  for (const instruction of instructions) {
    const [, requisite, step] = INPUT_REGEX.exec(instruction);
    steps.add(requisite);
    steps.add(step);

    if (dependencyMap.has(step)) {
      dependencyMap.get(step).push(requisite);
    } else {
      dependencyMap.set(step, [requisite]);
    }
  }

  return { steps, dependencyMap };
}

function insertOrdered(steps, step) {
  let max = steps.length;
  let min = 0;
  let idx;

  while (true) {
    idx = Math.floor((max + min) / 2);

    const greaterThanPreviousElement = idx === 0 || step > steps[idx - 1];
    const smallerThanCurrentElement = idx >= steps.length || step < steps[idx];

    if (greaterThanPreviousElement && smallerThanCurrentElement) {
      steps.splice(idx, 0, step);
      break;
    } else if (greaterThanPreviousElement) {
      min = idx + 1;
    } else {
      max = idx - 1;
    }
  }
}

module.exports = {
  getStepsAndDependencies,
  insertOrdered,
};
