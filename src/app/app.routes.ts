import {Routes} from '@angular/router';
import {Home} from './home/home';
import {WeatherDetails} from './weather-details/weather-details';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'weather', component: WeatherDetails},
  {path: '**', redirectTo: ''}
];
