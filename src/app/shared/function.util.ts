//TODO: add method to determine how good visibility is.
export function convertToKm(value: number, units: string) {
  if (units === 'm') return `${value / 1000} km`;
  return `${value} km`;
}
