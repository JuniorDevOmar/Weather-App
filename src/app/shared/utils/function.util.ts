export function convertToKm(value: number, units: string) {
  if (units === 'm') return `${value / 1000} km`;
  return `${value} km`;
}

export function getTimestamp(time: string) {
  return time.slice(time.indexOf('T') + 1, time.length);
}

export function getWindRotation(direction: number) {
  return {
    transform: `rotate(${direction}deg)`,
    display: 'inline-block',
    transition: 'transform 0.5s ease',
  };
}
