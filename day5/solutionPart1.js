const { getInput, unitsReact } = require("./utils");

function findRemainingUnites(input) {
  const units = input.split("");

  let i = 1;
  while (i < units.length) {
    if (unitsReact(units[i - 1], units[i])) {
      units.splice(i - 1, 2);
      i = Math.max(1, i - 1);
    } else {
      ++i;
    }
  }

  return units.length;
}

console.log(findRemainingUnites(getInput()));
