import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WeatherDashboardComponent } from './components/weather-dashboard/weather-dashboard.component';

export const routes: Routes = [
  { path: '', component: WeatherDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
