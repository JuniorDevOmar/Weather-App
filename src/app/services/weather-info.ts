import {inject, Injectable} from '@angular/core';
import {map, Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {City, Geocode} from '../model/geocode';
import {CurrentWeatherResponse} from '../model/weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherInfo {
  // TODO: [code] rm hardcoded values
  // TODO: [code] replace any with type
  // TODO: [design] maybe default to Cape Town or something; does it make sense to ask for user location perms?
  // TODO: [design] maybe add a loading indicator
  // TODO: [code] fallback for if the call was successful but no results were returned
  // TODO: [code] rm special characters in display @see City#timezone
  // TODO: [code] mv all the additional parameters somewhere else?
  // TODO: [code] implement a 'fetch' every ten minutes to update the temperature. Also have a refresh button for the user to force update.
  readonly #httpClient = inject(HttpClient);
  readonly #url: string = "https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&timezone=auto&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m"
  readonly #geocoding_url: string = `https://geocoding-api.open-meteo.com/v1/search?name=`;

  public getGeocodedInfo(location: string): Observable<City[]> {
    const url = this.#geocoding_url + location;
    return this.#httpClient.get<Geocode>(url)
      .pipe(
        map(res => res.results || [])
      );
  }

  public getCurrentWeatherInfo(latitude: string, longitude: string): Observable<CurrentWeatherResponse> {
    const url = this.#url.replace('{latitude}', latitude).replace('{longitude}', longitude);
    return this.#httpClient.get<CurrentWeatherResponse>(url).pipe(tap(console.log));
  }
}
