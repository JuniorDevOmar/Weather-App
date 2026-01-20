import { computed, inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { WeatherInfo } from './weather-info';
import { CurrentWeatherResponse } from '../model/current.weather.model';
import { HourlyWeatherResponse } from '../model/hourly.weather.model';
import { DailyWeatherResponse } from '../model/daily.weather.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  #service = inject(WeatherInfo);
  #refresh$ = new BehaviorSubject<void>(undefined);
  trigger$ = this.#refresh$.asObservable();

  readonly currentWeather = signal<CurrentWeatherResponse | null>(null);
  readonly hourlyWeather = signal<HourlyWeatherResponse | null>(null);
  readonly dailyWeather = signal<DailyWeatherResponse | null>(null);

  readonly loading = computed(
    () =>
      this.currentWeather() == null || this.hourlyWeather() == null || this.dailyWeather() == null,
  );

  public getCurrentWeather(
    latitude: string,
    longitude: string,
  ): Observable<CurrentWeatherResponse> {
    return this.#service
      .getCurrentWeatherInfo(latitude, longitude)
      .pipe(tap((data) => this.currentWeather.set(data)));
  }

  public getDailyWeather(latitude: string, longitude: string): Observable<DailyWeatherResponse> {
    return this.#service
      .getDailyWeatherInfo(latitude, longitude)
      .pipe(tap((data) => this.dailyWeather.set(data)));
  }

  public getHourlyWeather(latitude: string, longitude: string): Observable<HourlyWeatherResponse> {
    return this.#service
      .getHourlyWeatherInfo(latitude, longitude)
      .pipe(tap((data) => this.hourlyWeather.set(data)));
  }

  refresh() {
    this.currentWeather.set(null);
    this.hourlyWeather.set(null);
    this.dailyWeather.set(null);
    this.#refresh$.next();
  }
}
