import {Component, computed, inject, signal} from '@angular/core';
import {CardUiComponent} from '../ui/card-ui-component/card-ui-component';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {CarouselUiComponent} from '../ui/carousel-ui-component/carousel-ui-component';
import {mapToIcon} from '../shared/icon.util';
import {ActivatedRoute} from '@angular/router';
import {filter, map, switchMap} from 'rxjs';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {WeatherInfo} from '../services/weather-info';
import {transformHourlyData} from '../model/hourly.weather.model';
import {Carousel} from 'primeng/carousel';

@Component({
  selector: 'app-weather-details',
  imports: [
    CardUiComponent,
    DatePipe,
    CarouselUiComponent,
    NgOptimizedImage,
    Carousel
  ],
  templateUrl: './weather-details.html',
  styleUrl: './weather-details.scss',
})
export class WeatherDetails {
  readonly #route = inject(ActivatedRoute);
  readonly #service: WeatherInfo = inject(WeatherInfo);
  readonly #date = signal(new Date());
  date = computed(() => this.#date());
  protected readonly mapToIcon = mapToIcon;

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

  private currentWeather$ = toObservable(
    computed(() => ({lat: this.latitude(), lng: this.longitude()}))
  ).pipe(
    filter(coords => coords.lat != null && coords.lng != null),
    switchMap(coords => this.#service.getCurrentWeatherInfo(coords.lat, coords.lng))
  );

  /*
  ================================
  DERIVED STATED FROM RESPONSE
  ================================
   */
  readonly currentWeather = toSignal(this.currentWeather$, {initialValue: null});
  readonly timestamp = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return '';
    const time = weather.current.time;
    return this.getTimestamp(time);
  });
  readonly currentTemperature = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return 0;
    return Math.round(weather.current.temperature_2m);
  });
  readonly apparentTemperature = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return 0;
    return Math.round(weather.current.apparent_temperature);
  });
  readonly currentTemperatureUnit = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return '';
    return weather.current_units.temperature_2m;
  })
  readonly rainChance = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return 0;
    return weather.current.rain;
  });

  readonly rainUnit = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return '';
    return weather.current_units.rain;
  });

  /*
  HOURLY WEATHER
   */
  private hourlyWeather$ = toObservable(
    computed(() => ({lat: this.latitude(), lng: this.longitude()}))
  ).pipe(
    filter(coords => coords.lat != null && coords.lng != null),
    switchMap(coords => this.#service.getHourlyWeatherInfo(coords.lat, coords.lng))
  );

  readonly hourlyWeather = toSignal(this.hourlyWeather$, {initialValue: null});

  hourlyDataPoints = computed(() => {
    const hourlyData = this.hourlyWeather();
    if (hourlyData == null) return [];
    return transformHourlyData(hourlyData);
  });

  /*
  HELPERS
   */
  getTimestamp(time: string) {
    return time.slice(time.indexOf('T') + 1, time.length);
  }
}
