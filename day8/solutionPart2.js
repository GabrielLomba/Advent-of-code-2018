const { getInput } = require("./utils");

function findNodeValue(tree, current) {
  let value = 0;
  const childs = tree[current];
  const entries = tree[current + 1];

  let nextIdx = current + 2;
  const childValues = [];
  for (let i = 0; i < childs; ++i) {
    const { value: childValue, next } = findNodeValue(tree, nextIdx);
    childValues.push(childValue);
    nextIdx = next;
  }

  for (let i = 0; i < entries; ++i) {
    const entryVal = tree[nextIdx];

    if (childs === 0) {
      value += entryVal;
    } else if (entryVal <= childs) {
      value += childValues[entryVal - 1];
    }

    ++nextIdx;
  }

  return { value, next: nextIdx };
}

function findRootNodeValue() {
  const { value } = findNodeValue(getInput(), 0);
  return value;
}

console.log(findRootNodeValue());
