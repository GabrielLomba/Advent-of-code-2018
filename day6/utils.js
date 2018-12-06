const fs = require("fs");

function printDistanceMatrix(matrix) {
  for (const row of matrix) {
    console.log(row.map(el => el.id).join(" "));
  }
}

function getPointsAndCoordinatesRange(input) {
  let smallestX = Infinity, biggestX = -Infinity;
  let smallestY = Infinity, biggestY = -Infinity;

  for (const coordinates of input) {
    smallestX = Math.min(smallestX, coordinates[0]);
    biggestX = Math.max(biggestX, coordinates[0]);
    smallestY = Math.min(smallestY, coordinates[1]);
    biggestY = Math.max(biggestY, coordinates[1]);
  }

  const points = input.map(([x, y], idx) => ({
    id: idx,
    x: x - smallestX,
    y: y - smallestY,
  }));

  return {
    points,
    xDiff: biggestX - smallestX,
    yDiff: biggestY - smallestY,
  };
}

function getCoordinates(str) {
  return str.split(",").map(n => Number(n.trim()));
}

function getInput() {
  const rawInput = fs.readFileSync(`${__dirname}/input.txt`);
  return rawInput.toString().split("\n").map(getCoordinates);
}

module.exports = {
  getInput,
  printDistanceMatrix,
  getPointsAndCoordinatesRange,
};
