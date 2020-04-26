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
 * -- choose number of movements
 * -- divide time domain (in sec) into rounds
 * -- construct movement type array of M, W or G
 * -- use weighted percentage to choose reps per movement based on sec per rep
 * -- round to make pretty number
 */

// mocks
const timeDomainInMins = 15;

// methods
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

// construct weightedArray
// ranges = [ [ 3, 4 ], [ 4, 4 ], [ 5, 1 ], [ 6, 1 ] ] ;
const toWeightedArray = (ranges) =>
  ranges.reduce((acc, curr) => {
    return acc.concat(Array(curr[1]).fill(curr[0]));
  }, []);

// randomly choose
const toRandomNumberOfMovements = (mins) => {
  const numberOfMovementsByDuration = toNumberOfMovementsByDuration(mins);
  const weightedArray = toWeightedArray(numberOfMovementsByDuration);
  return getRandomEl(weightedArray);
};

// put this in time.js
const toSecondsPerRound = (mins, rds) => Math.round(toSeconds(mins) / rds);

const toRandomMovementTypeArray = (n) =>
  Array(n)
    .fill(null)
    .map((_) => getRandomEl(Object.keys(MOVEMENT_TYPE)));

// construct array
const toMovementsArray = (types) => {
  // types: ['weightlifting', 'gymnastic', 'monostructural'];
  // put this in mockData?
  const typeMap = {
    [MOVEMENT_TYPE.Gymnastic]: gymnasticMovements,
    [MOVEMENT_TYPE.Monostructural]: monostructuralMovements,
    [MOVEMENT_TYPE.Weightlifting]: weightliftingMovements,
  };
  return types.map((t) => getRandomEl(typeMap[t]));
};

// secondsPerRound = 200, numberOfMovements = 3
// choose amount of secondsPerRound for each movement
// unweighted
const mapRepsToMovement = (secondsPerRd, numberOfMovements, movements) => {
  const secondsPerMovement = Math.round(secondsPerRd / numberOfMovements);
  return movements.map((movement) => ({
    reps: toReps(secondsPerMovement, movement),
  }));
};

const toReps = (seconds, movement) =>
  Math.round(seconds / movement.secondsPerRep);

/* construct object at the end
  return movements.map((m) => ({
    name: m.displayName,
    reps: toReps(m),
    loads: toLoads(m),
  }));
  */
