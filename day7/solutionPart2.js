const { getStepsAndDependencies, insertOrdered } = require("./utils");

const BASE_DURATION = 60;
const NUM_WORKERS = 5;

function getInitializedWorkers() {
  const workers = [];

  for (let i = 0; i < NUM_WORKERS; ++i) {
    workers.push({
      idle: true,
      step: null,
      end: Infinity,
      executeStep: function (step, start) {
        if (step) {
          this.idle = false;
          this.step = step;
          this.end = start + calculateDuration(step);
        }
      },
      clearStep: function () {
        this.idle = true;
        this.step = null;
        this.end = Infinity;
      }
    })
  }

  return workers;
}

function calculateDuration(step) {
  return BASE_DURATION + step.codePointAt(0) - 65;
}

function findStepsDuration() {
  const { steps, dependencyMap } = getStepsAndDependencies();

  let stepsExecuted = 0;
  let timeElapsed = 0;

  const stepsReadyToExecute = [];
  const workers = getInitializedWorkers();

  for (const step of steps) {
    if (!dependencyMap.has(step)) {
      // The first steps ready will not have any dependencies
      insertOrdered(stepsReadyToExecute, step);
    }
  }

  while (stepsExecuted != steps.size) {
    let nextStop = Infinity;
    let isNextStopNextTick = false;

    const stepsFinished = [];

    for (const worker of workers) {
      if (worker.idle) {
        const stepToExecute = stepsReadyToExecute.shift();
        worker.executeStep(stepToExecute, timeElapsed);
      } else if (worker.end === timeElapsed) {
        stepsFinished.push(worker.step);
        worker.clearStep();
        isNextStopNextTick = true;
      }

      nextStop = Math.min(nextStop, worker.end);
    }

    if (isNextStopNextTick) {
      ++timeElapsed;
    } else {
      timeElapsed = nextStop;
    }

    if (stepsFinished.length) {
      stepsExecuted += stepsFinished.length;

      for (const [step, dependencies] of dependencyMap.entries()) {
        const newDependencies = dependencies.filter(d => !stepsFinished.includes(d));

        if (newDependencies.length === 0) {
          dependencyMap.delete(step);
          insertOrdered(stepsReadyToExecute, step);
        } else {
          dependencyMap.set(step, newDependencies);
        }
      }
    }
  }

  return timeElapsed;
}

console.log(findStepsDuration());
