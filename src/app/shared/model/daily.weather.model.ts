import { WeatherResponse } from './current.weather.model';

export interface DailyWeatherUnits {
  time: string;
  weather_code: string;
  temperature_2m_max: string;
  apparent_temperature_max: string;
  temperature_2m_min: string;
  apparent_temperature_min: string;
  precipitation_hours: string;
  uv_index_max: string;
  precipitation_probability_max: string;
}

export interface DailyWeatherData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  apparent_temperature_max: number[];
  temperature_2m_min: number[];
  apparent_temperature_min: number[];
  precipitation_hours: number[];
  uv_index_max: number[];
  sunrise: string[];
  sunset: string[];
  wind_speed_10m_max: number[];
  precipitation_probability_max: number[];
}

export interface DailyWeatherResponse extends WeatherResponse {
  daily_units: DailyWeatherUnits;
  daily: DailyWeatherData;
}

export interface DailyForecast {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  apparentTempMax: number;
  apparentTempMin: number;
  uvIndexMax: number;
  sunrise: string;
  sunset: string;
  windSpeed: number;
  precipitationProbabilityMax: number;
}

export function transformDailyData(response: DailyWeatherResponse): DailyForecast[] {
  return response.daily.time.map((date, index) => ({
    date,
    weatherCode: response.daily.weather_code[index],
    tempMax: response.daily.temperature_2m_max[index],
    tempMin: response.daily.temperature_2m_min[index],
    apparentTempMax: response.daily.apparent_temperature_max[index],
    apparentTempMin: response.daily.apparent_temperature_min[index],
    uvIndexMax: response.daily.uv_index_max[index],
    sunrise: response.daily.sunrise[index],
    sunset: response.daily.sunset[index],
    windSpeed: response.daily.wind_speed_10m_max[index],
    precipitationProbabilityMax: response.daily.precipitation_probability_max[index],
  }));
}
