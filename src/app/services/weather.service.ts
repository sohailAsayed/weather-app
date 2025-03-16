import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor() {}

  getDetailsViaCityName(
    city: string | null,
    isCelsius: boolean,
    foreCast?: boolean
  ) {
    const url = `${
      foreCast ? environment.forecast_api : environment.city_wise_search
    }?q=${city}&appid=${environment.api_key}&units=${
      isCelsius ? 'metric' : 'imperial'
    }`;
    return url;
  }
  getDetailsViaLatLong(
    latitude: number,
    longitude: number,
    isCelsius: boolean
  ) {
    const url =
      environment.weather_api +
      'weather?lat=' +
      latitude +
      '&lon=' +
      longitude +
      '&appid=' +
      environment.api_key +
      `&units=${isCelsius ? 'metric' : 'imperial'}`;
    return url;
  }
}
