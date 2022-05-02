/**
 * It takes a string, capitalizes the first letter, and lowercases the rest
 * @param {string} str - The string to be capitalized.
 * @returns The first character of the string is capitalized, and the rest of the string is lowercased.
 */
export default function fixCapitalization(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
