const { getInputData, getInitializedPlayerScores } = require("./utils");

function findWinningScore() {
  const { players, lastMarble } = getInputData();

  const playerScores = getInitializedPlayerScores(players);
  const marbles = [0];

  let currentMarble = 0;
  for (let i = 1; i <= lastMarble; ++i) {
    if (i % 23 === 0) {
      const currentPlayer = (i - 1) % players;

      if (currentMarble >= 7) {
        currentMarble -= 7;
      } else {
        currentMarble = marbles.length - (7 - currentMarble);
      }

      const removedMarbleValue = marbles.splice(currentMarble, 1)[0];
      playerScores[currentPlayer] += i + removedMarbleValue;
    } else {
      const newMarbleIdx = (currentMarble + 2) % marbles.length;

      if (newMarbleIdx === 0) {
        const lastIdx = marbles.length - 1;

        marbles[lastIdx] /= 100;
        marbles.push(i * 100);

        currentMarble = lastIdx;
      } else {
        marbles.splice(newMarbleIdx, 0, i);

        currentMarble = newMarbleIdx;
      }
    }
  }

  let maxScore = 0;
  for (const score of playerScores) {
    maxScore = Math.max(maxScore, score);
  }

  return maxScore;
}

console.log(findWinningScore());