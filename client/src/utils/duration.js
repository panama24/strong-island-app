const DURATION = {
  Short: "short",
  Medium: "medium",
  Long: "long",
};
const isShortDuration = (n) => n >= 5 && n <= 15;
const isMediumDuration = (n) => n >= 16 && n <= 30;
const isLongDuration = (n) => n >= 31 && n <= 60;

const getDuration = (minutes) => {
  if (isShortDuration(minutes)) {
    return DURATION.Short;
  }

  if (isMediumDuration(minutes)) {
    return DURATION.Medium;
  }

  return DURATION.Long;
};

export {
  DURATION,
  getDuration,
  isLongDuration,
  isMediumDuration,
  isShortDuration,
};
