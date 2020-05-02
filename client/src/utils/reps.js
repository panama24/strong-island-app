import { toHeight, toLoads } from "./format";
import { intensityToSecondsPerRepToAddMap } from "./intensity";
import { isBoxJumps, isMonostructural, isWeightlifting } from "./movements";
import { getUnitsByDuration } from "./units";

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

const toRepsWithLoadOrHeight = (
  intensity,
  movements,
  secondsPerMovementPerRd,
  timeDomainInMinutes
) =>
  movements.map((movement) => {
    const reps = toReps(secondsPerMovementPerRd, intensity, movement);
    if (isMonostructural(movement)) {
      return toMonostructuralReps(timeDomainInMinutes, reps, movement);
    }
    if (isBoxJumps(movement)) {
      return toBoxJumpReps(reps, intensity, movement);
    }
    // weightlifting or gymnastic non-box jump movements
    return toStandardReps(reps, intensity, movement);
  });

const toStandardReps = (reps, intensity, movement) => {
  const formattedLoads = toLoads(intensity, movement.weightLoads);
  return {
    name: movement.displayName,
    reps,
    formattedReps: formattedLoads
      ? `${reps} ${movement.displayName} ${formattedLoads}`
      : `${reps} ${movement.displayName}`,
  };
};

const toMonostructuralReps = (timeDomainInMinutes, reps, movement) => {
  // if double-unders
  if (!movement.units) {
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
};

const toBoxJumpReps = (reps, intensity, movement) => {
  const formattedHeight = toHeight(intensity, movement.heights);
  return {
    name: movement.displayName,
    reps,
    formattedReps: `${reps} ${movement.displayName} ${formattedHeight}`,
  };
};

export {
  toBoxJumpReps,
  toMonostructuralReps,
  toReps,
  toRepsWithLoadOrHeight,
  toStandardReps,
};
