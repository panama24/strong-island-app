const MOVEMENT_TYPE = {
  Weightlifting: "weightlifting",
  Gymnastic: "gymnastic",
  Monostructural: "monostructural",
};

const SCORETYPE = {
  Time: "time",
  Task: "task",
};

const WORKOUTSTYLE = {
  Amrap: "amrap",
  Rounds: "rounds",
  Interval: "interval",
};

const LEVELS = {
  First: "first",
  Second: "second",
  Third: "third",
  Unlimited: "unlimited",
};

const USER = {
  id: "1",
  firstName: "Jessica",
  lastName: "Pamanian",
  email: "jexeones@gmail.com",
  username: "jexeones",
  highestLevelCompleted: null,
  currentLevel: LEVELS.First,
  completedWorkoutsByLevel: {
    [LEVELS.First]: [
      {
        benchmarkWorkoutId: "1",
        completedOn: "2020-4-12",
        highScore: 120,
        previousScores: [],
      },
      {
        benchmarkWorkoutId: "2",
        completedOn: "2020-4-15",
        highScore: 120,
        previousScores: [],
      },
    ],
    [LEVELS.Second]: [],
    [LEVELS.Third]: [],
    [LEVELS.Unlimited]: [],
  },
};

const mockLevels = [
  {
    benchmarkWorkoutIds: ["1", "2", "3"],
    id: "1",
    level: 1,
    numberOfWorkouts: 3,
    title: "Level One",
  },
  {
    benchmarkWorkoutIds: ["4", "5", "6", "7", "8"],
    id: "2",
    level: 2,
    numberOfWorkouts: 5,
    title: "Level Two",
  },
  {
    benchmarkWorkoutIds: ["9", "10", "11", "12", "13", "14", "15"],
    id: "3",
    level: 3,
    numberOfWorkouts: 7,
    title: "Level Three",
  },
];

const BENCHMARK_WORKOUTS = [
  {
    completedOn: null,
    isComplete: false,
    id: "1",
    level: 1,
    movements: [{}, {}],
    previousScores: [],
    reps: [{}, {}],
    scoreStandard: 100,
    scoreType: SCORETYPE.Time,
    style: WORKOUTSTYLE.Amrap,
    title: "Benchmark Workout One",
    timeCap: 120,
    weightLoads: [{}, {}],
  },
  {
    completedOn: null,
    isComplete: false,
    id: "2",
    level: 1,
    movements: [{}, {}],
    previousScores: [],
    reps: [{}, {}],
    scoreStandard: 100,
    scoreType: SCORETYPE.Task,
    style: WORKOUTSTYLE.Rounds,
    title: "Benchmark Workout Two",
    timeCap: 120,
    weightLoads: [{}, {}],
  },
  {
    completedOn: null,
    isComplete: false,
    id: "3",
    level: 1,
    movements: [{}, {}],
    previousScores: [],
    reps: [{}, {}],
    scoreStandard: 100,
    scoreType: SCORETYPE.Task,
    style: WORKOUTSTYLE.Interval,
    title: "Benchmark Workout Three",
    timeCap: 120,
    weightLoads: [{}, {}],
  },
];

const MOVEMENT = {
  id: "23",
  maleWeightLoads: { easy: 95, moderate: 135, hard: 185 },
  femaleWeightLoads: { easy: 65, moderate: 95, hard: 135 },
  name: "squat",
  secondsPerRep: 4,
  type: MOVEMENT_TYPE.Weightlifting,
};

const ALL_MOVEMENTS = [
  {
    id: "22",
    maleWeightLoads: { easy: 95, moderate: 135, hard: 185 },
    femaleWeightLoads: { easy: 65, moderate: 95, hard: 135 },
    displayName: "Back Squat",
    name: "squat",
    secondsPerRep: 4,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "23",
    maleWeightLoads: { easy: 95, moderate: 135, hard: 185 },
    femaleWeightLoads: { easy: 65, moderate: 95, hard: 135 },
    displayName: "Press",
    name: "press",
    secondsPerRep: 4,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "24",
    maleWeightLoads: { easy: 95, moderate: 135, hard: 185 },
    femaleWeightLoads: { easy: 65, moderate: 95, hard: 135 },
    displayName: "Snatch",
    name: "snatch",
    secondsPerRep: 8,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "25",
    maleWeightLoads: { easy: 95, moderate: 135, hard: 185 },
    femaleWeightLoads: { easy: 65, moderate: 95, hard: 135 },
    displayName: "Clean",
    name: "clean",
    secondsPerRep: 5,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "26",
    maleWeightLoads: { easy: 95, moderate: 135, hard: 185 },
    femaleWeightLoads: { easy: 65, moderate: 95, hard: 135 },
    displayName: "Deadlift",
    name: "deadlift",
    secondsPerRep: 8,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "27",
    maleWeightLoads: { easy: 95, moderate: 135, hard: 185 },
    femaleWeightLoads: { easy: 65, moderate: 95, hard: 135 },
    name: "bench",
    displayName: "Bench Press",
    secondsPerRep: 5,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "28",
    maleWeightLoads: { easy: 95, moderate: 135, hard: 185 },
    femaleWeightLoads: { easy: 65, moderate: 95, hard: 135 },
    displayName: "Overhead Squat",
    name: "overheadSquat",
    secondsPerRep: 10,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "29",
    maleWeightLoads: { easy: 14, moderate: 20, hard: 30 },
    femaleWeightLoads: { easy: 10, moderate: 14, hard: 20 },
    displayName: "Wallball",
    name: "wallball",
    secondsPerRep: 5,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "30",
    maleWeightLoads: null,
    femaleWeightLoads: null,
    displayName: "Pushup",
    name: "pushup",
    secondsPerRep: 10,
    type: MOVEMENT_TYPE.Gymnastic,
  },
  {
    id: "31",
    maleWeightLoads: null,
    femaleWeightLoads: null,
    displayName: "Pullup",
    name: "pullup",
    secondsPerRep: 10,
    type: MOVEMENT_TYPE.Gymnastic,
  },
  {
    id: "32",
    maleWeightLoads: null,
    femaleWeightLoads: null,
    displayName: "Run",
    name: "run",
    secondsPerRep: 10,
    type: MOVEMENT_TYPE.Monostructural,
  },
  {
    id: "33",
    maleWeightLoads: null,
    femaleWeightLoads: null,
    displayName: "Row",
    name: "row",
    secondsPerRep: 10,
    type: MOVEMENT_TYPE.Monostructural,
  },
];
const gymnasticMovements = ALL_MOVEMENTS.filter(
  (m) => m.type === MOVEMENT_TYPE.Gymnastic
);
const weightliftingMovements = ALL_MOVEMENTS.filter(
  (m) => m.type === MOVEMENT_TYPE.Weightlifting
);
const monostructuralMovements = ALL_MOVEMENTS.filter(
  (m) => m.type === MOVEMENT_TYPE.Monostructural
);

