import {Component, computed, input} from '@angular/core';
import {CardUiComponent} from '../card-ui-component/card-ui-component';
import {Carousel} from 'primeng/carousel';
import {CarouselUiComponent} from '../carousel-ui-component/carousel-ui-component';
import {HourlyWeatherResponse, transformHourlyData} from '../../model/hourly.weather.model';
import {getTimestamp} from '../../shared/function.util';

@Component({
  selector: 'app-hourly-weather',
  imports: [
    CardUiComponent,
    Carousel,
    CarouselUiComponent
  ],
  templateUrl: './hourly-weather.html',
  styleUrl: './hourly-weather.scss',
})
export class HourlyWeather {
  hourlyWeather = input.required<HourlyWeatherResponse>();
  hourlyDataPoints = computed(() => transformHourlyData(this.hourlyWeather()));
  protected readonly getTimestamp = getTimestamp;
}
