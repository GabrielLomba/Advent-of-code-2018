const {
  GUARD_TYPE,
  FALLS_ASLEEP_TYPE,
  WAKES_UP_TYPE,
  getParsedInput
} = require("./inputParser");

function findBestGuardMinuteCombination() {
  const parsedInput = getParsedInput();

  const guardsDataMap = new Map();

  let lastFellAsleepMinute;
  let currentGuard;
  for (const entry of parsedInput) {
    switch (entry.type) {
      case GUARD_TYPE:
        currentGuard = entry.id;

        if (guardsDataMap.has(currentGuard)) {
          ++guardsDataMap.get(currentGuard).totalShifts;
        } else {
          guardsDataMap.set(currentGuard, { minutesAsleep: new Map(), totalShifts: 1 });
        }
        break;

      case FALLS_ASLEEP_TYPE:
        lastFellAsleepMinute = entry.minute;
        break;

      case WAKES_UP_TYPE:
        const { minutesAsleep } = guardsDataMap.get(currentGuard);
        for (let i = lastFellAsleepMinute; i < entry.minute; ++i) {
          const timesAsleep = minutesAsleep.get(i) || 0;
          minutesAsleep.set(i, timesAsleep + 1);
        }
        break;

      default:
        throw new Error(`Invalid entry type: ${type}`);
    }
  }

  let betterRatio = 0;
  let result;

  for (const [id, data] of guardsDataMap.entries()) {
    for (const [minute, asleepTimes] of data.minutesAsleep.entries()) {
      const ratio = asleepTimes / data.totalShifts;

      if (ratio > betterRatio) {
        betterRatio = ratio;
        result = id * minute;
      }
    }
  }

  return result;
}

console.log(findBestGuardMinuteCombination());
