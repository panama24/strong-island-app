import { toFormattedWorkout } from "./format";
import { toRandomIntensity } from "./intensity";
import { toMovementsArray, toRandomNumberOfMovements } from "./movements";
import { toRepsWithLoadOrHeight } from "./reps";
import { toRounds } from "./rounds";
import { toSecondsPerRound } from "./time";
import { SCORE_TYPE, WORKOUT_STYLE, UNITS } from "../types";

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
  const repsWithLoadOrHeight = toRepsWithLoadOrHeight(
    intensity,
    movements,
    secondsPerMovementPerRd,
    timeDomainInMinutes
  );

  return {
    formattedWorkout: toFormattedWorkout(repsWithLoadOrHeight),
    intensity,
    movements,
    name: "Lame Workout Name",
    rounds,
    reps: repsWithLoadOrHeight,
    // scoreStandard: toScoreStandard(),
    scoreType: SCORE_TYPE.Time,
    style: WORKOUT_STYLE.Amrap,
    time: timeDomainInMinutes,
    timeCap: timeDomainInMinutes,
  };
};

export { toAmrap };
