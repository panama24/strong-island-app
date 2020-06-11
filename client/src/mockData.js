import {
  DURATION,
  MOVEMENT_TYPE,
  SCORE_TYPE,
  WORKOUT_TYPES,
  UNITS,
} from "./types";

/*
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

  {
    id: "23",
    weightLoads: {
      male: { easy: 95, moderate: 135, hard: 185 },
      female: { easy: 65, moderate: 95, hard: 135 },
    },
    displayName: "Press",
    name: "press",
    secondsPerRep: 4,
    type: MOVEMENT_TYPE.Weightlifting,
  },
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
    scoreType: SCORE_TYPE.Time,
    style: WORKOUT_STYLE.Amrap,
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
    scoreType: SCORE_TYPE.Task,
    style: WORKOUT_STYLE.Rounds,
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
    scoreType: SCORE_TYPE.Task,
    style: WORKOUT_STYLE.Interval,
    title: "Benchmark Workout Three",
    timeCap: 120,
    weightLoads: [{}, {}],
  },
];
*/

const ALL_MOVEMENTS = [
  {
    id: "21",
    weightLoads: {
      male: { easy: 95, moderate: 135, hard: 185 },
      female: { easy: 65, moderate: 95, hard: 135 },
    },
    displayName: "Front Squat",
    name: "frontSquat",
    secondsPerRep: 5,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "22",
    weightLoads: {
      male: { easy: 95, moderate: 135, hard: 185 },
      female: { easy: 65, moderate: 95, hard: 135 },
    },
    displayName: "Back Squat",
    name: "squat",
    secondsPerRep: 5,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "23",
    weightLoads: {
      male: { easy: 95, moderate: 135, hard: 185 },
      female: { easy: 65, moderate: 95, hard: 135 },
    },
    displayName: "Press",
    name: "press",
    secondsPerRep: 6,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "19",
    weightLoads: {
      male: { easy: 95, moderate: 135, hard: 185 },
      female: { easy: 65, moderate: 95, hard: 135 },
    },
    displayName: "Push Press",
    name: "pushPress",
    secondsPerRep: 7,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "18",
    weightLoads: {
      male: { easy: 95, moderate: 135, hard: 185 },
      female: { easy: 65, moderate: 95, hard: 135 },
    },
    displayName: "Jerk",
    name: "jerk",
    secondsPerRep: 8,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "24",
    weightLoads: {
      male: { easy: 95, moderate: 135, hard: 185 },
      female: { easy: 65, moderate: 95, hard: 135 },
    },
    displayName: "Snatch",
    name: "snatch",
    secondsPerRep: 10,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "17",
    weightLoads: {
      male: { easy: 95, moderate: 135, hard: 185 },
      female: { easy: 65, moderate: 95, hard: 135 },
    },
    displayName: "Power Snatch",
    name: "powerSnatch",
    secondsPerRep: 9,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "16",
    weightLoads: {
      male: { easy: 95, moderate: 135, hard: 185 },
      female: { easy: 65, moderate: 95, hard: 135 },
    },
    displayName: "Hang Snatch",
    name: "hangSnatch",
    secondsPerRep: 9,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "25",
    weightLoads: {
      male: { easy: 95, moderate: 135, hard: 185 },
      female: { easy: 65, moderate: 95, hard: 135 },
    },
    displayName: "Squat Clean",
    name: "squatClean",
    secondsPerRep: 10,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "15",
    weightLoads: {
      male: { easy: 95, moderate: 135, hard: 185 },
      female: { easy: 65, moderate: 95, hard: 135 },
    },
    displayName: "Power Clean",
    name: "clean",
    secondsPerRep: 7,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "14",
    weightLoads: {
      male: { easy: 95, moderate: 135, hard: 185 },
      female: { easy: 65, moderate: 95, hard: 135 },
    },
    displayName: "Clean & Jerk",
    name: "clean&Jerk",
    secondsPerRep: 12,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "26",
    weightLoads: {
      male: { easy: 95, moderate: 135, hard: 185 },
      female: { easy: 65, moderate: 95, hard: 135 },
    },
    displayName: "Deadlift",
    name: "deadlift",
    secondsPerRep: 8,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "14",
    weightLoads: {
      male: { easy: 95, moderate: 135, hard: 185 },
      female: { easy: 65, moderate: 95, hard: 135 },
    },
    displayName: "Sumo Deadlift High Pull",
    name: "sdhp",
    secondsPerRep: 8,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "27",
    weightLoads: {
      male: { easy: 95, moderate: 135, hard: 185 },
      female: { easy: 65, moderate: 95, hard: 135 },
    },
    name: "bench",
    displayName: "Bench Press",
    secondsPerRep: 8,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "28",
    weightLoads: {
      male: { easy: 95, moderate: 135, hard: 185 },
      female: { easy: 65, moderate: 95, hard: 135 },
    },
    displayName: "Overhead Squat",
    name: "overheadSquat",
    secondsPerRep: 10,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "29",
    weightLoads: {
      male: { easy: 14, moderate: 20, hard: 30 },
      female: { easy: 10, moderate: 14, hard: 20 },
    },
    displayName: "Wallball",
    name: "wallball",
    secondsPerRep: 5,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "10",
    weightLoads: {
      male: { easy: 14, moderate: 20, hard: 30 },
      female: { easy: 10, moderate: 14, hard: 20 },
    },
    displayName: "Ballslam",
    name: "ballslam",
    secondsPerRep: 5,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "13",
    weightLoads: {
      male: null,
      female: null,
    },
    displayName: "Muscle-up",
    name: "muscleUp",
    secondsPerRep: 20,
    type: MOVEMENT_TYPE.Gymnastic,
  },
  {
    id: "30",
    weightLoads: {
      male: null,
      female: null,
    },
    displayName: "Pushup",
    name: "pushup",
    secondsPerRep: 5,
    type: MOVEMENT_TYPE.Gymnastic,
  },
  {
    id: "3",
    weightLoads: {
      male: null,
      female: null,
    },
    displayName: "Burpee",
    name: "burpee",
    secondsPerRep: 8,
    type: MOVEMENT_TYPE.Gymnastic,
  },
  {
    id: "11",
    weightLoads: {
      male: null,
      female: null,
    },
    displayName: "Situp",
    name: "situp",
    secondsPerRep: 6,
    type: MOVEMENT_TYPE.Gymnastic,
  },
  {
    id: "12",
    weightLoads: {
      male: null,
      female: null,
    },
    displayName: "GHD Situp",
    name: "ghdSitup",
    secondsPerRep: 10,
    type: MOVEMENT_TYPE.Gymnastic,
  },
  {
    id: "6",
    weightLoads: {
      male: null,
      female: null,
    },
    displayName: "Toes-to-bar",
    name: "toesToBar",
    secondsPerRep: 10,
    type: MOVEMENT_TYPE.Gymnastic,
  },
  {
    id: "5",
    weightLoads: {
      male: null,
      female: null,
    },
    displayName: "Knees-to-elbow",
    name: "kneesToElbow",
    secondsPerRep: 10,
    type: MOVEMENT_TYPE.Gymnastic,
  },
  {
    id: "31",
    weightLoads: {
      male: null,
      female: null,
    },
    displayName: "Pullup",
    name: "pullup",
    secondsPerRep: 5,
    type: MOVEMENT_TYPE.Gymnastic,
  },
  {
    id: "9",
    weightLoads: {
      male: null,
      female: null,
    },
    displayName: "Chest-to-bar Pullup",
    name: "chestToBarPullup",
    secondsPerRep: 7,
    type: MOVEMENT_TYPE.Gymnastic,
  },
  {
    id: "7",
    weightLoads: {
      male: null,
      female: null,
    },
    displayName: "Lunge",
    name: "lunge",
    secondsPerRep: 5,
    type: MOVEMENT_TYPE.Gymnastic,
  },
  {
    id: "8",
    heights: {
      male: { easy: 20, moderate: 24, hard: 30 },
      female: { easy: 10, moderate: 20, hard: 24 },
    },
    weightLoads: {
      male: null,
      female: null,
    },
    displayName: "Box Jump",
    name: "boxJump",
    secondsPerRep: 5,
    type: MOVEMENT_TYPE.Gymnastic,
    units: UNITS.Inches,
  },
  {
    id: "32",
    weightLoads: {
      male: null,
      female: null,
    },
    displayName: "Run",
    name: "run",
    units: {
      [UNITS.Meters]: {
        secondsPerRep: 0.8,
        unitsPerRep: 1,
        step: 50,
        [DURATION.Short]: [150, 300],
        [DURATION.Medium]: [350, 600],
        [DURATION.Long]: [500, 1000],
      },
    },
    type: MOVEMENT_TYPE.Monostructural,
  },
  {
    id: "33",
    weightLoads: {
      male: null,
      female: null,
    },
    displayName: "Row",
    name: "row",
    units: {
      [UNITS.Calories]: {
        secondsPerRep: 10,
        unitsPerRep: 1,
        step: 1,
        [DURATION.Short]: [5, 20],
        [DURATION.Medium]: [15, 30],
        [DURATION.Long]: [25, 50],
      },
      [UNITS.Meters]: {
        secondsPerRep: 0.5,
        unitsPerRep: 1,
        step: 50,
        [DURATION.Short]: [150, 300],
        [DURATION.Medium]: [350, 600],
        [DURATION.Long]: [500, 1000],
      },
    },
    type: MOVEMENT_TYPE.Monostructural,
  },
  {
    id: "34",
    weightLoads: {
      male: null,
      female: null,
    },
    displayName: "Bike",
    name: "bike",
    units: {
      [UNITS.Calories]: {
        secondsPerRep: 6,
        unitsPerRep: 1,
        step: 1,
        [DURATION.Short]: [5, 20],
        [DURATION.Medium]: [15, 30],
        [DURATION.Long]: [25, 50],
      },
      [UNITS.Meters]: {
        secondsPerRep: 0.2,
        unitsPerRep: 1,
        step: 50,
        [DURATION.Short]: [150, 300],
        [DURATION.Medium]: [350, 600],
        [DURATION.Long]: [500, 1000],
      },
    },
  },
  {
    id: "35",
    weightLoads: {
      male: null,
      female: null,
    },
    displayName: "Double-under",
    name: "doubleUnder",
    secondsPerRep: 1,
    type: MOVEMENT_TYPE.Monostructural,
    units: null,
  },
  {
    id: "36",
    weightLoads: {
      male: { easy: 35, moderate: 50, hard: 70 },
      female: { easy: 20, moderate: 35, hard: 50 },
    },
    displayName: "Dumbbell Snatch",
    name: "dumbbellSnatch",
    secondsPerRep: 5,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "37",
    weightLoads: {
      male: { easy: 35, moderate: 50, hard: 70 },
      female: { easy: 20, moderate: 35, hard: 50 },
    },
    displayName: "Dumbbell Clean",
    name: "dumbbellClean",
    secondsPerRep: 5,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "38",
    weightLoads: {
      male: { easy: 35, moderate: 53, hard: 70 },
      female: { easy: 18, moderate: 35, hard: 53 },
    },
    displayName: "Goblet Clean",
    name: "gobletSquat",
    secondsPerRep: 5,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "39",
    weightLoads: {
      male: { easy: 35, moderate: 53, hard: 70 },
      female: { easy: 18, moderate: 35, hard: 53 },
    },
    displayName: "Kettlebell Swing",
    name: "kettlebellSwing",
    secondsPerRep: 4,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "40",
    weightLoads: {
      male: { easy: 35, moderate: 53, hard: 70 },
      female: { easy: 18, moderate: 35, hard: 53 },
    },
    displayName: "Kettlebell Snatch",
    name: "kettlebellSnatch",
    secondsPerRep: 8,
    type: MOVEMENT_TYPE.Weightlifting,
  },
  {
    id: "41",
    weightLoads: {
      male: { easy: 35, moderate: 53, hard: 70 },
      female: { easy: 18, moderate: 35, hard: 53 },
    },
    displayName: "Kettlebell Turkish Getup",
    name: "kettlebellTurkishGetup",
    secondsPerRep: 20,
    type: MOVEMENT_TYPE.Weightlifting,
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

// const GENERATED_WORKOUTS = [
//   {
//     completedOn: null,
//     id: "20",
//     isComplete: false,
//     movements: [{}, {}],
//     previousScores: [],
//     reps: [{}, {}],
//     score: null,
//     scoreStandard: 100,
//     scoreType: SCORE_TYPE.Task,
//     timeCap: 120,
//     title: "Some Cool WOD",
//     weightLoads: [{}, {}],
//     style: WORKOUT_STYLE.Interval,
//   },
// ];

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
  scoreType: SCORE_TYPE.Task,
  timeCap: 120,
  title: "Some Cool WOD",
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

export {
  ALL_MOVEMENTS,
  gymnasticMovements,
  monostructuralMovements,
  weightliftingMovements,
};
