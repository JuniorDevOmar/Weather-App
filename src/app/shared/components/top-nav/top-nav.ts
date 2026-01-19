import {Component, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {WeatherSearchForm} from '../weather-search-form/weather-search-form';
import {WeatherInfo} from '../../services/weather-info';
import {City} from '../../model/geocode';
import {Router} from '@angular/router';

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
  #router: Router = inject(Router);
  #service: WeatherInfo = inject(WeatherInfo);
  searchResults = signal<City[]>([]);
  loading = signal(false);

  onSearch(query: string) {
    this.loading.set(true);
    if (!query) {
      this.searchResults.set([]);
      this.loading.set(false);
      return;
    }
    this.#service.getGeocodedInfo(query).pipe(
    ).subscribe({
        next: (city) => {
          this.searchResults.set([]);
          this.searchResults().push(...city)
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      }
    );
  }

  onSelected(city: City) {
    this.#router.navigate(['/weather'], {
      queryParams: {
        city: city.name,
        latitude: city.latitude,
        longitude: city.longitude
      }
    }).then();
  }
}
