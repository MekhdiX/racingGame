export const getRandomIntInclusive = (min: number, max: number): number => {
  const Min = Math.ceil(min);
  const Max = Math.floor(max);
  return Math.floor(Math.random() * (Max - Min + 1)) + Min;
};
