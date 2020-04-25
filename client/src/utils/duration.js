const DURATION = {
  Short: "short",
  Medium: "medium",
  Long: "long",
};
const isShortDuration = (n) => n >= 5 && n <= 15;
const isMediumDuration = (n) => n >= 16 && n <= 30;
const isLongDuration = (n) => n >= 31 && n <= 60;

export { isLongDuration, isMediumDuration, isShortDuration };
