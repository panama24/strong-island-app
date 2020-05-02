import { UNITS } from "../types";
import { getRandomEl } from "./random";

const unitTypeToSecondsPerRepMap = {
  [UNITS.Meters]: "metersPerRep",
  [UNITS.Calories]: "caloriesPerRep",
};

const secondsPerRepMap = {
  caloriesPerRep: "secondsPerCalorieRep",
  metersPerRep: "secondsPerMeterRep",
};

const toRangeWithStep = (array, step = 1) => {
  const [start, stop] = array;
  return Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((n, i) => n + i * step);
};

const toUnits = (movement, duration) => {
  if (movement.units.length === 0) {
    return movement;
  }

  const unit = getRandomEl(Object.keys(movement.units));
  const unitObj = movement.units[unit];
  const unitRangeByDuration = unitObj[duration];
  const randomUnit = getRandomEl(
    toRangeWithStep(unitRangeByDuration, unit.step)
  );
  // round to nearest 10 or something
  console.log("randomUnit:", randomUnit);

  const timeTakenInSeconds = randomUnit * unitObj.secondsPerRep;
  return {
    unit,
    units: randomUnit,
    timeTakenInSeconds,
    formattedUnit: `${randomUnit} ${unit}`,
  };
};

export { toUnits };
