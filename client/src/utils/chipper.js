import { isShortDuration, isMediumDuration } from "./duration";
import { toMovementsArrayBySecondsPerRep } from "./movements";
import { getRandomEl } from "./random";
import { toSeconds } from "./time";
import { toRepsWithLoadOrHeight } from "./reps";
import { toFormattedWorkout } from "./format";
import { SCORE_TYPE, WORKOUT_STYLE } from "../types";

const toAscendingLadder = (minutes) => {
  if (isShortDuration(minutes)) {
    return {
      reps: [2, 4, 6, 8],
      numberOfMovements: getRandomEl([2, 3]),
    };
  }
  if (isMediumDuration(minutes)) {
    return {
      reps: [5, 10, 15, 20, 25],
      numberOfMovements: getRandomEl([2, 3]),
    };
  }
  return {
    reps: [30, 40, 50, 60, 70],
    numberOfMovements: 1,
  };
};

const toDescendingLadder = () => [70, 60, 50, 40];
const toClassic = () => [21, 15, 9];
const toMono = () => [30, 30, 30];

const REP_SCHEMES = {
  Ascending: "ascending",
  Descending: "descending",
  Classic: "classic",
  Mono: "mono",
};

const repSchemes = {
  [REP_SCHEMES.Ascending]: (minutes) => toAscendingLadder(minutes),
  [REP_SCHEMES.Descending]: () => toDescendingLadder(),
  [REP_SCHEMES.Classic]: () => toClassic(),
  [REP_SCHEMES.Mono]: () => toMono(),
};

// does not necessarily need to be possible in time
const toTimePriorityChipper = (timeDomainInMinutes, intensity) => {};

// needs to make sure can be completed in time
const toTaskPriorityChipper = (timeDomainInMinutes, intensity) => {
  const seconds = toSeconds(timeDomainInMinutes);
  const scheme = REP_SCHEMES[getRandomEl(Object.keys(REP_SCHEMES))];
  const { numberOfMovements, reps } = repSchemes[scheme](timeDomainInMinutes);
  const secondsPerRepBlock = Math.round(seconds / reps.length);

  const secondsPerMovementMap = toSecondsPerMovement(
    reps,
    secondsPerRepBlock,
    numberOfMovements
  );

  const movements = toMovementsArrayBySecondsPerRep(secondsPerMovementMap);
  const repsWithLoadOrHeight = toRepsWithLoadOrHeight({
    intensity,
    movements,
    timeDomainInMinutes,
    assignedReps: reps,
  });

  return {
    formattedWorkout: toFormattedWorkout(repsWithLoadOrHeight),
    intensity,
    movements,
    name: "Task Priority Chipper",
    rounds: reps,
    reps: repsWithLoadOrHeight,
    scoreStandard: toScoreStandard(),
    scoreType: SCORE_TYPE.Task,
    style: WORKOUT_STYLE.Rounds,
    time: timeDomainInMinutes,
    timeCap: timeDomainInMinutes,
  };
};

const toScoreStandard = (timeDomainInMinutes) =>
  `Complete in ${timeDomainInMinutes} minutes`;

/**
{
  '20': [ 12, 12 ],
  '30': [ 8, 8 ],
  '40': [ 6, 6 ],
  '50': [ 4.8, 4.8 ],
  '60': [ 4, 4 ]
}
 */
const toSecondsPerMovement = (reps, secondsPerBlock, movementCount) =>
  reps.reduce((acc, curr) => {
    const secondsPerMovement = Math.round(
      secondsPerBlock / (curr * movementCount)
    );
    acc[curr] = Array(movementCount).fill(secondsPerMovement);
    return acc;
  }, {});

export { toTaskPriorityChipper, toTimePriorityChipper };
