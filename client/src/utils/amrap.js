import { SCORE_TYPE, WORKOUT_STYLE } from "../types";
import {
  intensityToSecondsPerRepToAddMap,
  toRandomIntensity,
} from "./intensity";
import { toRounds } from "./rounds";
import { toSecondsPerRound } from "./time";
import {
  isWeightlifting,
  isMonostructural,
  toMovementsArray,
  toRandomNumberOfMovements,
} from "./movements";
import { getUnitsByDuration } from "./units";

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
  const movements = toMovementsArray(numberOfMovements);
  const secondsPerRound = toSecondsPerRound(timeDomainInMinutes, rounds);
  const secondsPerMovementPerRd = Math.round(
    secondsPerRound / numberOfMovements
  );

  // this should not also return movement name
  const reps = movements.map((movement) => {
    if (isMonostructural(movement)) {
      // double-unders
      if (movement.units.length === 0) {
        const reps = toReps(secondsPerMovementPerRd, intensity, movement);
        return {
          name: movement.displayName,
          reps,
          formattedReps: `${reps} ${movement.displayName}`,
        };
      }

      const { units, formattedUnit } = getUnitsByDuration(
        movement,
        timeDomainInMinutes
      );

      return {
        name: movement.displayName,
        reps: units,
        formattedReps: `${formattedUnit} ${movement.displayName}`,
      };
    }

    const reps = toReps(secondsPerMovementPerRd, intensity, movement);
    const { formattedLoads } = toLoadsOrUnits(intensity, movement);
    return {
      name: movement.displayName,
      reps,
      formattedReps: formattedLoads
        ? `${reps} ${movement.displayName} ${formattedLoads}`
        : `${reps} ${movement.displayName}`,
      ...toLoadsOrUnits(intensity, movement),
    };
  });

  return {
    formattedWorkout: toFormattedWorkout(reps),
    intensity,
    movements,
    name: "Lame Workout Name",
    rounds,
    reps,
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
    return {
      formattedLoads: toFormatLoads(movement.weightLoads, intensity),
      loads: {
        female: female[intensity],
        male: male[intensity],
      },
    };
  }

  return {
    formattedLoads: null,
    loads: {},
  };
};

const toFormatLoads = (loads, intensity) =>
  loads.female && loads.male
    ? `@${loads.male[intensity]}/${loads.female[intensity]}lbs.`
    : null;

const toFormattedWorkout = (reps) =>
  reps.map(({ formattedReps }) => `${formattedReps}`);

export { toAmrap };
