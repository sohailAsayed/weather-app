import { createAction, props } from '@ngrx/store';

export const updateCoordinates = createAction(
  '[Location] Update Coordinates',
  props<{ latitude: number; longitude: number }>()
);
export const updateLocationName = createAction(
  // Add updateLocationName action
  '[Location] Update Location Name',
  props<{ locationName: string }>()
);
