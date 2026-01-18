import {Component, computed, input} from '@angular/core';
import {CardUiComponent} from '../card-ui-component/card-ui-component';
import {NgOptimizedImage} from '@angular/common';
import {mapToIcon, mapUVIndexToIcon} from '../../shared/icon.util';
import {convertToKm} from '../../shared/function.util';
import {AirQualityResponse} from '../../model/air.quality.model';
import {CurrentWeatherResponse} from '../../model/current.weather.model';

@Component({
  selector: 'app-weather-summary-cards',
  imports: [
    CardUiComponent,
    NgOptimizedImage
  ],
  templateUrl: './weather-summary-cards.html',
  styleUrl: './weather-summary-cards.scss',
})
export class WeatherSummaryCards {
  currentWeather = input.required<CurrentWeatherResponse>();
  airQuality = input.required<AirQualityResponse>();

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
  readonly windGusts = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return 0;
    return weather.current.wind_gusts_10m;
  });
  readonly windGustsUnit = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return '';
    return weather.current_units.wind_gusts_10m;
  });
  readonly cloudCover = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return 0;
    return weather.current.cloud_cover;
  });
  readonly cloudCoverUnit = computed(() => {
    const weather = this.currentWeather();
    if (weather == null) return '';
    return weather.current_units.cloud_cover;
  });
  readonly uvIndex = computed(() => {
    const airQuality = this.airQuality();
    if (airQuality == null) return 0;
    return airQuality.current.uv_index;
  });
  readonly roundedUvIndex = computed(() => Math.round(this.uvIndex()));

  protected readonly mapToIcon = mapToIcon;
  protected readonly mapUVIndexToIcon = mapUVIndexToIcon;
  protected readonly convertToKm = convertToKm;
}
