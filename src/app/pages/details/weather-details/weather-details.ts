import {Component, computed, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {filter, map, switchMap} from 'rxjs';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {WeatherInfo} from '../../../shared/services/weather-info';
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
  readonly #service = inject(WeatherInfo);
  readonly #city$ = this.#route.queryParamMap.pipe(
    map(params => params.get('city')),
    filter(x => x != null),
  );
  readonly #country$ = this.#route.queryParamMap.pipe(
    map(params => params.get('country')),
    filter(x => x != null),
  );
  readonly #latitude$ = this.#route.queryParamMap.pipe(
    map(params => params.get('latitude')),
    filter(x => x != null),
  );
  readonly #longitude$ = this.#route.queryParamMap.pipe(
    map(params => params.get('longitude')),
    filter(x => x != null),
  );

  readonly #city = toSignal(this.#city$, {initialValue: ''})
  readonly #country = toSignal(this.#country$, {initialValue: ''})
  readonly location = computed(() => {
    return {city: this.#city(), country: this.#country()};
  });
  readonly #latitude = toSignal(this.#latitude$, {initialValue: ''});
  readonly #longitude = toSignal(this.#longitude$, {initialValue: ''});
  readonly #coordinates = computed(() => ({lat: this.#latitude(), lng: this.#longitude()}));

  readonly #currentWeather$ = toObservable(this.#coordinates)
    .pipe(filter(coords => coords.lat != null && coords.lng != null),
      switchMap(coords => this.#service.getCurrentWeatherInfo(coords.lat, coords.lng))
    );
  readonly #hourlyWeather$ = toObservable(this.#coordinates)
    .pipe(filter(coords => coords.lat != null && coords.lng != null),
      switchMap(coords => this.#service.getHourlyWeatherInfo(coords.lat, coords.lng))
    );

  readonly currentWeather = toSignal(this.#currentWeather$, {initialValue: null});
  readonly hourlyWeather = toSignal(this.#hourlyWeather$, {initialValue: null});

  readonly loading = computed(() =>
    this.currentWeather() == null || this.hourlyWeather() == null
  );
}
