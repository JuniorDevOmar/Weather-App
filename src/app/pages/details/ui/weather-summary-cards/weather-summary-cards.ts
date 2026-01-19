import {Component, computed, input} from '@angular/core';
import {
  CardUiComponent
} from '../../../../shared/components/ui/card-ui-component/card-ui-component';
import {NgOptimizedImage} from '@angular/common';
import {mapToIcon, mapUVIndexToIcon} from '../../../../shared/utils/icon.util';
import {convertToKm} from '../../../../shared/utils/function.util';
import {CurrentWeatherResponse} from '../../../../shared/model/current.weather.model';

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

  protected readonly mapToIcon = mapToIcon;
  protected readonly convertToKm = convertToKm;
}
