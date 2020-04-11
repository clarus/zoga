import { GeolocationResponse } from '@react-native-community/geolocation';

export type Risk = 'Avoid' | 'Cautious' | 'Safe';

export type State = {
  isSick: boolean,
  location: null | GeolocationResponse,
  risk: null | Risk,
  trackLocation: boolean,
  watchId: null | number,
};

export const initialState: State = {
  isSick: false,
  location: null,
  risk: null,
  trackLocation: false,
  watchId: null,
};

export type Action = {
  type: 'Settings.ToggleLocation',
} | {
  type: 'Sickness.Toggle',
};

export type Dispatch = (action: Action) => unknown;

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'Settings.ToggleLocation':
      return {
        ...state,
        trackLocation: !state.trackLocation,
      };
    case 'Sickness.Toggle':
      return {
        ...state,
        isSick: !state.isSick,
      };
  }
}
