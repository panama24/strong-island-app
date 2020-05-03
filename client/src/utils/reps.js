import { toHeight, toLoads } from "./format";
import { intensityToSecondsPerRepToAddMap } from "./intensity";
import { isBoxJumps, isMonostructural, isWeightlifting } from "./movements";
import { getUnitsByDuration } from "./units";

const toReps = (totalSeconds, intensity, movement) => {
  const intensifiedSecondsPerRep = toIntensifiedSecondsPerRep(
    intensity,
    movement
  );
  return Math.round(totalSeconds / intensifiedSecondsPerRep);
};

const toIntensifiedSecondsPerRep = (intensity, movement) =>
  intensityToSecondsPerRepToAddMap[intensity] + movement.secondsPerRep;

const toRepsWithLoadOrHeight = ({
  assignedReps,
  intensity,
  movements,
  timeDomainInMinutes,
  secondsPerMovementPerRd,
}) =>
  movements.map((movement, i) => {
    const reps = assignedReps
      ? assignedReps[i]
      : toReps(secondsPerMovementPerRd, intensity, movement);
    if (isMonostructural(movement)) {
      return toMonostructuralReps(timeDomainInMinutes, movement);
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

const toMonostructuralReps = (timeDomainInMinutes, movement) => {
  // if double-unders
  if (!movement.units) {
    const reps = movement.secondsPerRep;
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
