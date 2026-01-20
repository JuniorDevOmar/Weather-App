import { WeatherResponse } from './current.weather.model';

export interface AirQualityUnits {
  time: string;
  interval: string;
  uv_index: string;
  pm10: string;
  pm2_5: string;
  carbon_monoxide: string;
  nitrogen_dioxide: string;
  sulphur_dioxide: string;
  ozone: string;
  ammonia: string;
  uv_index_clear_sky: string;
  dust: string;
  aerosol_optical_depth: string;
}

export interface CurrentAirQuality {
  time: string;
  interval: number;
  uv_index: number;
  pm10: number;
  pm2_5: number;
  carbon_monoxide: number;
  nitrogen_dioxide: number;
  sulphur_dioxide: number;
  ozone: number;
  ammonia: number;
  uv_index_clear_sky: number;
  dust: number;
  aerosol_optical_depth: number;
}

export interface AirQualityResponse extends WeatherResponse {
  current_units: AirQualityUnits;
  current: CurrentAirQuality;
}
