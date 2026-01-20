import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CurrentWeather } from '../ui/current-weather/current-weather';
import { HourlyWeather } from '../ui/hourly-weather/hourly-weather';
import { DailyWeather } from '../ui/daily-weather/daily-weather';
import { LocationService } from '../../../shared/services/location-service';

@Component({
  selector: 'app-weather-details',
  imports: [CurrentWeather, HourlyWeather, DailyWeather],
  templateUrl: './weather-details.html',
  styleUrl: './weather-details.scss',
})
export class WeatherDetails {
  readonly #route = inject(ActivatedRoute);
  readonly #locationService = inject(LocationService);
  readonly #city$ = this.#route.queryParamMap.pipe(
    map((params) => params.get('city')),
    filter((x) => x != null),
  );
  readonly #country$ = this.#route.queryParamMap.pipe(
    map((params) => params.get('country')),
    filter((x) => x != null),
  );
  readonly #latitude$ = this.#route.queryParamMap.pipe(
    map((params) => params.get('latitude')),
    filter((x) => x != null),
  );
  readonly #longitude$ = this.#route.queryParamMap.pipe(
    map((params) => params.get('longitude')),
    filter((x) => x != null),
  );

  readonly #city = toSignal(this.#city$, { initialValue: '' });
  readonly #country = toSignal(this.#country$, { initialValue: '' });
  readonly location = computed(() => {
    return { city: this.#city(), country: this.#country() };
  });
  readonly #latitude = toSignal(this.#latitude$, { initialValue: '' });
  readonly #longitude = toSignal(this.#longitude$, { initialValue: '' });
  readonly #coordinates = computed(() => ({ lat: this.#latitude(), lng: this.#longitude() }));
  readonly #coordinates$ = toObservable(this.#coordinates);

  readonly #currentWeather$ = this.#locationService.trigger$.pipe(
    switchMap(() =>
      this.#coordinates$.pipe(
        filter((coords) => coords.lat != null && coords.lng != null),
        switchMap((coords) => this.#locationService.getCurrentWeather(coords.lat, coords.lng)),
      ),
    ),
  );

  readonly #hourlyWeather$ = this.#locationService.trigger$.pipe(
    switchMap(() =>
      this.#coordinates$.pipe(
        filter((coords) => coords.lat != null && coords.lng != null),
        switchMap((coords) => this.#locationService.getHourlyWeather(coords.lat, coords.lng)),
      ),
    ),
  );
  readonly #dailyWeather$ = this.#locationService.trigger$.pipe(
    switchMap(() =>
      this.#coordinates$.pipe(
        filter((coords) => coords.lat != null && coords.lng != null),
        switchMap((coords) => this.#locationService.getDailyWeather(coords.lat, coords.lng)),
      ),
    ),
  );

  readonly currentWeather = toSignal(this.#currentWeather$, { initialValue: null });
  readonly hourlyWeather = toSignal(this.#hourlyWeather$, { initialValue: null });
  readonly dailyWeather = toSignal(this.#dailyWeather$, { initialValue: null });

  readonly loading = this.#locationService.loading;

  onRefresh() {
    this.#locationService.refresh();
  }
}
