import { Component, signal } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { HttpService } from '../../services/http.service';
import { WeatherService } from '../../services/weather.service';
import * as LocationActions from '../../store/actions/location.actions';
import { selectLocationName } from '../../store/selectors/location.selectors';

@Component({
  selector: 'app-weather-dashboard',
  standalone: false,
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.scss',
  providers: [],
})
export class WeatherDashboardComponent {
  get showCardDetails() {
    return Object.keys(this.currentCityDetails)?.length;
  }
  cityName = signal('');
  metric = signal(false);
  currentCityDetails: any = {};
  foreCastList = [];
  constructor(
    private httpService: HttpService,
    private weatherService: WeatherService,
    private store: Store
  ) {
    this.store
      .pipe(select(selectLocationName))
      .subscribe((res: string | null) => {
        if (res) {
          this.cityName.set(res);
        }
      });
  }
  searchCity(cityNameAndMetrics: any[]): void {
    this.cityName.set(cityNameAndMetrics[0]);
    this.metric.set(cityNameAndMetrics[1]);
    const url = this.weatherService.getDetailsViaCityName(
      this.cityName(),
      this.metric()
    );
    this.httpService.get(url).subscribe(
      (res: any) => {
        this.currentCityDetails = res;
        this.store.dispatch(
          LocationActions.updateCoordinates({
            latitude: parseFloat(res?.coord?.lat),
            longitude: parseFloat(res?.coord?.lon),
          })
        );
        this.store.dispatch(
          LocationActions.updateLocationName({ locationName: this.cityName() })
        );
        this.foreCastDetails();
      },
      (err) => {
        console.error('Error', err);
      }
    );
  }
  foreCastDetails() {
    const url = this.weatherService.getDetailsViaCityName(
      this.cityName(),
      this.metric(),
      true
    );
    this.httpService.get(url).subscribe(
      (res: any) => {
        this.foreCastList = res;
      },
      (err) => {
        console.error('Error', err);
      }
    );
  }
  // lat lng
  updateDetailsViaLatLon(event: { lat: number; lng: number }) {
    const url = this.weatherService.getDetailsViaLatLong(
      event.lat,
      event.lng,
      this.metric()
    );
    this.httpService.get(url).subscribe(
      (res: any) => {
        this.currentCityDetails = res;
        this.foreCastDetails();
        this.store.dispatch(
          LocationActions.updateLocationName({ locationName: res?.name })
        );
        console.log('latLong', res);
      },
      (err) => {
        console.error('Error', err);
      }
    );
  }
}
