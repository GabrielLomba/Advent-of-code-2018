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

module.exports = {
  GUARD_TYPE,
  FALLS_ASLEEP_TYPE,
  WAKES_UP_TYPE,
  getParsedInput: function () {
    const rawInput = fs.readFileSync(`${__dirname}/input.txt`);

    const parsedInput = rawInput.toString().split("\n")
      .map(entry => {
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
      });

    return parsedInput.sort((a, b) => {
      const aDate = buildDateFromEntry(a);
      const bDate = buildDateFromEntry(b);

      return aDate.getTime() - bDate.getTime();
    });
  }
};
