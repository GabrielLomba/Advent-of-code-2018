const { getInput, getPointsAndCoordinatesRange } = require("./utils");

const MAX_DISTANCE = 10000;

function findSafeRegionSize(input) {
  const {
    points,
    xDiff,
    yDiff,
  } = getPointsAndCoordinatesRange(input);

  let safeRegionSize = 0;
  for (let i = 0; i <= xDiff; ++i) {
    for (let j = 0; j <= yDiff; ++j) {
      let distanceSum = 0;

      for (let k = 0; k < points.length && distanceSum < MAX_DISTANCE; ++k) {
        distanceSum += Math.abs(points[k].x - i) + Math.abs(points[k].y - j);
      }

      if (distanceSum < MAX_DISTANCE) {
        ++safeRegionSize;
      }
    }
  }

  return safeRegionSize;
}

console.log(findSafeRegionSize(getInput()));
