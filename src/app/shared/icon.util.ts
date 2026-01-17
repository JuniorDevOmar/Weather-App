//TODO: complete mappings; clean up and only include used assets
const allIcons = `./assets/weather-icons/weather-icons-master/production/fill/all`;
const openWeatherIcons = `./assets/weather-icons/weather-icons-master/production/fill/openweathermap`;

export function mapToWeatherIcon(code: number, isDay: number) {
  return `${openWeatherIcons}/${code > 9 ? code : `0${code}`}${isDay ? 'd' : 'n'}.svg`;
}

export function mapToIcon(key: string) {
  const icons = {
    'humidity': 'humidity.svg',
    'cloudy': 'cloudy.svg',
  } as { [key: string]: string; }
  return `${allIcons}/${icons[key] || 'clear-day.svg'}`;
}

export function mapUVIndexToIcon(key: number) {
  const icons = {
    0: 'uv-index.svg',
    1: 'uv-index-1.svg',
    2: 'uv-index-2.svg',
    3: 'uv-index-3.svg',
    4: 'uv-index-4.svg',
    5: 'uv-index-5.svg',
    6: 'uv-index-6.svg',
    7: 'uv-index-7.svg',
    8: 'uv-index-8.svg',
    9: 'uv-index-9.svg',
    10: 'uv-index-10.svg',
    11: 'uv-index-11.svg',
  } as { [key: string]: string; }
  return `${allIcons}/${icons[key] || 'uv-index.svg'}`;
}
