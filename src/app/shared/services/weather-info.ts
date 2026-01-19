import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {City, Geocode} from '../model/geocode';
import {CurrentWeatherResponse} from '../model/current.weather.model';
import {HourlyWeatherResponse} from '../model/hourly.weather.model';
import {AirQualityResponse} from '../model/air.quality.model';
import {DailyWeatherResponse} from '../model/daily.weather.model';
import {CURRENT_DAY_FIELDS, DAILY_FIELDS, HOURLY_FIELDS} from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class WeatherInfo {
  // TODO: [code] rm special characters in display @see City#timezone
  // TODO: [design] maybe default to Cape Town or something; does it make sense to ask for user location perms?
  // TODO: [code] implement a 'fetch' every ten minutes to update the temperature. Also have a refresh button for the user to force update.
  readonly #httpClient = inject(HttpClient);
  readonly #currentWeatherUrl: string = `https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&timezone=auto&current=${CURRENT_DAY_FIELDS.join(',')}`
  readonly #hourlyWeatherUrl: string = `https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&timezone=auto&forecast_days=2&hourly=${HOURLY_FIELDS.join(',')}`
  readonly #dailyWeatherUrl: string = `https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&timezone=auto&daily=${DAILY_FIELDS.join(',')}`
  readonly #geocoding_url: string = `https://geocoding-api.open-meteo.com/v1/search?name=`;

  public getGeocodedInfo(location: string): Observable<City[]> {
    const url = this.#geocoding_url + location;
    return this.#httpClient.get<Geocode>(url)
      .pipe(
        map(res => res.results || [])
      );
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
