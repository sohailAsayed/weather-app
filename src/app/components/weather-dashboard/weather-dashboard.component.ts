import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { WeatherService } from '../../services/weather.service';
import { MapDisplayComponent } from '../map/map.component';
import { SearchCityComponent } from '../search-city/search-city.component';

@Component({
  selector: 'app-weather-dashboard',
  imports: [SearchCityComponent, MapDisplayComponent],
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.scss',
})
export class WeatherDashboardComponent {
  constructor(
    private httpService: HttpService,
    private weatherService: WeatherService
  ) {}
  searchCity(cityNameAndMetrics: any[]): void {
    const cityName = cityNameAndMetrics[0];
    const metric = cityNameAndMetrics[1];
    const url = this.weatherService.getDetailsViaCityName(cityName, metric);
    this.httpService.get(url).subscribe(
      (res: any) => {
        console.log('Result', res);
      },
      (err) => {
        console.error('Error', err);
      }
    );
  }
}
