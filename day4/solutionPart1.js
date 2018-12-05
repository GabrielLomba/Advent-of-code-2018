const {
  GUARD_TYPE,
  FALLS_ASLEEP_TYPE,
  WAKES_UP_TYPE,
  getParsedInput
} = require("./inputParser");

function findMostAsleepGuardMinuteCombination() {
  const parsedInput = getParsedInput();

  const guardsDataMap = new Map();

  let lastFellAsleepMinute;
  let currentGuard;
  for (const entry of parsedInput) {
    switch (entry.type) {
      case GUARD_TYPE:
        currentGuard = entry.id;

        if (!guardsDataMap.has(currentGuard)) {
          guardsDataMap.set(currentGuard, { minutesAsleep: new Map(), totalMinutesAsleep: 0 });
        }
        break;

      case FALLS_ASLEEP_TYPE:
        lastFellAsleepMinute = entry.minute;
        break;

      case WAKES_UP_TYPE:
        const data = guardsDataMap.get(currentGuard);
        data.totalMinutesAsleep += entry.minute - lastFellAsleepMinute;
        for (let i = lastFellAsleepMinute; i < entry.minute; ++i) {
          const timesAsleep = data.minutesAsleep.get(i) || 0;
          data.minutesAsleep.set(i, timesAsleep + 1);
        }
        break;

      default:
        throw new Error(`Invalid entry type: ${type}`);
    }
  }

  let mostAsleepGuard;
  for (const [id, data] of guardsDataMap.entries()) {
    if (!mostAsleepGuard || data.totalMinutesAsleep > mostAsleepGuard.totalMinutesAsleep) {
      mostAsleepGuard = Object.assign({ id }, data);
    }
  }

  const { id, minutesAsleep } = mostAsleepGuard;

  let maxAsleepTimes = 0;
  let result;
  for (const [minute, asleepTimes] of minutesAsleep.entries()) {
    if (asleepTimes > maxAsleepTimes) {
      maxAsleepTimes = asleepTimes;
      result = id * minute;
    }
  }

  return result;
}

console.log(findMostAsleepGuardMinuteCombination());
