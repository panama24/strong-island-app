const INTENSITY = {
  Easy: "easy",
  Moderate: "moderate",
  Hard: "hard",
};

const weightedIntensity = [
  [INTENSITY.Hard, 1],
  [INTENSITY.Moderate, 7],
  [INTENSITY.Easy, 3],
];

const intensityToSecondsPerRepToAddMap = {
  [INTENSITY.Easy]: 0,
  [INTENSITY.Moderate]: 2,
  [INTENSITY.Hard]: 6,
};

export { INTENSITY, intensityToSecondsPerRepToAddMap, weightedIntensity };
