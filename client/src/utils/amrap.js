import { toFormattedWorkout } from "./format";
import { toRandomIntensity } from "./intensity";
import { toMovementsArray, toRandomNumberOfMovements } from "./movements";
import { toRepsWithLoadOrHeight } from "./reps";
import { toSecondsPerRound } from "./time";
import { SCORE_TYPE, WORKOUT_STYLE } from "../types";

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
  const { rounds, timeDomainInMinutes } = args;
  const intensity = toRandomIntensity();
  const numberOfMovements = toRandomNumberOfMovements(timeDomainInMinutes);
  const movements = toMovementsArray(numberOfMovements);
  const secondsPerRound = toSecondsPerRound(timeDomainInMinutes, rounds);
  const secondsPerMovementPerRd = Math.round(
    secondsPerRound / numberOfMovements
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
    name: "AMRAP",
    rounds,
    reps: repsWithLoadOrHeight,
    scoreStandard: toScoreStandard(rounds, timeDomainInMinutes),
    scoreType: SCORE_TYPE.Time,
    style: WORKOUT_STYLE.Amrap,
    time: timeDomainInMinutes,
    timeCap: timeDomainInMinutes,
  };
};

const toScoreStandard = (rounds, timeDomainInMinutes) =>
  `Complete ${rounds} rounds in ${timeDomainInMinutes} minutes.`;

export { toAmrap };
