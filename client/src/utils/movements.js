import {
  gymnasticMovements,
  monostructuralMovements,
  weightliftingMovements,
} from "../mockData";
import { DURATION, MOVEMENT_TYPE } from "../types";
import { getDuration } from "./duration";
import { getRandomEl } from "./random";

const weightedMovementNumberRangesByDuration = {
  // [ numberOfMovements, weight ]
  [DURATION.Short]: [
    // [1, 1],
    [2, 6],
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

const toRandomMovementTypesArray = (n) =>
  Array(n)
    .fill(null)
    .map((_) => getRandomEl(Object.values(MOVEMENT_TYPE)));

const toMovementsArray = (numberOfMovements) => {
  const types = toRandomMovementTypesArray(numberOfMovements);
  const movementTypeMap = {
    [MOVEMENT_TYPE.Gymnastic]: gymnasticMovements,
    [MOVEMENT_TYPE.Monostructural]: monostructuralMovements,
    [MOVEMENT_TYPE.Weightlifting]: weightliftingMovements,
  };
  return types.map((t) => getRandomEl(movementTypeMap[t]));
};

const isWeightlifting = (movement) =>
  movement.type === MOVEMENT_TYPE.Weightlifting;
const isGymnastic = (movement) => movement.type === MOVEMENT_TYPE.Gymnastic;
const isMonostructural = (movement) =>
  movement.type === MOVEMENT_TYPE.Monostructural;

export {
  isGymnastic,
  isMonostructural,
  isWeightlifting,
  toMovementsArray,
  toRandomNumberOfMovements,
};
