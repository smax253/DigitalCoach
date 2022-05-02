/**
 * If a min is passed, return a random number between min and max, otherwise return a random number
 * between 0 and max.
 * @param {number} max - The maximum number that can be returned.
 * @param {number} [min] - The minimum number to return.
 * @returns A function that takes two arguments, max and min.
 */
export default function getRandomInt(max: number, min?: number) {
  const rand = Math.floor(Math.random() * max);
  return min ? min + rand : rand;
}
