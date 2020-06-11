import { WORKOUT_TYPES } from "../types";
import { toAmrap } from "./amrap";
import { toRounds } from "./rounds";
import { toRoundsForTime } from "./roundsForTime";
import { toRandomWeighted } from "./weighted";

const weightedWorkoutTypes = [
  [WORKOUT_TYPES.Amrap, 6],
  [WORKOUT_TYPES.RoundsForTime, 4],
];

const toGenerator = {
  amrap: (args) => toAmrap(args),
  roundsForTime: (args) => toRoundsForTime(args),
};

const toGenerateWorkout = (minutes = 5) => {
  const type = toRandomWeighted(weightedWorkoutTypes);

  return toGenerator[type]({
    minutes,
    rounds: toRounds(minutes),
    type,
  });
};

export { toGenerateWorkout };
