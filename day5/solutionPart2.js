const { getInput, unitsReact } = require("./utils");

function findShortestPolymer(input) {
  const units = input.split("");

  const unitsSet = new Set();
  for (const unit of units) {
    unitsSet.add(unit.toLowerCase());
  }

  let smallestPolymer = Infinity;
  for (const unit of unitsSet) {
    const newUnits = units.slice().filter(u => u != unit && u != unit.toUpperCase());

    let i = 1;
    while (i < newUnits.length) {
      if (unitsReact(newUnits[i - 1], newUnits[i])) {
        newUnits.splice(i - 1, 2);
        i = Math.max(1, i - 1);
      } else {
        ++i;
      }
    }

    smallestPolymer = Math.min(smallestPolymer, newUnits.length);
  }

  return smallestPolymer;
}

console.log(findShortestPolymer(getInput()));