const GENERATED_WORKOUTS = [
  {
    completedOn: null,
    id: "20",
    isComplete: false,
    movements: [{}, {}],
    previousScores: [],
    reps: [{}, {}],
    score: null,
    scoreStandard: 100,
    scoreType: SCORETYPE.Task,
    timeCap: 120,
    title: "Some Cool WOD",
    weightLoads: [{}, {}],
    style: WORKOUTSTYLE.Interval,
  },
];

/** * First Level Benchmark Workouts:
 * AMRAP 10 Cindy - benchmark: 5 round
 * 3 Rounds for time: 10 DL 15 Box Jump - benchmark: 12 mins
 * 30 Burpee - benchmark: 5 mins
 */

/** * Second Level Benchmark Workouts:
 * AMRAP 20: 10 Situp, 10 Jump Lunge - benchmark: 15 round
 * 4 Rounds for time: 12 Push Press, 10 Front Squat, 8 Burpee - benchmark: 16 mins
 * 3 Rounds for time: 300m row, 12 PowerClean - benchmark: 18 mins
 * 1 mile run - benchmark: 12 mins
 * For Time: 30 Snatch, 20 Pullup, 10 HSPU - benchmark: 10 mins
 */

/** * Third Level Benchmark Workouts:
 * AMRAP 20 10 OHS, 20 KBS  - benchmark: 8 round
 * 3 Rounds for time: 30 Wallball, 30 Burpee  - benchmark: 15 mins
 * Fran - benchmark: 8 mins
 * 10 Rounds: 7 Box Jump, 7 SDHP, 7 Pushup - benchmark: 13 mins
 * AMRAP 5: CJ - benchmark: 30
 * For time: 50 DL, 50 Front Rack Lunge, 800m run - benchmark: 15 mins
 * AMRAP 10: 10 DB Snatch, 20 DU - benchmark: 10 rounds
 */

// choose weight load after by user skill level?
export const workout = {
  id: "20",
  scoreStandard: 100,
  scoreType: SCORETYPE.Task,
  timeCap: 120,
  title: "Some Cool WOD",
  style: WORKOUTSTYLE.Interval,
  movements: [
    {
      id: "23",
      maleWeightLoads: { easy: 95, moderate: 135, hard: 185 },
      femaleWeightLoads: { easy: 65, moderate: 95, hard: 135 },
      displayName: "Snatch",
      name: "snatch",
      secondsPerRep: 8,
      type: MOVEMENT_TYPE.Weightlifting,
    },
    {
      id: "15",
      maleWeightLoads: null,
      femaleWeightLoads: null,
      name: "pullup",
      displayName: "Pullup",
      secondsPerRep: 5,
      type: MOVEMENT_TYPE.Gymnastic,
    },
    {
      id: "7",
      maleWeightLoads: null,
      femaleWeightLoads: null,
      displayName: "Handstand Pushup",
      name: "handstandPushup",
      secondsPerRep: 10,
      type: MOVEMENT_TYPE.Gymnastic,
    },
  ],
  reps: [30, 20, 10],
  weightLoads: [
    { female: 65, male: 95 },
    { female: null, male: null },
    { female: null, male: null },
  ],
};

const toFormatLoads = (loads) =>
  loads.female && loads.male ? `@${loads.male}/${loads.female}lbs.` : null;

const toWorkoutDisplay = (workout) => {
  return workout.reps.map((rep, i) => {
    const movementName = workout.movements[i].displayName;
    const formattedLoads = toFormatLoads(workout.weightLoads[i]);

    return formattedLoads
      ? `${rep} ${movementName} ${formattedLoads}`
      : `${rep} ${movementName}`;
  });
};

console.log(toWorkoutDisplay(workout));

export {
  ALL_MOVEMENTS,
  gymnasticMovements,
  monostructuralMovements,
  weightliftingMovements,
  MOVEMENT_TYPE,
};
