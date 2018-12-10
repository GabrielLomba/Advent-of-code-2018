const fs = require("fs");

const INPUT_REGEX = /(\d+) players; last marble is worth (\d+) points/

function getInputData() {
  const rawInput = fs.readFileSync(`${__dirname}/input.txt`);

  const [, players, lastMarble] = INPUT_REGEX.exec(rawInput);

  return {
    players: Number(players),
    lastMarble: Number(lastMarble),
  };
}

function getInitializedPlayerScores(players) {
  const scores = [];
  for (let i = 0; i < players; ++i) {
    scores.push(0);
  }

  return scores;
}

module.exports = {
  getInputData,
  getInitializedPlayerScores,
};
