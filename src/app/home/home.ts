import {Component, computed, signal} from '@angular/core';
import {CardUiComponent} from '../ui/card-ui-component/card-ui-component';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {mapToIcon} from '../shared/icon.util';
import {CarouselUiComponent} from '../ui/carousel-ui-component/carousel-ui-component';

@Component({
  selector: 'app-home',
  imports: [
    CardUiComponent,
    DatePipe,
    NgOptimizedImage,
    CarouselUiComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly #date = signal(new Date());
  date = computed(() => this.#date());
  protected readonly mapToIcon = mapToIcon;
}
