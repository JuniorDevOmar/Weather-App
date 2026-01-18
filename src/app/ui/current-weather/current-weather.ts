import {Component, computed, input, signal} from '@angular/core';
import {CardUiComponent} from "../card-ui-component/card-ui-component";
import {DatePipe, NgOptimizedImage, NgStyle} from "@angular/common";
import {convertToKm, getTimestamp, getWindRotation} from '../../shared/function.util';
import {mapToWeatherIcon} from '../../shared/icon.util';
import {getWeatherDescription} from '../../shared/description.util';
import {CurrentWeatherResponse} from '../../model/current.weather.model';

@Component({
  selector: 'app-current-weather',
  imports: [
    CardUiComponent,
    DatePipe,
    NgOptimizedImage,
    NgStyle
  ],
  templateUrl: './current-weather.html',
  styleUrl: './current-weather.scss',
})
export class CurrentWeather {
  readonly #date = signal(new Date());
  currentDate = computed(() => this.#date());
  currentWeather = input.required<CurrentWeatherResponse>();
  readonly timestamp = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return '';
    const time = weather.current.time;
    return getTimestamp(time);
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
  });
  readonly windSpeed = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return 0;
    return weather.current.wind_speed_10m;
  });
  readonly windSpeedUnit = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return '';
    return weather.current_units.wind_speed_10m;
  });
  readonly windSpeedDirection = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return 0;
    return weather.current.wind_direction_10m;
  });
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
  });
  readonly dewPointUnit = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return '';
    return weather.current_units.dew_point_2m;
  });
  readonly visibility = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return 0;
    return weather.current.visibility;
  });
  readonly visibilityUnit = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return '';
    return weather.current_units.visibility;
  });
  readonly relativeHumidity = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return 0;
    return weather.current.relative_humidity_2m;
  });
  readonly relativeHumidityUnit = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return '';
    return weather.current_units.relative_humidity_2m;
  });
  readonly summary = computed(() => {
    return 'Chance of rain: ' + this.rainChance() + '%'
  });
  protected readonly convertToKm = convertToKm;
  protected readonly mapToWeatherIcon = mapToWeatherIcon;
  protected readonly getWindRotation = getWindRotation;
  protected readonly getWeatherDescription = getWeatherDescription;
}
