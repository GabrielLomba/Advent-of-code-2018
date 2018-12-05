const fs = require("fs");

const DATE_TIME_REGEX = /\[(\d\d\d\d)-(\d\d)-(\d\d)\s(\d\d):(\d\d)\]/;
const GUARD_ID_REGEX = /#(\d+)\s/;

const GUARD_TYPE = 0;
const FALLS_ASLEEP_TYPE = 1;
const WAKES_UP_TYPE = 2;

function getEntryType(entry) {
  if (entry.indexOf("Guard") != -1) {
    return GUARD_TYPE;
  } else if (entry.indexOf("falls") != -1) {
    return FALLS_ASLEEP_TYPE;
  } else {
    return WAKES_UP_TYPE;
  }
}

function buildDateFromEntry(entry) {
  const { year, month, date, hour, minute } = entry;

  return new Date(year, month, date, hour, minute);
}

function getParsedInput(input) {
  const parsedInput = input.map(entry => {
    const groups = DATE_TIME_REGEX.exec(entry);
    const [, year, month, date, hour, minute] = groups.map(Number);
    const type = getEntryType(entry);
    const id = type == GUARD_TYPE ? GUARD_ID_REGEX.exec(entry)[1] : null;

    return {
      id,
      type,
      year,
      month,
      date,
      hour,
      minute
    }
  })

  return parsedInput.sort((a, b) => {
    const aDate = buildDateFromEntry(a);
    const bDate = buildDateFromEntry(b);

    return aDate.getTime() - bDate.getTime();
  });
}

function findMostAsleepGuardMinuteCombination(input) {
  const parsedInput = getParsedInput(input);

  const guardsDataMap = new Map();

  let lastFellAsleepMinute;
  let currentGuard;
  for (const entry of parsedInput) {
    switch (entry.type) {
      case GUARD_TYPE:
        currentGuard = entry.id;

        if (guardsDataMap.has(currentGuard)) {
          ++guardsDataMap.get(currentGuard).totalTimes;
        } else {
          guardsDataMap.set(currentGuard, { minutesAsleep: new Map(), totalTimes: 1, totalMinutesAsleep: 0 });
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

  const sortedGuardsData = [...guardsDataMap.entries()].sort(([, aData], [, bData]) =>
    bData.totalMinutesAsleep - aData.totalMinutesAsleep
  );

  const [guardId, data] = sortedGuardsData[0];

  let maxAsleepTimes = 0;
  let result;
  for (const [minute, asleepTimes] of data.minutesAsleep.entries()) {
    if (asleepTimes > maxAsleepTimes) {
      maxAsleepTimes = asleepTimes;
      result = guardId * minute;
    }
  }

  return result;
}

const rawInput = fs.readFileSync(`${__dirname}/input.txt`);

const parsedInput = rawInput.toString().split("\n");

console.log(findMostAsleepGuardMinuteCombination(parsedInput));
