import { getLowRange, getMidRange, getHighRange } from "./range";
import { getRandomEl, toRandomFromRange } from "./random";

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

/**
 * ROUNDS
 * -- time input: 12 mins --> 720 sec
 * -- 2 rounds
 * -- [W, G] --> []
 * -- kbs(5 sec), box jump(10 sec)
 * -- 720 sec / 2 rounds --> 360sec per round
 * -- rest time deduction per round: 30 sec --> 330 sec per round
 * -- [50%, 50%] --> [165s, 165s] --> [33, 16] --> [33 KBS, 16 Box Jump]
 * -- round down (maybe?) to make pretty number
 */

// [low, mid, high] number of rounds
const weights = [10, 80, 10];

// ranges = [low, mid, high];
const toWeightedRoundsArray = (ranges) =>
  ranges.reduce((acc, curr, i) => {
    return acc.concat(Array(weights[i]).fill(curr));
  }, []);

const toRangesArray = (timeInMins) => {
  return [
    getLowRange(timeInMins),
    getMidRange(timeInMins),
    getHighRange(timeInMins),
  ];
};

const toRandomRangeFromRanges = (rangesArray) => {
  const [lowRange, midRange, highRange] = rangesArray;
  return [
    toRandomFromRange(lowRange),
    toRandomFromRange(midRange),
    toRandomFromRange(highRange),
  ];
};

const toRounds = (timeInMins) => {
  // an array of ranges [start, end] for each range
  const rangesArray = toRangesArray(timeInMins);

  // randomly choose a number from each range
  const ranges = toRandomRangeFromRanges(rangesArray);

  // construct weighted array
  const weightedArray = toWeightedRoundsArray(ranges);

  // randomly choose number (rounds) from weighted array
  return getRandomEl(weightedArray);
};

export { toRounds };
