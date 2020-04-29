import { getRandomEl } from "./random";

const INTENSITY = {
  Easy: "easy",
  Moderate: "moderate",
  Hard: "hard",
};
const weightedIntensityMap = [
  [INTENSITY.Hard, 1],
  [INTENSITY.Moderate, 7],
  [INTENSITY.Easy, 3],
];
const toRandomIntensity = () => {
  const intensityArray = weightedIntensityMap.reduce((acc, curr) => {
    return acc.concat(Array(curr[1]).fill(curr[0]));
  }, []);
  return getRandomEl(intensityArray);
};

const intensityToSecondsPerRepToAddMap = {
  [INTENSITY.Easy]: 0,
  [INTENSITY.Moderate]: 2,
  [INTENSITY.Hard]: 6,
};

export { INTENSITY, intensityToSecondsPerRepToAddMap, toRandomIntensity };
