import {Component, computed, input, signal} from '@angular/core';
import {CardUiComponent} from "../../../../shared/components/ui/card-ui-component/card-ui-component";
import {DatePipe, NgOptimizedImage, NgStyle} from "@angular/common";
import {convertToKm, getTimestamp, getWindRotation} from '../../../../shared/utils/function.util';
import {mapToWeatherIcon} from '../../../../shared/utils/icon.util';
import {getWeatherDescription} from '../../../../shared/utils/description.util';
import {CurrentWeatherResponse} from '../../../../shared/model/current.weather.model';

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
  location = input.required<string>();
  currentWeather = input.required<CurrentWeatherResponse>();
  readonly timestamp = computed(() => {
    const time = this.currentWeather().current.time;
    return getTimestamp(time);
  });
  readonly isDay = computed(() => this.currentWeather().current.is_day);
  readonly weatherCode = computed(() => this.currentWeather().current.weather_code);
  readonly currentTemperature = computed(() => Math.round(this.currentWeather().current.temperature_2m));
  readonly apparentTemperature = computed(() => Math.round(this.currentWeather().current.apparent_temperature));
  readonly currentTemperatureUnit = computed(() => this.currentWeather().current_units.temperature_2m);
  readonly windSpeed = computed(() => this.currentWeather().current.wind_speed_10m);
  readonly windSpeedUnit = computed(() => this.currentWeather().current_units.wind_speed_10m);
  readonly windSpeedDirection = computed(() => this.currentWeather().current.wind_direction_10m);
  readonly rainChance = computed(() => this.currentWeather().current.rain);
  readonly rainUnit = computed(() => this.currentWeather().current_units.rain);
  readonly pressure = computed(() => this.currentWeather().current.pressure_msl);
  readonly pressureUnit = computed(() => this.currentWeather().current_units.pressure_msl);
  readonly dewPoint = computed(() => Math.round(this.currentWeather().current.dew_point_2m));
  readonly dewPointUnit = computed(() => this.currentWeather().current_units.dew_point_2m);
  readonly visibility = computed(() => this.currentWeather().current.visibility);
  readonly visibilityUnit = computed(() => this.currentWeather().current_units.visibility);
  readonly relativeHumidity = computed(() => this.currentWeather().current.relative_humidity_2m);
  readonly relativeHumidityUnit = computed(() => this.currentWeather().current_units.relative_humidity_2m);

  readonly summary = computed(() => {
    return 'Chance of rain: ' + this.rainChance() + '%'
  });
  protected readonly convertToKm = convertToKm;
  protected readonly mapToWeatherIcon = mapToWeatherIcon;
  protected readonly getWindRotation = getWindRotation;
  protected readonly getWeatherDescription = getWeatherDescription;
}
