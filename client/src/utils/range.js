import { isMediumDuration, isShortDuration } from "./duration";
const RANGES = [
  [5, 6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
  [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
  [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
];

// handle time domain values less than 5 and greater than 60
const getHighRangeStart = (n) => {
  if (isShortDuration(n)) {
    return n;
  }
  if (isMediumDuration(n)) {
    return n / 2;
  }
  return n / 4;
};

const getHighRangeEnd = (n) => {
  if (isShortDuration(n)) {
    return n * 2;
  }
  if (isMediumDuration(n)) {
    return n;
  }
  return n / 3;
};
const getHighRange = (n) => [
  Math.round(getHighRangeStart(n)),
  Math.round(getHighRangeEnd(n)),
];
const getMidRangeStart = (n) => 3;
const getMidRangeEnd = (n) => {
  if (isShortDuration(n)) {
    return 5;
  }
  if (isMediumDuration(n)) {
    return 6;
  }
  return 8;
};
const getMidRange = (n) => [
  Math.round(getMidRangeStart(n)),
  Math.round(getMidRangeEnd(n)),
];
const getLowRangeStart = (n) => n / n;
const getLowRangeEnd = (n) => n / n + 1;
const getLowRange = (n) => [
  Math.round(getLowRangeStart(n)),
  Math.round(getLowRangeEnd(n)),
];

export { getHighRange, getMidRange, getLowRange };
