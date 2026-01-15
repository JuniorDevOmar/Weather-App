import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {City, Geocode} from '../model/geocode';

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
  readonly #httpClient = inject(HttpClient);
  readonly #url: string = "https://api.open-meteo.com/v1/forecast?latitude=51.51&longitude=-0.13&timezone=Europe/London&hourly=temperature_2m"
  readonly #geocoding_url: string = `https://geocoding-api.open-meteo.com/v1/search?name=`;

  public getGeocodedInfo(location: string): Observable<City[]> {
    const url = this.#geocoding_url + location;
    return this.#httpClient.get<Geocode>(url)
      .pipe(
        map(res => res.results || [])
      );
  }
}
