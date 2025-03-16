import { Component, signal } from '@angular/core';

import { output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectLocationName } from '../../store/selectors/location.selectors';
import { NotificationService } from '../../services/notification.service';
@Component({
  selector: 'app-search-city',
  standalone: false,
  templateUrl: './search-city.component.html',
  styleUrl: './search-city.component.scss',
})
export class SearchCityComponent {
  constructor(
    private store: Store,
    private notificationService: NotificationService
  ) {
    this.store
      .pipe(select(selectLocationName))
      .subscribe((res: string | null) => {
        if (res) {
          this.searchedCity.set(res);
        }
      });
  }
  cityNameChanged($event: any) {
    // searchedCity
    this.searchedCity.set($event?.target?.value);
  }
  isCelsius = signal(true);
  searchedCity = signal<string>('');
  selectedCity = output<any[]>();
  updateTemperatureType() {
    this.isCelsius.update((value) => (value = !value));
    this.notificationService.success(
      `Temperature unit changed to ${
        this.isCelsius() ? 'Celsius' : 'Fahrenheit'
      }`
    );
    this.searchCity(true);
  }
  searchCity(metricChanged?: boolean) {
    const result = [this.searchedCity(), this.isCelsius()];
    if (metricChanged) {
      result.push(true);
    }
    this.selectedCity.emit(result);
  }
}
