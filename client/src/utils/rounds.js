import { toFormattedWorkout } from "./format";
import { toRandomIntensity, INTENSITY } from "./intensity";
import { toRandomNumberOfMovements, toMovementsArray } from "./movements";
import { getRandomEl, toRandomFromRange } from "./random";
import { getLowRange, getMidRange, getHighRange } from "./range";
import { toRepsWithLoadOrHeight } from "./reps";
import { toSecondsPerRound } from "./time";
import { SCORE_TYPE, WORKOUT_STYLE } from "../types";

/**
 * ROUNDS
 * -- time domain input from user
 * -- choose number of rounds appropriate to workout duration
 * -- choose number of movements
 * -- construct movement type array of M, W or G
 * -- use weighted percentage to choose reps per movement based on sec per rep
 * -- choose random movements
 * -- choose number of rounds appropriate to duration
 * -- divide time domain (in sec) into rounds (in sec)
 * -- account for rest time
 * -- choose reps per movement based on sec per rep
 * -- round down to make pretty number
 */

// [low, mid, high] number of rounds
const weights = [60, 30, 10];

// ranges = [low, mid, high];
const toWeightedRoundsArray = (ranges) =>
  ranges.reduce((acc, curr, i) => {
    return acc.concat(Array(weights[i]).fill(curr));
  }, []);

const toRangesArray = (mins) => {
  return [getLowRange(mins), getMidRange(mins), getHighRange(mins)];
};

const toRandomRangeFromRanges = (rangesArray) => {
  const [lowRange, midRange, highRange] = rangesArray;
  return [
    toRandomFromRange(lowRange),
    toRandomFromRange(midRange),
    toRandomFromRange(highRange),
  ];
};

const toRandomRounds = (mins) => {
  // an array of ranges [start, end] for each range
  const rangesArray = toRangesArray(mins);
  // randomly choose a number from each range
  const ranges = toRandomRangeFromRanges(rangesArray);
  // construct weighted array
  const weightedArray = toWeightedRoundsArray(ranges);
  // randomly choose number (rounds) from weighted array
  return getRandomEl(weightedArray);
};

const restByIntensityMap = (seconds) => ({
  [INTENSITY.Easy]: Math.round(seconds * 0.4),
  [INTENSITY.Moderate]: Math.round(seconds * 0.3),
  [INTENSITY.Hard]: Math.round(seconds * 0.2),
});

const toRounds = (timeDomainInMinutes) => {
  const rounds = toRandomRounds(timeDomainInMinutes);
  const intensity = toRandomIntensity();
  const numberOfMovements = toRandomNumberOfMovements(timeDomainInMinutes);
  const movements = toMovementsArray(numberOfMovements);
  const secondsPerRound = toSecondsPerRound(timeDomainInMinutes, rounds);
  const timeToDeduct = restByIntensityMap(secondsPerRound)[intensity];
  const secondsPerMovementPerRd = Math.round(
    (secondsPerRound - timeToDeduct) / numberOfMovements
  );

  const repsWithLoadOrHeight = toRepsWithLoadOrHeight(
    intensity,
    movements,
    secondsPerMovementPerRd,
    timeDomainInMinutes
  );

  return {
    formattedWorkout: toFormattedWorkout(repsWithLoadOrHeight),
    intensity,
    movements,
    name: "Rounds for Time",
    rounds,
    reps: repsWithLoadOrHeight,
    scoreStandard: toScoreStandard(rounds, timeDomainInMinutes),
    scoreType: SCORE_TYPE.Task,
    style: WORKOUT_STYLE.Amrap,
    time: timeDomainInMinutes,
    timeCap: timeDomainInMinutes,
  };
};

const toScoreStandard = (rounds, timeDomainInMinutes) =>
  `${rounds} Rounds For Time *${timeDomainInMinutes} minute time cap`;

export { toRandomRounds, toRounds };
