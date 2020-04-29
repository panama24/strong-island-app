import { SCORE_TYPE, WORKOUT_STYLE } from "../types";
import {
  intensityToSecondsPerRepToAddMap,
  toRandomIntensity,
} from "./intensity";
import { getRandomEl } from "./random";
import { toRounds } from "./rounds";
import { toSecondsPerRound } from "./time";
import {
  isWeightlifting,
  isMonostructural,
  toMovementsArray,
  toRandomNumberOfMovements,
} from "./movements";
import { toUnitsAsReps } from "./units";

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

const toAmrap = (timeDomainInMinutes) => {
  const rounds = toRounds(timeDomainInMinutes);
  const intensity = toRandomIntensity();
  const numberOfMovements = toRandomNumberOfMovements(timeDomainInMinutes);
  const secondsPerRound = toSecondsPerRound(timeDomainInMinutes, rounds);

  const movements = toMovementsArray(numberOfMovements).map((movement) => {
    const secondsPerMovementPerRd = Math.round(
      secondsPerRound / numberOfMovements
    );
    return {
      name: movement.displayName,
      reps: toReps(secondsPerMovementPerRd, intensity, movement),
      // reps: toIntensifiedReps(secondsPerMovementPerRd, intensity, movement),
      ...toLoadsOrUnits(intensity, movement),
    };
  });

  return {
    intensity,
    movements,
    name: "Lame Workout Name",
    rounds,
    // scoreStandard: toScoreStandard(),
    scoreType: SCORE_TYPE.Time,
    style: WORKOUT_STYLE.Amrap,
    time: timeDomainInMinutes,
    timeCap: timeDomainInMinutes,
  };
};

const toReps = (totalSeconds, intensity, movement) => {
  if (isWeightlifting(movement)) {
    return toIntensifiedReps(totalSeconds, intensity, movement);
  }
  if (isMonostructural(movement) && movement.units.length > 0) {
    return toUnitsAsReps(totalSeconds, movement);
  }
  return toIntensifiedReps(totalSeconds, intensity, movement);
};

const toIntensifiedSecondsPerRep = (intensity, movement) =>
  intensityToSecondsPerRepToAddMap[intensity] + movement.secondsPerRep;

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
    const formattedLoads = toFormatLoads(movement.weightLoads, intensity);
    return {
      formattedLoads,
      loads: {
        female: female[intensity],
        male: male[intensity],
      },
    };
  }

  if (movement.units && movement.units.length >= 0) {
    return {
      unit: getRandomEl(movement.units),
    };
  }
};

const toFormatLoads = (loads, intensity) =>
  loads.female && loads.male
    ? `@${loads.male[intensity]}/${loads.female[intensity]}lbs.`
    : null;

const formatUnits = (units) => `${units}`;

// const toWorkoutDisplay = (reps, movement, loadsOrUnits) => {
//   return reps.map((rep, i) => {
//     const movementName = movement.displayName;

//     if (Object.keys(loadsOrUnits).contains("loads")) {
//       const formattedLoads = toFormatLoads(loadsOrUnits.loads);
//       return formattedLoads
//         ? `${rep} ${movementName} ${formattedLoads}`
//         : `${rep} ${movementName}`;
//     }

//     if (Object.keys(loadsOrUnits).contains("units")) {
//       return `${rep}${loadsOrUnits.unit} ${movementName}`;
//     }
//   });
// };

export { toAmrap };
