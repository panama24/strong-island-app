import { isMediumDuration, isShortDuration } from "./duration";

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
