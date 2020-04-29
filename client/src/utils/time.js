const toSeconds = (n) => n * 60;
const toSecondsPerRound = (mins, rds) => Math.round(toSeconds(mins) / rds);

export { toSeconds, toSecondsPerRound };
