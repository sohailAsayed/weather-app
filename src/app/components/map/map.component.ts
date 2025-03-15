import { Component, output, signal } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MapMouseEvent } from 'mapbox-gl';
import {
  selectLatitude,
  selectLongitude,
} from '../../store/selectors/location.selectors';
export interface latLong {
  lng: number;
  lat: number;
}
import * as LocationActions from '../../store/actions/location.actions';
@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapDisplayComponent {
  latLongSelected = output<latLong>();
  longitude = signal(-74.0066);
  latitude = signal(40.7135);
  constructor(private store: Store) {
    this.store.pipe(select(selectLatitude)).subscribe((res) => {
      if (res) {
        this.latitude.set(res);
      }
    });
    this.store.pipe(select(selectLongitude)).subscribe((res) => {
      if (res) {
        this.longitude.set(res);
      }
    });
  }

  onMapClick(event: MapMouseEvent) {
    const coordinates: latLong = event.lngLat as latLong;
    this.latitude.set(coordinates.lat);
    this.longitude.set(coordinates.lng);
    this.store.dispatch(
      LocationActions.updateCoordinates({
        latitude: this.latitude(),
        longitude: this.longitude(),
      })
    );
    this.latLongSelected.emit(coordinates);
  }
}
