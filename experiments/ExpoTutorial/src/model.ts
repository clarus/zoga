import { GeolocationResponse } from '@react-native-community/geolocation';

export type Risk = 'Avoid' | 'Cautious' | 'Safe';

export type State = {
  bluetoothDevices: null | string[],
  isSick: boolean,
  locations: GeolocationResponse[],
  risk: null | Risk,
  trackLocation: boolean,
  watchId: null | number,
};

export const initialState: State = {
  bluetoothDevices: null,
  isSick: false,
  locations: [],
  risk: null,
  trackLocation: false,
  watchId: null,
};

export type Action = {
  type: 'Bluetooth.Scanning.Start',
} | {
  type: 'Bluetooth.Scanning.Success',
  devices: string[],
} | {
  type: 'Locations.Push',
  location: GeolocationResponse,
} | {
  type: 'Locations.SetWatchId',
  watchId: number,
} | {
  type: 'Settings.LocationTracking.Change',
  activate: boolean,
} | {
  type: 'Sickness.Toggle',
};

type GetState = () => State;

export type Thunk = (dispatch: Dispatch, getState: GetState) => Promise<void>;

export type Dispatch = (actionOrThunk: Action | Thunk) => unknown;

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'Bluetooth.Scanning.Start':
      return {
        ...state,
        bluetoothDevices: null,
      };
    case 'Bluetooth.Scanning.Success':
      return {
        ...state,
        bluetoothDevices: action.devices,
      };
    case 'Locations.Push':
      return {
        ...state,
        locations: [action.location, ...state.locations],
      };
    case 'Locations.SetWatchId':
      return {
        ...state,
        watchId: action.watchId,
      };
    case 'Settings.LocationTracking.Change':
      return {
        ...state,
        trackLocation: action.activate,
      };
    case 'Sickness.Toggle':
      return {
        ...state,
        isSick: !state.isSick,
      };
  }
}
