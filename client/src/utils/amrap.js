import { DURATION, getDuration } from "./duration";
import {
  gymnasticMovements,
  monostructuralMovements,
  weightliftingMovements,
  MOVEMENT_TYPE,
} from "./mockData";
import { getRandomEl } from "./random";
import { toSeconds } from "./time";

/**
 * AMRAP
 * -- 20 mins --> 1200 sec
 * -- 6 rounds goal
 * -- 1200/6 rds --> 200 secs per rd
 * -- [M, G, W] --> [15%, 35%, 50%] --> [30s, 70s, 100s]
 * -- [double-under (1), pullup (6), cj (12)] --> [30 double-under, 12 pullup, 8 cj]
 */

/**
 * AMRAP
 * -- time domain input from user
 * -- choose random goal for rounds
 * -- choose intensity level (will determine weight load)
 * -- choose number of movements
 * -- divide time domain (in sec) into rounds
 * -- construct movement type array of M, W or G
 * -- use weighted percentage to choose reps per movement based on sec per rep
 * -- round to make pretty number
 */

// mocks
const timeDomainInMins = 15;
// borrow round logic from rounds
// intensity level
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
const toRandomIntensity = (intensityArray) => {
  const intensityArray = weightedIntensityMap.reduce((acc, curr) => {
    return acc.concat(Array(curr[1]).fill(curr[0]));
  }, []);
  return getRandomEl(intensityArray); // 'moderate'
};

// movements
const weightedMovementNumberRangesByDuration = {
  // [ numberOfMovements, weight ]
  [DURATION.Short]: [
    [1, 1],
    [2, 5],
    [3, 4],
  ],
  [DURATION.Medium]: [
    [2, 4],
    [3, 5],
    [4, 1],
  ],
  [DURATION.Long]: [
    [3, 4],
    [4, 4],
    [5, 1],
    [6, 1],
  ],
};
const toNumberOfMovementsByDuration = (mins) =>
  weightedMovementNumberRangesByDuration[getDuration(mins)];
// ranges = [ [ 3, 4 ], [ 4, 4 ], [ 5, 1 ], [ 6, 1 ] ] ;
const toWeightedMovementsArray = (ranges) =>
  ranges.reduce((acc, curr) => {
    return acc.concat(Array(curr[1]).fill(curr[0]));
  }, []);
const toRandomNumberOfMovements = (mins) => {
  const numberOfMovementsByDuration = toNumberOfMovementsByDuration(mins);
  const weightedArray = toWeightedMovementsArray(numberOfMovementsByDuration);
  return getRandomEl(weightedArray);
};
// put this in time.js?
const toSecondsPerRound = (mins, rds) => Math.round(toSeconds(mins) / rds);

const toRandomMovementTypesArray = (n) =>
  Array(n)
    .fill(null)
    .map((_) => getRandomEl(Object.keys(MOVEMENT_TYPE)));

// construct array of movement objects
const toMovementsArray = (types) => {
  const movementTypeMap = {
    [MOVEMENT_TYPE.Gymnastic]: gymnasticMovements,
    [MOVEMENT_TYPE.Monostructural]: monostructuralMovements,
    [MOVEMENT_TYPE.Weightlifting]: weightliftingMovements,
  };
  return types.map((t) => getRandomEl(movementTypeMap[t]));
};

const intensityToSecondsPerRepToAddMap = {
  [INTENSITY.Easy]: 0,
  [INTENSITY.Moderate]: 2,
  [INTENSITY.Hard]: 6,
};

// accounts for intensity
const toIntensifiedSecondsPerRep = (intensity, movement) =>
  intensityToSecondsPerRepToAddMap[intensity] + movement.secondsPerRep;

// secondsPerRound = 200, numberOfMovements = 3
// choose amount of secondsPerRound for each movement
const toAmrap = (secondsPerRd, numberOfMovements, movements, intensity) => {
  return movements.map((movement) => {
    return {
      name: movement.displayName,
      reps: toIntensifiedReps(
        Math.round(secondsPerRd / numberOfMovements),
        intensity,
        movement
      ),
      ...toLoadsOrUnits(intensity, movement),
    };
  });
};

const toIntensifiedReps = (totalSeconds, intensity, movement) => {
  const intensifiedSecondsPerRep = toIntensifiedSecondsPerRep(
    intensity,
    movement
  );
  return Math.round(totalSeconds / intensifiedSecondsPerRep);
};

const toLoadsOrUnits = (intensity, movement) => {
  const { female, male } = movement.weightLoads;
  if (female && male) {
    return {
      loads: {
        f: female[intensity],
        m: male[intensity],
      },
    };
  }

  if (movement.units && movement.units.length >= 0) {
    return {
      // construct units reps
      // need to have chosen distance etc before this
      unit: getRandomEl(movement.units),
    };
  }
};

const toMonostructuralUnits = () => {};
