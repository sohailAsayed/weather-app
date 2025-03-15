import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LocationState } from '../reducers/location.reducer';

export const selectLocationState =
  createFeatureSelector<LocationState>('location'); // 'location' should match the key in your StoreModule.forRoot()

export const selectLatitude = createSelector(
  selectLocationState,
  (state: LocationState) => state.latitude
);

export const selectLongitude = createSelector(
  selectLocationState,
  (state: LocationState) => state.longitude
);

export const selectCoordinates = createSelector(
  selectLocationState,
  (state: LocationState) => ({
    latitude: state.latitude,
    longitude: state.longitude,
  })
);
export const selectLocationName = createSelector(
  // Add selectLocationName selector
  selectLocationState,
  (state: LocationState) => state.locationName
);
