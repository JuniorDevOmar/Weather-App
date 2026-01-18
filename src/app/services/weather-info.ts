import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {City, Geocode} from '../model/geocode';
import {CurrentWeatherResponse} from '../model/current.weather.model';
import {HourlyWeatherResponse} from '../model/hourly.weather.model';
import {AirQualityResponse} from '../model/air.quality.model';
import {DailyWeatherResponse} from '../model/daily.weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherInfo {
  // TODO: [code] rm hardcoded values
  // TODO: [code] rm special characters in display @see City#timezone
  // TODO: [design] maybe default to Cape Town or something; does it make sense to ask for user location perms?
  // TODO: [design] maybe add a loading indicator
  // TODO: [code] fallback for if the call was successful but no results were returned
  // TODO: [code] mv all the additional parameters somewhere else?
  // TODO: [code] implement a 'fetch' every ten minutes to update the temperature. Also have a refresh button for the user to force update.
  // TODO: [design] when mapping icons, check response for `is_day` and use the appropriate icon(2d = day, 2n = night).
  readonly #httpClient = inject(HttpClient);
  readonly #currentWeatherUrl: string = "https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&timezone=auto&current=relative_humidity_2m&current=visibility,temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m"
  // TODO: [consider] a filter to let them increase the range of future forecasts
  readonly #hourlyWeatherUrl: string = "https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&timezone=auto&forecast_days=2&hourly=temperature_2m,is_day,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,visibility,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m"
  readonly #dailyWeatherUrl: string = "https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&daily=weather_code,temperature_2m_max,apparent_temperature_max,temperature_2m_min,apparent_temperature_min,precipitation_hours,uv_index_max,precipitation_probability_max,dew_point_2m_max,visibility_max&timezone=auto"
  readonly #geocoding_url: string = `https://geocoding-api.open-meteo.com/v1/search?name=`;
  readonly #airquality_url: string = 'https://air-quality-api.open-meteo.com/v1/air-quality?latitude={latitude}&longitude={longitude}&current=uv_index,european_aqi,us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,ammonia,uv_index_clear_sky,dust,aerosol_optical_depth';

  //TODO: mv to own service
  public getGeocodedInfo(location: string): Observable<City[]> {
    const url = this.#geocoding_url + location;
    return this.#httpClient.get<Geocode>(url)
      .pipe(
        map(res => res.results || [])
      );
  }

  public getAirQualityInfo(latitude: string, longitude: string): Observable<AirQualityResponse> {
    const url = this.#airquality_url.replace('{latitude}', latitude).replace('{longitude}', longitude);
    return this.#httpClient.get<AirQualityResponse>(url);
  }

  public getCurrentWeatherInfo(latitude: string, longitude: string): Observable<CurrentWeatherResponse> {
    const url = this.#currentWeatherUrl.replace('{latitude}', latitude).replace('{longitude}', longitude);
    return this.#httpClient.get<CurrentWeatherResponse>(url);
  }

  public getDailyWeatherInfo(latitude: string, longitude: string): Observable<DailyWeatherResponse> {
    const url = this.#dailyWeatherUrl.replace('{latitude}', latitude).replace('{longitude}', longitude);
    return this.#httpClient.get<DailyWeatherResponse>(url);
  }

  public getHourlyWeatherInfo(latitude: string, longitude: string): Observable<HourlyWeatherResponse> {
    const url = this.#hourlyWeatherUrl.replace('{latitude}', latitude).replace('{longitude}', longitude);
    return this.#httpClient.get<HourlyWeatherResponse>(url);
  }
}
