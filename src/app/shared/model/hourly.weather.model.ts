import { WeatherResponse } from './current.weather.model';

export interface HourlyWeatherUnits {
  time: string;
  temperature_2m: string;
  is_day: string;
  relative_humidity_2m: string;
  dew_point_2m: string;
  apparent_temperature: string;
  precipitation_probability: string;
  precipitation: string;
  rain: string;
  showers: string;
  snowfall: string;
  snow_depth: string;
  weather_code: string;
  visibility: string;
  cloud_cover: string;
  wind_speed_10m: string;
  wind_direction_10m: string;
  wind_gusts_10m: string;
}

export interface HourlyWeatherData {
  time: string[];
  temperature_2m: number[];
  is_day: number[];
  relative_humidity_2m: number[];
  dew_point_2m: number[];
  apparent_temperature: number[];
  precipitation_probability: number[];
  precipitation: number[];
  rain: number[];
  showers: number[];
  snowfall: number[];
  snow_depth: number[];
  weather_code: number[];
  visibility: number[];
  cloud_cover: number[];
  wind_speed_10m: number[];
  wind_direction_10m: number[];
  wind_gusts_10m: number[];
}

export interface HourlyWeatherResponse extends WeatherResponse {
  hourly_units: HourlyWeatherUnits;
  hourly: HourlyWeatherData;
}

/*
============================
HELPERS
============================
 */
export interface HourlyDataPoint {
  time: string;
  temperature: number;
  temperatureUnit: string;
  isDay: number;
  humidity: number;
  apparentTemperature: number;
  precipitation: number;
  weatherCode: number;
  windSpeed: number;
  windSpeedUnit: string;
  windDirection: number;
  precipitation_probability: number;
  precipitation_probability_units: string;
}

export function transformHourlyData(response: HourlyWeatherResponse): HourlyDataPoint[] {
  const now = new Date();
  const nextDay = new Date(now.getTime() + 86400000);
  return response.hourly.time
    .map((time, index) => ({
      time,
      temperature: Math.round(response.hourly.temperature_2m[index]),
      temperatureUnit: response.hourly_units.temperature_2m,
      isDay: response.hourly.is_day[index],
      humidity: response.hourly.relative_humidity_2m[index],
      apparentTemperature: Math.round(response.hourly.apparent_temperature[index]),
      precipitation: response.hourly.precipitation[index],
      weatherCode: response.hourly.weather_code[index],
      windSpeed: response.hourly.wind_speed_10m[index],
      windSpeedUnit: response.hourly_units.wind_speed_10m,
      windDirection: response.hourly.wind_direction_10m[index],
      precipitation_probability: response.hourly.precipitation_probability[index],
      precipitation_probability_units: response.hourly_units.precipitation_probability,
    }))
    .filter((item) => {
      const date = new Date(item.time);
      return date > now && date < nextDay;
    });
}
