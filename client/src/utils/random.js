const toRandomFromRange = (r) =>
  Math.round(Math.random() * (r[1] - r[0]) + r[0]);

const getRandomEl = (arr) => arr[Math.floor(Math.random() * arr.length)];

export { getRandomEl, toRandomFromRange };
