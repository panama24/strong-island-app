import {
  gymnasticMovements,
  monostructuralMovements,
  weightliftingMovements,
} from "../mockData";
import { DURATION, MOVEMENT_TYPE, UNITS } from "../types";
import { getDuration, isMediumDuration } from "./duration";
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
    [3, 5],
    [4, 3],
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

const movementTypeMap = {
  [MOVEMENT_TYPE.Gymnastic]: gymnasticMovements,
  [MOVEMENT_TYPE.Monostructural]: monostructuralMovements,
  [MOVEMENT_TYPE.Weightlifting]: weightliftingMovements,
};

const toMovementsArray = (numberOfMovements) => {
  const types = toRandomMovementTypesArray(numberOfMovements);
  return toUniqueMovements(types);
};

const toUniqueMovements = (types) => {
  let set = new Set();
  return types.map((t) => {
    let movement = getRandomEl(movementTypeMap[t]);
    while (set.has(movement.name)) {
      movement = getRandomEl(movementTypeMap[t]);
    }
    set.add(movement.name);
    return movement;
  });
};

const withinThreshold = (movement, threshold, cushion) =>
  movement.secondsPerRep >= threshold[0] - cushion &&
  movement.secondsPerRep <= threshold[1] + cushion;

const toUniqueWithThreshold = (types, threshold) => {
  let movementSet = new Set();
  return types.map((t) => {
    let movement = getRandomEl(
      movementTypeMap[t].filter((m) =>
        isMonostructural(m) ? m : withinThreshold(m, threshold, 3)
      )
    );

    console.log("movement:", movement);
    while (movementSet.has(movement.name)) {
      movement = getRandomEl(
        movementTypeMap[t].filter((m) =>
          isMonostructural(m) ? m : withinThreshold(m, threshold, 3)
        )
      );
    }
    movementSet.add(movement.name);
    return movement;
  });
};

const toMovementsArrayBySecondsPerRep = (secondsPerMovementMap) => {
  const keysToNum = Object.keys(secondsPerMovementMap).map((key) =>
    Number(key)
  );
  const threshold = [
    secondsPerMovementMap[Math.max(...keysToNum)][0],
    secondsPerMovementMap[Math.min(...keysToNum)][0],
  ];
  const count =
    secondsPerMovementMap[keysToNum[0]].length === 1
      ? keysToNum.length
      : secondsPerMovementMap[keysToNum[0]].length;
  const types = toRandomMovementTypesArray(count);

  return toUniqueWithThreshold(types, threshold);
};

const isWeightlifting = (movement) =>
  movement.type === MOVEMENT_TYPE.Weightlifting;
const isGymnastic = (movement) => movement.type === MOVEMENT_TYPE.Gymnastic;
const isMonostructural = (movement) =>
  movement.type === MOVEMENT_TYPE.Monostructural;
const isBoxJumps = (movement) =>
  isGymnastic(movement) && movement.units === UNITS.Inches;

export {
  isBoxJumps,
  isGymnastic,
  isMonostructural,
  isWeightlifting,
  toMovementsArray,
  toMovementsArrayBySecondsPerRep,
  toRandomNumberOfMovements,
};
