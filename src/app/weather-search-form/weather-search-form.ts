import {Component, effect, input, output, signal, untracked} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from 'rxjs';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {City} from '../model/geocode';

@Component({
  selector: 'app-weather-search-form',
  imports: [
    FormsModule
  ],
  templateUrl: './weather-search-form.html',
  styleUrl: './weather-search-form.scss',
})
export class WeatherSearchForm {
  results = input<City[]>([]);
  onSearch = output<string>();
  onSelected = output<City>();
  searchQuery = signal('');

  isFocused = signal<boolean>(false);


  debouncedSearchQuery = toSignal(
    toObservable(this.searchQuery).pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ),
    {initialValue: ''}
  );

  constructor() {
    effect(() => {
      const query = this.debouncedSearchQuery();
      if (query) {
        untracked(() => this.onSearch.emit(query));
      } else {
        this.onSearch.emit('');
      }
    });
  }

  onSelect(location: City) {
    this.onSelected.emit(location);
  }

  onFocus(): void {
    this.isFocused.set(true);
  }

  onBlur(): void {
    this.isFocused.set(false);
  }
}
