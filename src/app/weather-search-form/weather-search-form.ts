import {Component, effect, input, output, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from 'rxjs';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {City} from '../model/geocode';
import {InputText} from 'primeng/inputtext';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-weather-search-form',
  imports: [
    FormsModule,
    InputText,
    NgClass
  ],
  templateUrl: './weather-search-form.html',
  styleUrl: './weather-search-form.scss',
})
export class WeatherSearchForm {
  results = input.required<City[]>();
  loading = input.required<boolean>();
  onSearch = output<string>();
  onSelected = output<City>();
  searchQuery = signal('');

  isFocused = signal<boolean>(false);

  debouncedSearchQuery = toSignal(
    toObservable(this.searchQuery).pipe(
      debounceTime(500),
      distinctUntilChanged()
    ),
    {initialValue: ''}
  );

  constructor() {
    effect(() => {
      const query = this.debouncedSearchQuery();
      if (query) {
        this.onSearch.emit(query)
      } else {
        this.onSearch.emit('');
      }
    });
  }

  onSelect(location: City) {
    this.onSelected.emit(location);
    this.searchQuery.set('');
  }

  onFocus(): void {
    this.isFocused.set(true);
  }

  onBlur(): void {
    this.isFocused.set(false);
  }
}
