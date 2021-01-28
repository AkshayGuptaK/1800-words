const mapping = [
  [],
  [],
  ['A', 'B', 'C'],
  ['D', 'E', 'F'],
  ['G', 'H', 'I'],
  ['J', 'K', 'L'],
  ['M', 'N', 'O'],
  ['P', 'Q', 'R', 'S'],
  ['T', 'U', 'V'],
  ['W', 'X', 'Y', 'Z'],
];

export function mapNumberToCharSet(phoneNumber: number): string[][] {
  return Array.from(phoneNumber.toString())
    .map(Number)
    .map((n) => mapping[n]);
}
