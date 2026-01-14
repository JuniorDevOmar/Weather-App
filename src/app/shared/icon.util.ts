export function mapToIcon(key: string) {
  const icons = {
    0: 'clear-day.svg',
    3: 'cloudy.svg',
  } as { [key: string]: string }

  return icons[key] || 'clear-day.svg';
}
