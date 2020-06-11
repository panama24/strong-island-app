import { toFormattedWorkout } from "./format";
import { weightedIntensity } from "./intensity";
import { INTENSITY } from "./intensity";
import { toRandomNumberOfMovements, toMovementsArray } from "./movements";
import { toRepsWithLoadOrHeight } from "./reps";
import { toSecondsPerRound } from "./time";
import { SCORE_TYPE } from "../types";
import { toRandomWeighted } from "./weighted";

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

const restByIntensity = (seconds) => ({
  [INTENSITY.Easy]: Math.round(seconds * 0.4),
  [INTENSITY.Moderate]: Math.round(seconds * 0.3),
  [INTENSITY.Hard]: Math.round(seconds * 0.2),
});

const toRoundsForTime = (args) => {
  const { minutes, rounds, type } = args;
  const intensity = toRandomWeighted(weightedIntensity);
  const numberOfMovements = toRandomNumberOfMovements(minutes);
  const movements = toMovementsArray(numberOfMovements);
  const secondsPerRound = toSecondsPerRound(minutes, rounds);
  const secondsDeducted = restByIntensity(secondsPerRound)[intensity];
  const secondsPerMovementPerRd = Math.round(
    (secondsPerRound - secondsDeducted) / numberOfMovements
  );

  const repsWithLoadOrHeight = toRepsWithLoadOrHeight({
    intensity,
    movements,
    minutes,
    secondsPerMovementPerRd,
  });

  return {
    formattedWorkout: toFormattedWorkout(repsWithLoadOrHeight),
    intensity,
    movements,
    reps: repsWithLoadOrHeight,
    rounds,
    scoreStandard: toScoreStandard(rounds, minutes),
    scoreType: SCORE_TYPE.Task,
    time: minutes,
    timeCap: minutes,
    type,
  };
};

const toScoreStandard = (rounds, minutes) =>
  `${rounds} Rounds For Time *${minutes} minute time cap`;

export { toRoundsForTime };
