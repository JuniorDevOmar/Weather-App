const COMMON = [
  "temperature_2m",
  "apparent_temperature",
  "relative_humidity_2m",
  "dew_point_2m",
  "weather_code",
  "cloud_cover",
  "visibility",
  "is_day"
] as const;

const RAIN_FIELDS = [
  "precipitation",
  "rain",
  "showers",
  "snowfall",
]

const WIND_FIELDS = [
  "wind_speed_10m",
  "wind_direction_10m",
  "wind_gusts_10m"
] as const;

export const HOURLY_FIELDS = [
  ...COMMON,
  ...RAIN_FIELDS,
  ...WIND_FIELDS,
  "precipitation_probability",
  "snow_depth"
] as const;

export const CURRENT_DAY_FIELDS = [
  ...COMMON,
  ...RAIN_FIELDS,
  ...WIND_FIELDS,
  "pressure_msl",
  "surface_pressure"
] as const;

export const DAILY_FIELDS = [
  'weather_code', 'temperature_2m_max', 'apparent_temperature_max', 'temperature_2m_min', 'apparent_temperature_min', 'uv_index_max',
  'sunrise', 'sunset', 'daylight_duration', 'wind_speed_10m_max', 'precipitation_probability_max', 'wind_speed_10m_max'
] as const;
