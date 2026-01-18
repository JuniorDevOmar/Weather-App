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

  readonly relativeHumidity = computed(() => this.currentWeather().current.relative_humidity_2m);
  readonly relativeHumidityUnit = computed(() => this.currentWeather().current_units.relative_humidity_2m);
  readonly visibility = computed(() => this.currentWeather().current.visibility);
  readonly visibilityUnit = computed(() => this.currentWeather().current_units.visibility);
  readonly windSpeed = computed(() => this.currentWeather().current.wind_speed_10m);
  readonly windSpeedUnit = computed(() => this.currentWeather().current_units.wind_speed_10m);
  readonly windGusts = computed(() => this.currentWeather().current.wind_gusts_10m);
  readonly windGustsUnit = computed(() => this.currentWeather().current_units.wind_gusts_10m);
  readonly cloudCover = computed(() => this.currentWeather().current.cloud_cover);
  readonly cloudCoverUnit = computed(() => this.currentWeather().current_units.cloud_cover);
  readonly uvIndex = computed(() => this.airQuality().current.uv_index);
  readonly roundedUvIndex = computed(() => Math.round(this.uvIndex()));

  protected readonly mapToIcon = mapToIcon;
  protected readonly mapUVIndexToIcon = mapUVIndexToIcon;
  protected readonly convertToKm = convertToKm;
}
