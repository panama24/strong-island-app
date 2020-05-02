const toHeight = (intensity, heights) =>
  `${heights.male[intensity]}/${heights.female[intensity]}"`;

const toLoads = (intensity, loads) => {
  const { female, male } = loads;
  return female && male ? `@${male[intensity]}/${female[intensity]}lbs.` : null;
};

const toFormattedWorkout = (reps) =>
  reps.map(({ formattedReps }) => `${formattedReps}`);

export { toFormattedWorkout, toHeight, toLoads };
