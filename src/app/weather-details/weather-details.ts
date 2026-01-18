import {Component, computed, inject, signal} from '@angular/core';
import {CardUiComponent} from '../ui/card-ui-component/card-ui-component';
import {DatePipe, NgOptimizedImage, NgStyle} from '@angular/common';
import {CarouselUiComponent} from '../ui/carousel-ui-component/carousel-ui-component';
import {mapToIcon, mapToWeatherIcon, mapUVIndexToIcon} from '../shared/icon.util';
import {ActivatedRoute} from '@angular/router';
import {filter, map, switchMap} from 'rxjs';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {WeatherInfo} from '../services/weather-info';
import {transformHourlyData} from '../model/hourly.weather.model';
import {Carousel} from 'primeng/carousel';
import {convertToKm, getWindRotation} from '../shared/function.util';
import {transformDailyData} from '../model/daily.weather.model';
import {getWeatherDescription} from '../shared/description.util';

@Component({
  selector: 'app-weather-details',
  imports: [
    CardUiComponent,
    DatePipe,
    CarouselUiComponent,
    NgOptimizedImage,
    Carousel,
    NgStyle,
  ],
  templateUrl: './weather-details.html',
  styleUrl: './weather-details.scss',
})
export class WeatherDetails {
  readonly #route = inject(ActivatedRoute);
  readonly #service: WeatherInfo = inject(WeatherInfo);
  readonly #date = signal(new Date());
  currentDate = computed(() => this.#date());

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
  readonly isDay = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return 0;
    return weather.current.is_day;
  });
  readonly weatherCode = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return 0;
    return weather.current.weather_code;
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
  readonly relativeHumidity = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return 0;
    return weather.current.relative_humidity_2m;
  })
  readonly relativeHumidityUnit = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return '';
    return weather.current_units.relative_humidity_2m;
  })
  readonly visibility = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return 0;
    return weather.current.visibility;
  })
  readonly visibilityUnit = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return '';
    return weather.current_units.visibility;
  })
  readonly windSpeed = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return 0;
    return weather.current.wind_speed_10m;
  })
  readonly windSpeedUnit = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return '';
    return weather.current_units.wind_speed_10m;
  })
  readonly windSpeedDirection = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return 0;
    return weather.current.wind_direction_10m;
  });
  readonly windGusts = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return 0;
    return weather.current.wind_gusts_10m;
  })
  readonly windGustsUnit = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return '';
    return weather.current_units.wind_gusts_10m;
  })
  readonly pressure = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return 0;
    return weather.current.pressure_msl;
  });
  readonly pressureUnit = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return '';
    return weather.current_units.pressure_msl;
  });
  readonly dewPoint = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return 0;
    return Math.round(weather.current.dew_point_2m);
  })
  readonly dewPointUnit = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return '';
    return weather.current_units.dew_point_2m;
  })
  readonly cloudCover = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return 0;
    return weather.current.cloud_cover;
  });
  readonly cloudCoverUnit = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return '';
    return weather.current_units.cloud_cover;
  })
  /*
  DAILY WEATHER
   */
  private dailyWeather$ = toObservable(this.coordinates)
    .pipe(filter(coords => coords.lat != null && coords.lng != null),
      switchMap(coords => this.#service.getDailyWeatherInfo(coords.lat, coords.lng))
    );
  readonly dailyWeather = toSignal(this.dailyWeather$, {initialValue: null});
  readonly dailyDataPoints = computed(() => {
    const dailyWeather = this.dailyWeather();
    if (dailyWeather == null) return [];
    return transformDailyData(dailyWeather);
  });
  readonly currentDayDataPoint = computed(() => {
      const date = this.#date().toISOString().slice(0, this.#date().toISOString().indexOf('T'));
      console.log(date);
      return this.dailyDataPoints().find(datapoint => datapoint.date == date)
    }
  );
  readonly currentDayMax = computed(() => {
    const today = this.currentDayDataPoint();
    if (today == null) return 0;
    return today.tempMax;
  });
  readonly currentDayMin = computed(() => {
    const today = this.currentDayDataPoint();
    if (today == null) return 0;
    return today.tempMin;
  })

  /*
  HOURLY WEATHER
   */
  private hourlyWeather$ = toObservable(this.coordinates)
    .pipe(filter(coords => coords.lat != null && coords.lng != null),
      switchMap(coords => this.#service.getHourlyWeatherInfo(coords.lat, coords.lng))
    );

  readonly hourlyWeather = toSignal(this.hourlyWeather$, {initialValue: null});

  hourlyDataPoints = computed(() => {
    const hourlyData = this.hourlyWeather();
    if (hourlyData == null) return [];
    return transformHourlyData(hourlyData);
  });

  /*
  AIR QUALITY
   */
  private airQuality$ = toObservable(
    computed(() => ({latitude: this.latitude(), longitude: this.longitude()}))
  ).pipe(
    filter(coords => coords.latitude != null && coords.longitude != null),
    switchMap(coords => this.#service.getAirQualityInfo(coords.latitude, coords.longitude))
  );

  airQuality = toSignal(this.airQuality$, {initialValue: null});

  uvIndex = computed(() => {
    const airQuality = this.airQuality();
    if (airQuality == null) return 0;
    return airQuality.current.uv_index;
  });
  roundedUvIndex = computed(() => Math.round(this.uvIndex()));

  /*
  HELPERS
   */
  getTimestamp(time: string) {
    return time.slice(time.indexOf('T') + 1, time.length);
  }

  summary = computed(() => {
    return 'Chance of rain: ' + this.rainChance() + '%'
  });

  protected readonly mapUVIndexToIcon = mapUVIndexToIcon;
  protected readonly mapToWeatherIcon = mapToWeatherIcon;
  protected readonly mapToIcon = mapToIcon;
  protected readonly convertToKm = convertToKm;
  protected readonly getWeatherDescription = getWeatherDescription;
  protected readonly getWindRotation = getWindRotation;
}
