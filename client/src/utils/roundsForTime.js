import { toFormattedWorkout } from "./format";
import { toRandomIntensity, INTENSITY } from "./intensity";
import { toRandomNumberOfMovements, toMovementsArray } from "./movements";
import { toRepsWithLoadOrHeight } from "./reps";
import { toSecondsPerRound } from "./time";
import { SCORE_TYPE, WORKOUT_STYLE } from "../types";

/**
 * ROUNDS
 * -- time domain input from user
 * -- choose number of rounds appropriate to workout duration
 * -- choose number of movements
 * -- construct movement type array of M, W or G
 * -- use weighted percentage to choose reps per movement based on sec per rep
 * -- choose random movements
 * -- choose number of rounds appropriate to duration
 * -- divide time domain (in sec) into rounds (in sec)
 * -- account for rest time
 * -- choose reps per movement based on sec per rep
 * -- round down to make pretty number
 */

const restByIntensityMap = (seconds) => ({
  [INTENSITY.Easy]: Math.round(seconds * 0.4),
  [INTENSITY.Moderate]: Math.round(seconds * 0.3),
  [INTENSITY.Hard]: Math.round(seconds * 0.2),
});

const toRoundsForTime = (args) => {
  const { rounds, timeDomainInMinutes } = args;
  const intensity = toRandomIntensity();
  const numberOfMovements = toRandomNumberOfMovements(timeDomainInMinutes);
  const movements = toMovementsArray(numberOfMovements);
  const secondsPerRound = toSecondsPerRound(timeDomainInMinutes, rounds);
  const timeToDeduct = restByIntensityMap(secondsPerRound)[intensity];
  const secondsPerMovementPerRd = Math.round(
    (secondsPerRound - timeToDeduct) / numberOfMovements
  );

  const repsWithLoadOrHeight = toRepsWithLoadOrHeight({
    intensity,
    movements,
    timeDomainInMinutes,
    secondsPerMovementPerRd,
  });

  return {
    formattedWorkout: toFormattedWorkout(repsWithLoadOrHeight),
    intensity,
    movements,
    name: "Rounds for Time",
    rounds,
    reps: repsWithLoadOrHeight,
    scoreStandard: toScoreStandard(rounds, timeDomainInMinutes),
    scoreType: SCORE_TYPE.Task,
    style: WORKOUT_STYLE.Amrap,
    time: timeDomainInMinutes,
    timeCap: timeDomainInMinutes,
  };
};

const toScoreStandard = (rounds, timeDomainInMinutes) =>
  `${rounds} Rounds For Time *${timeDomainInMinutes} minute time cap`;

export { toRoundsForTime };
