import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { WeatherService } from './services/weather.service';
import { HttpService } from './services/http.service';
import { WeatherDashboardComponent } from './components/weather-dashboard/weather-dashboard.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MapDisplayComponent } from './components/map/map.component';
import { SearchCityComponent } from './components/search-city/search-city.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import * as fromLocation from './store/reducers/location.reducer';
import { WeatherDisplayComponent } from './components/weather-display/weather-display.component';
import { MatDividerModule } from '@angular/material/divider';
@NgModule({
  declarations: [
    AppComponent,
    SearchCityComponent,
    MapDisplayComponent,
    WeatherDashboardComponent,
    WeatherDisplayComponent,
  ],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSlideToggleModule,
    MatButtonModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDividerModule,
    NgxMapboxGLModule.withConfig({
      accessToken:
        'pk.eyJ1Ijoid3lra3NzIiwiYSI6ImNqMjR6aTdmdzAwNHMzMnBvbjBucjlqNm8ifQ.6GjGpofWBVaIuSnhdXQb5w',
    }),
    StoreModule.forRoot({ location: fromLocation.reducer }),
  ],
  providers: [WeatherService, HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
