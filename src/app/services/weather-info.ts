import {inject, Injectable} from '@angular/core';
import {map} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherInfo {
  // TODO: [code] rm hardcoded values
  // TODO: [code] replace any with type
  // TODO: [design] maybe default to Cape Town or something; does it make sense to ask for user location perms?
  readonly #httpClient = inject(HttpClient);
  readonly #url: string = "https://api.open-meteo.com/v1/forecast?latitude=51.51&longitude=-0.13&timezone=Europe/London&hourly=temperature_2m"
  readonly #geocoding_url: string = `https://geocoding-api.open-meteo.com/v1/search?name=`;

  public getGeocodedInfo(location: string) {
    const url = this.#geocoding_url + location;
    return this.#httpClient.get<any>(url)
      .pipe(
        map(res => res.results || [])
      );
  }
}
