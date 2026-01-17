import {Component, computed, input} from '@angular/core';
import {NgOptimizedImage, NgStyle, NgTemplateOutlet} from '@angular/common';
import {mapToIcon, mapToWeatherIcon} from '../../shared/icon.util';
import {HourlyDataPoint} from '../../model/hourly.weather.model';
import {getWeatherDescription} from '../../shared/description.util';
import {getWindRotation} from '../../shared/function.util';

@Component({
  selector: 'app-carousel-ui-component',
  imports: [
    NgOptimizedImage,
    NgTemplateOutlet,
    NgStyle
  ],
  templateUrl: './carousel-ui-component.html',
  styleUrl: './carousel-ui-component.scss',
})
export class CarouselUiComponent {
  timestamp = input.required<string>();
  data = input.required<HourlyDataPoint>();
  windUnit = computed(() => this.data().windSpeedUnit)
  /*
  DERIVED STATE
   */
  temperature = computed(() => Math.round(this.data().temperature));
  temperatureUnit = computed(() => this.data().temperatureUnit);
  apparentTemperature = computed(() => Math.round(this.data().apparentTemperature));
  rainChance = computed(() => this.data().precipitation_probability);
  rainUnits = computed(() => this.data().precipitation_probability_units);
  weatherCode = computed(() => this.data().weatherCode);
  windSpeed = computed(() => this.data().windSpeed);
  windDirection = computed(() => this.data().windDirection);
  isDay = computed(() => this.data().isDay);
  protected readonly mapToWeatherIcon = mapToWeatherIcon;
  protected readonly getWeatherDescription = getWeatherDescription;
  protected readonly mapToIcon = mapToIcon;
  protected readonly getWindRotation = getWindRotation;
}
