import {Component, computed, input} from '@angular/core';
import {NgOptimizedImage, NgTemplateOutlet} from '@angular/common';
import {mapToIcon, mapToWeatherIcon} from '../../shared/icon.util';
import {HourlyDataPoint} from '../../model/hourly.weather.model';

@Component({
  selector: 'app-carousel-ui-component',
  imports: [
    NgOptimizedImage,
    NgTemplateOutlet
  ],
  templateUrl: './carousel-ui-component.html',
  styleUrl: './carousel-ui-component.scss',
})
export class CarouselUiComponent {
  timestamp = input.required<string>();
  data = input.required<HourlyDataPoint>();

  /*
  DERIVED STATE
   */
  temperature = computed(() => Math.round(this.data().temperature));
  rainChance = computed(() => this.data().precipitation_probability);
  rainUnits = computed(() => this.data().precipitation_probability_units);
  weatherCode = computed(() => this.data().weatherCode);
  isDay = computed(() => this.data().isDay);
  protected readonly mapToWeatherIcon = mapToWeatherIcon;
}
