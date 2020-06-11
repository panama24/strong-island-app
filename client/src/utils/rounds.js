import { getRandomEl, toRandomFromRange } from "./random";
import { getLowRange, getMidRange, getHighRange } from "./range";

const WEIGHTS_BY_RANGE = [60, 30, 10];

// ranges = [low, mid, high];
const toWeightedRoundsArray = (ranges) =>
  ranges.reduce((acc, curr, i) => {
    return acc.concat(Array(WEIGHTS_BY_RANGE[i]).fill(curr));
  }, []);

const toRanges = (minutes) => [
  // [startRange, endRange]
  getLowRange(minutes),
  getMidRange(minutes),
  getHighRange(minutes),
];

const toRandomRanges = (ranges) => {
  const [low, mid, high] = ranges;
  // choose random number from each range
  return [
    toRandomFromRange(low),
    toRandomFromRange(mid),
    toRandomFromRange(high),
  ];
};

const toRounds = (minutes) => {
  const ranges = toRanges(minutes);
  const randomRanges = toRandomRanges(ranges);
  const weightedRounds = toWeightedRoundsArray(randomRanges);

  return getRandomEl(weightedRounds);
};

export { toRounds };
