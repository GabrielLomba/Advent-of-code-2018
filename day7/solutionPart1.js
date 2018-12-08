const { getStepsAndDependencies, insertOrdered } = require("./utils");

function findStepOrder() {
  const { steps, dependencyMap } = getStepsAndDependencies();

  let stepOrder = "";
  const stepsReady = [];

  for (const step of steps) {
    if (!dependencyMap.has(step)) {
      // The first steps ready will not have any dependencies
      insertOrdered(stepsReady, step);
    }
  }

  while (stepOrder.length != steps.size) {
    const stepExecuted = stepsReady.shift();
    stepOrder += stepExecuted;

    for (const [step, dependencies] of dependencyMap.entries()) {
      const newDependencies = dependencies.filter(d => d != stepExecuted);

      if (newDependencies.length === 0) {
        dependencyMap.delete(step);
        insertOrdered(stepsReady, step);
      } else {
        dependencyMap.set(step, newDependencies);
      }
    }
  }

  return stepOrder;
}

console.log(findStepOrder());
