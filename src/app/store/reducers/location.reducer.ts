import { Action, createReducer, on } from '@ngrx/store';
import * as LocationActions from '../actions/location.actions';

export interface LocationState {
  latitude: number; // Change to number
  longitude: number; // Change to number
  locationName: string | null;
}

export const initialState: LocationState = {
  latitude: 40.7143, // Provide a default number value
  longitude: -74.006, // Provide a default number value
  locationName: 'New York',
};

const locationReducer = createReducer(
  initialState,
  on(LocationActions.updateCoordinates, (state, { latitude, longitude }) => ({
    ...state,
    latitude,
    longitude,
  })),
  on(LocationActions.updateLocationName, (state, { locationName }) => ({
    // Add case for updateLocationName
    ...state,
    locationName,
  }))
);

export function reducer(state: LocationState | undefined, action: Action) {
  return locationReducer(state, action);
}
