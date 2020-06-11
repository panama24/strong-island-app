import { toFormattedWorkout } from "./format";
import { weightedIntensity } from "./intensity";
import { toMovementsArray, toRandomNumberOfMovements } from "./movements";
import { toRepsWithLoadOrHeight } from "./reps";
import { toSecondsPerRound } from "./time";
import { SCORE_TYPE } from "../types";
import { toRandomWeighted } from "./weighted";

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

const toAmrap = (args) => {
  const { minutes, rounds, type } = args;
  const intensity = toRandomWeighted(weightedIntensity);
  const numberOfMovements = toRandomNumberOfMovements(minutes);
  const movements = toMovementsArray(numberOfMovements);
  const secondsPerRound = toSecondsPerRound(minutes, rounds);
  const secondsPerMovementPerRd = Math.round(
    secondsPerRound / numberOfMovements
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
    scoreType: SCORE_TYPE.Time,
    time: minutes,
    timeCap: minutes,
    type,
  };
};

const toScoreStandard = (rounds, minutes) =>
  `Complete ${rounds} rounds in ${minutes} minutes.`;

export { toAmrap };
