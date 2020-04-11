import { PermissionsAndroid, Platform } from "react-native";
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import Config from './config';
import { Thunk } from './model';

async function requestAndroidLocationPermission(): Promise<void> {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message:
          "We need your permission to get access to your location.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );

    switch (granted) {
      case PermissionsAndroid.RESULTS.GRANTED:
        console.log("We can get the location");
        break;
      default:
        console.log("We cannot get the location");
    }
  } catch (error) {
    console.warn(error);
  }
}

async function watchPosition(
  onChange: (location: GeolocationResponse) => void,
): Promise<number> {
  if (Platform.OS === 'android') {
    await requestAndroidLocationPermission();
  }
  Geolocation.getCurrentPosition(
    onChange,
    undefined,
    {
      enableHighAccuracy: false
    }
  );

  return Geolocation.watchPosition(
    onChange,
    error => {
      console.warn(error);
    },
    {
      distanceFilter: 50,
      enableHighAccuracy: false,
      useSignificantChanges: false,
    }
  );
}

function onLocationUpdate(location: GeolocationResponse): Thunk {
  return async (dispatch, getState) => {
    dispatch({type: 'Locations.Push', location});
  };
}

export function settingsLocationTrackingChange(activate: boolean): Thunk {
  return async (dispatch, getState) => {
    dispatch({type: 'Settings.LocationTracking.Change', activate});

    if (activate) {
      const watchId = await watchPosition(position => dispatch(onLocationUpdate(position)));
      dispatch({type: 'Locations.SetWatchId', watchId});
    } else {
      const {watchId} = getState();

      if (watchId) {
        Geolocation.clearWatch(watchId);
      }
    }
  };
}
