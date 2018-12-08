const { getInput } = require("./utils");

function findSum(tree, current) {
  let sum = 0;

  const childs = tree[current];
  const entries = tree[current + 1];

  let nextIdx = current + 2;
  for (let i = 0; i < childs; ++i) {
    const { sum: childSum, next } = findSum(tree, nextIdx);
    sum += childSum;
    nextIdx = next;
  }

  for (let i = 0; i < entries; ++i) {
    sum += tree[nextIdx];
    ++nextIdx;
  }

  return { sum, next: nextIdx };
}

function findMetaDataSum() {
  const { sum } = findSum(getInput(), 0);
  return sum;
}

console.log(findMetaDataSum());
