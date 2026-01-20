import {Component, computed, input} from '@angular/core';
import {
  DailyWeatherResponse,
  transformDailyData,
} from '../../../../shared/model/daily.weather.model';
import {TableModule} from 'primeng/table';
import {mapToWeatherIcon} from '../../../../shared/utils/icon.util';
import {NgOptimizedImage} from '@angular/common';
import {getWeatherDescription} from '../../../../shared/utils/description.util';
import {getTimestamp} from '../../../../shared/utils/function.util';

@Component({
  selector: 'app-daily-weather',
  imports: [TableModule, NgOptimizedImage],
  templateUrl: './daily-weather.html',
  styleUrl: './daily-weather.scss',
})
export class DailyWeather {
  data = input.required<DailyWeatherResponse>();
  dataPoints = computed(() => transformDailyData(this.data()));
  protected readonly mapToWeatherIcon = mapToWeatherIcon;
  protected readonly getWeatherDescription = getWeatherDescription;
  protected readonly getTimestamp = getTimestamp;
}
