import { UNITS } from "../types";
import { getRandomEl } from "./random";

/*
movement = {
  id: "32"
  weightLoads: {male: null, female: null}
  displayName: "Run"
  name: "run"
  metersPerRep: 50
  secondsPerMeterRep: 10
  type: "monostructural"
  units: ["meters"]
}
*/

const unitTypeToSecondsPerRepMap = {
  [UNITS.Meters]: "metersPerRep",
  [UNITS.Calories]: "caloriesPerRep",
};

const secondsPerRepMap = {
  caloriesPerRep: "secondsPerCalorieRep",
  metersPerRep: "secondsPerMeterRep",
};

const toUnitsAsReps = (secondsPerRound, movement) => {
  // meters
  const unit = getRandomEl(movement.units);

  // 50m per rep
  const unitsPerRep = movement[unitTypeToSecondsPerRepMap[unit]];

  // 30
  const secondsPerRep =
    movement[secondsPerRepMap[unitTypeToSecondsPerRepMap[unit]]];

  // 450s per round / 30 = 15 reps
  const unitsAsReps = secondsPerRound / secondsPerRep;

  // const reps = secondsPerRound / secondsPerRep
  // unitsPerRep * rawReps = 15 * 50m = 750m
  const reps = Math.round(unitsAsReps * unitsPerRep);
  if (unitsAsReps <= 1) {
    return unitsPerRep;
  }
  return reps;
};

export { toUnitsAsReps };
