// move to /workouts and other utils into /shared
// export from index
import { toAmrap } from "./amrap";
import { toRoundsForTime } from "./roundsForTime";
import { getRandomEl } from "./random";
import { toRounds } from "./rounds";
import { toInterval } from "./interval";

const WORKOUT_CATEGORY = {
  Interval: "interval",
  TimePriority: "timePriority",
  TaskPriority: "taskPriority",
  Mixed: "mixed",
};

const weightedCategoryMap = [
  [WORKOUT_CATEGORY.Interval, 2],
  [WORKOUT_CATEGORY.TimePriority, 4],
  [WORKOUT_CATEGORY.TaskPriority, 3],
  // bookends, buy-in, cash-out, 1rm, etc.
  [WORKOUT_CATEGORY.Mixed, 1],
];

const typesByCategoryMap = {
  [WORKOUT_CATEGORY.Interval]: ["interval"],
  [WORKOUT_CATEGORY.TimePriority]: ["amrap", "maxReps"],
  [WORKOUT_CATEGORY.TaskPriority]: ["roundsForTime"],
  [WORKOUT_CATEGORY.Mixed]: ["bookEnds", "buyIn", "cashOut", "withRepMax"],
};

const toMaxReps = () => console.log("toMaxReps");
const toBookEnds = () => console.log("toBookEnds");
const toBuyIn = () => console.log("toBuyIn");
const toCashOut = () => console.log("toCashOut");
const toWithRepMax = () => console.log("toWithRepMax");

const toGenerator = () => ({
  interval: (args) => toInterval(args),
  amrap: (args) => toAmrap(args),
  maxReps: (args) => toMaxReps(args),
  roundsForTime: (args) => toRoundsForTime(args),
  bookEnds: (args) => toBookEnds(args),
  buyIn: (args) => toBuyIn(args),
  cashOut: (args) => toCashOut(args),
  withRepMax: (args) => toWithRepMax(args),
});

const toGenerateWorkout = (timeDomainInMinutes = 5) => {
  const category = toRandomCategory();
  const type = getRandomEl(typesByCategoryMap[category]);
  const rounds =
    category === WORKOUT_CATEGORY.Interval
      ? undefined
      : toRounds(timeDomainInMinutes);
  return toGenerator()[type]({ timeDomainInMinutes, rounds });
};

const toRandomCategory = () => {
  const weightedTypeArray = weightedCategoryMap.reduce((acc, curr) => {
    return acc.concat(Array(curr[1]).fill(curr[0]));
  }, []);
  return getRandomEl(weightedTypeArray);
};

export { toGenerateWorkout };
