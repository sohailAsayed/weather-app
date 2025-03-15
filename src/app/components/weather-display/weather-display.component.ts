import { Component, computed, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.sass'],
  standalone: false,
})
export class WeatherDisplayComponent implements OnInit {
  name = '';
  country = '';
  currentWeather: Weather | any = input<Weather>();

  loaded = true;
  iconUrl = 'https://openweathermap.org/img/wn/50n@2x.png';

  constructor() {}

  ngOnInit() {}
}

interface Weather {
  coord: {};
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: { speed: number; deg: number };
  clouds: { all: number };
  rain?: {};
  snow?: {};
  dt: number;
  sys: {};
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
