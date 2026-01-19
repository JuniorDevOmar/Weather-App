import {Component, computed, effect, input, output, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {debounceTime, distinctUntilChanged, map, tap} from 'rxjs';
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
  noResults = input(false);
  loading = input.required<boolean>();
  onSearch = output<string>();
  onSelected = output<City>();
  searchQuery = signal('');

  hasSearched = signal<boolean>(false);
  isFocused = signal<boolean>(false);

  error = computed(() => {
    return this.hasSearched() && !this.loading() && this.results().length === 0
  });

  debouncedSearchQuery = toSignal(
    toObservable(this.searchQuery).pipe(
      tap(x => this.hasSearched.set(false)),
      debounceTime(500),
      distinctUntilChanged()
    ),
    {initialValue: ''}
  );

  constructor() {
    effect(() => {
      const query = this.debouncedSearchQuery();
      if (query) {
        this.hasSearched.set(true);
        this.onSearch.emit(query)
      } else {
        this.hasSearched.set(false);
        this.onSearch.emit('');
      }
    });
  }

  onSelect(location: City) {
    this.hasSearched.set(false);
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
