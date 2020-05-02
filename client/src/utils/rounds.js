import { getRandomEl, toRandomFromRange } from "./random";
import { getLowRange, getMidRange, getHighRange } from "./range";

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

const toRounds = (mins) => {
  // an array of ranges [start, end] for each range
  const rangesArray = toRangesArray(mins);
  // randomly choose a number from each range
  const ranges = toRandomRangeFromRanges(rangesArray);
  // construct weighted array
  const weightedArray = toWeightedRoundsArray(ranges);
  // randomly choose number (rounds) from weighted array
  return getRandomEl(weightedArray);
};

export { toRounds };
