import { getRandomEl } from "./random";

const toRandomWeighted = (array) => {
  const weightedArray = array.reduce((acc, curr) => {
    return acc.concat(Array(curr[1]).fill(curr[0]));
  }, []);

  return getRandomEl(weightedArray);
};

export { toRandomWeighted };
