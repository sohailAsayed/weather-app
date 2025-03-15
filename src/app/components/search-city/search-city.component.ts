import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { output } from '@angular/core';
@Component({
  selector: 'app-search-city',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  templateUrl: './search-city.component.html',
  styleUrl: './search-city.component.scss',
})
export class SearchCityComponent {
  cityNameChanged($event: any) {
    // searchedCity
    this.searchedCity.set($event?.target?.value);
  }
  isCelsius = signal(true);
  searchedCity = signal<string>('');
  selectedCity = output<any[]>();
  updateTemperatureType() {
    this.isCelsius.update((value) => (value = !value));
  }
  searchCity() {
    this.selectedCity.emit([this.searchedCity(), this.isCelsius()]);
  }
}
