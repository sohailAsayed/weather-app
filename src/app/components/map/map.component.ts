import { Component } from '@angular/core';
import { MapComponent } from 'ngx-mapbox-gl';
@Component({
  selector: 'app-map',
  imports: [MapComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapDisplayComponent {}
