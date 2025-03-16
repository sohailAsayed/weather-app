import { Component, signal } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { HttpService } from '../../services/http.service';
import { WeatherService } from '../../services/weather.service';
import * as LocationActions from '../../store/actions/location.actions';
import { selectLocationName } from '../../store/selectors/location.selectors';
import { NotificationService } from '../../services/notification.service';

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
  metric = signal(true);
  currentCityDetails: any = {};
  foreCastList = { list: [] };
  onlyMetricChanged: boolean = false;
  constructor(
    private httpService: HttpService,
    private weatherService: WeatherService,
    private store: Store,
    private notificationService: NotificationService
  ) {
    this.store
      .pipe(select(selectLocationName))
      .subscribe((res: string | null) => {
        if (res) {
          this.cityName.set(res);

          // By default when the component is loaded
          // we set the default values
          this.searchCityApiCall();
        }
      });
  }
  searchCity(cityNameAndMetrics: any[]): void {
    this.cityName.set(cityNameAndMetrics[0]);
    this.metric.set(cityNameAndMetrics[1]);
    if (cityNameAndMetrics?.[2]) {
      this.onlyMetricChanged = true;
    }
    this.searchCityApiCall();
  }
  searchCityApiCall() {
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
        if (this.onlyMetricChanged) {
          this.onlyMetricChanged = false;
        } else {
          this.notificationService.success(
            `Displaying weather for ${this.cityName()}`
          );
        }

        this.foreCastDetails();
      },
      (err) => {
        this.notificationService.error(
          'City not found. Please check the spelling and try again.'
        );
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
        this.foreCastList = { list: [] };
        this.foreCastList = res;
      },
      (err) => {
        this.notificationService.error(err);
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
      },
      (err) => {
        this.notificationService.error(err);
        console.error('Error', err);
      }
    );
  }
}
