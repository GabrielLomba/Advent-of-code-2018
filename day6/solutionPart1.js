const { getInput, getPointsAndCoordinatesRange } = require("./utils");

function buildDistanceMatrix(xDiff, yDiff, points) {
  const matrix = [];
  for (const point of points) {
    const { id, x, y } = point;

    for (let i = 0; i <= xDiff; ++i) {

      if (!matrix[i]) {
        matrix[i] = [];
      }

      for (let j = 0; j <= yDiff; ++j) {
        const distance = Math.abs(x - i) + Math.abs(y - j);

        if (matrix[i][j]) {
          if (matrix[i][j].distance == distance) {
            // Set id to -1 so that it does not match with any given id
            // when there are multiple closest points
            matrix[i][j].id = -1;
          } else if (matrix[i][j].distance > distance) {
            matrix[i][j] = { id, distance };
          }
        } else {
          matrix[i][j] = { id, distance };
        }
      }
    }
  }

  return matrix;
}

function getPointsWithFiniteArea(matrix, points, xDiff, yDiff) {
  const edgeClosePoints = new Set();

  let i = 0;
  const max = Math.max(xDiff, yDiff);
  while (i < max) {
    if (i <= yDiff) {
      edgeClosePoints.add(matrix[0][i].id);
      edgeClosePoints.add(matrix[xDiff][i].id);
    }

    if (i <= xDiff) {
      edgeClosePoints.add(matrix[i][0].id);
      edgeClosePoints.add(matrix[i][yDiff].id);
    }

    ++i;
  }

  return points.filter(p => !edgeClosePoints.has(p.id));
}

function findLargestFiniteArea(input) {
  const {
    points,
    xDiff,
    yDiff,
  } = getPointsAndCoordinatesRange(input);

  const matrix = buildDistanceMatrix(xDiff, yDiff, points);

  const pointsWithFiniteArea = getPointsWithFiniteArea(matrix, points, xDiff, yDiff);

  const areaMap = pointsWithFiniteArea.reduce((map, point) => {
    map.set(point.id, 0);
    return map;
  }, new Map());

  for (let i = 1; i < xDiff; ++i) {
    for (let j = 1; j < yDiff; ++j) {
      const closestPoint = matrix[i][j];

      if (areaMap.has(closestPoint.id)) {
        areaMap.set(closestPoint.id, areaMap.get(closestPoint.id) + 1);
      }
    }
  }

  let maxArea = 0;
  for (const area of areaMap.values()) {
    maxArea = Math.max(maxArea, area);
  }

  return maxArea;
}

console.log(findLargestFiniteArea(getInput()));
