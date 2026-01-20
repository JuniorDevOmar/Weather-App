import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { WeatherDetails } from './pages/details/weather-details/weather-details';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'weather', component: WeatherDetails },
  { path: '**', redirectTo: '' },
];
