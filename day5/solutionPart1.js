const { getInput, unitsReact } = require("./utils");

function findRemainingUnites(input) {
  const units = input.split("");

  for (let i = 1; i < units.length; ++i) {
    if (unitsReact(units[i - 1], units[i])) {
      units.splice(i - 1, 2);
      i = Math.max(0, i - 2);
    }
  }

  return units.length;
}

console.log(findRemainingUnites(getInput()));
