import { UNITS } from "../types";
import { getRandomEl } from "./random";

/*
movement = {
  id: "34",
  weightLoads: {
    male: null,
    female: null,
  },
  displayName: "Bike",
  name: "bike",
  type: MOVEMENT_TYPE.Monostructural,
  units: {
    [UNITS.Calories]: {
      secondsPerRep: 6,
      unitsPerRep: 1,
      step: 1,
      [DURATION.Short]: [5, 20],
      [DURATION.Medium]: [15, 30],
      [DURATION.Long]: [25, 50],
    },
    [UNITS.Meters]: {
      secondsPerRep: 0.2,
      unitsPerRep: 1,
      step: 50,
      [DURATION.Short]: [150, 300],
      [DURATION.Medium]: [350, 600],
      [DURATION.Long]: [500, 1000],
    }
  },
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
