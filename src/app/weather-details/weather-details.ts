import {Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {filter, map, switchMap} from 'rxjs';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {WeatherInfo} from '../services/weather-info';
import {CurrentWeather} from '../ui/current-weather/current-weather';
import {HourlyWeather} from '../ui/hourly-weather/hourly-weather';
import {WeatherSummaryCards} from '../ui/weather-summary-cards/weather-summary-cards';

@Component({
  selector: 'app-weather-details',
  imports: [
    CurrentWeather,
    HourlyWeather,
    WeatherSummaryCards,
  ],
  templateUrl: './weather-details.html',
  styleUrl: './weather-details.scss',
})
export class WeatherDetails {
  readonly #route = inject(ActivatedRoute);
  readonly #service: WeatherInfo = inject(WeatherInfo);

  latitude$ = this.#route.queryParamMap.pipe(
    map(params => params.get('latitude')),
    filter(x => x != null),
  );

  longitude$ = this.#route.queryParamMap.pipe(
    map(params => params.get('longitude')),
    filter(x => x != null),
  );

  readonly latitude = toSignal(this.latitude$, {initialValue: ''});
  readonly longitude = toSignal(this.longitude$, {initialValue: ''});
  readonly coordinates = computed(() => ({lat: this.latitude(), lng: this.longitude()}));

  private currentWeather$ = toObservable(this.coordinates)
    .pipe(filter(coords => coords.lat != null && coords.lng != null),
      switchMap(coords => this.#service.getCurrentWeatherInfo(coords.lat, coords.lng))
    );


  private hourlyWeather$ = toObservable(this.coordinates)
    .pipe(filter(coords => coords.lat != null && coords.lng != null),
      switchMap(coords => this.#service.getHourlyWeatherInfo(coords.lat, coords.lng))
    );

  private airQuality$ = toObservable(this.coordinates)
    .pipe(
      filter(coords => coords.lat != null && coords.lng != null),
      switchMap(coords => this.#service.getAirQualityInfo(coords.lat, coords.lng))
    );

  readonly currentWeather = toSignal(this.currentWeather$, {initialValue: null});
  readonly hourlyWeather = toSignal(this.hourlyWeather$, {initialValue: null});
  readonly airQuality = toSignal(this.airQuality$, {initialValue: null});
}
