import {Component, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {WeatherSearchForm} from '../weather-search-form/weather-search-form';
import {WeatherInfo} from '../services/weather-info';
import {City} from '../model/geocode';

@Component({
  selector: 'app-top-nav',
  imports: [
    FormsModule,
    WeatherSearchForm
  ],
  templateUrl: './top-nav.html',
  styleUrl: './top-nav.scss',
})
export class TopNav {
  #service: WeatherInfo = inject(WeatherInfo);
  searchResults = signal<City[]>([]);

  onSearch(query: string) {
    if (!query) {
      this.searchResults.set([]);
      return;
    }

    this.#service.getGeocodedInfo(query).pipe(
    ).subscribe(res => {
        this.searchResults.set([]);
        this.searchResults().push(...res)
      }
    );
  }
}
