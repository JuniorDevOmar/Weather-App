import {Component, input} from '@angular/core';
import {NgOptimizedImage, NgTemplateOutlet} from '@angular/common';
import {mapToWeatherIcon} from '../../shared/icon.util';

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
  rainChance = input.required<number>();
  rainUnits = input.required<string>();
  weatherIcon = input<string>('0');
  temperature = input.required<number>();
  protected readonly mapToIcon = mapToWeatherIcon;
}
