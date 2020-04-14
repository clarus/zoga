import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import BackgroundFetch from 'react-native-background-fetch';
import Config from './config';
import * as ServiceBluetooth from './service/bluetooth';
import { Thunk } from './model';

async function getDeviceId(): Promise<null | string> {
  if (Platform.OS !== 'web') {
    // We need to do a local import as this module does not work on the web
    // platform.
    const DeviceInfo = await import('react-native-device-info');

    return DeviceInfo.getUniqueId();
  }

  return null;
}

async function sendUpdateToTheServer(
  location: GeolocationResponse,
): Promise<void> {
  console.log(
    'server update',
    Config.API_URL,
    location.coords.latitude,
    location.coords.longitude,
    location.coords.accuracy,
    await getDeviceId(),
  );
}

async function requestAndroidLocationPermission(): Promise<void> {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'We need your permission to get access to your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    switch (granted) {
      case PermissionsAndroid.RESULTS.GRANTED:
        console.log('We can get the location');
        break;
      default:
        console.log('We cannot get the location');
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
    (error) => {
      console.warn(error);
    },
    {
      enableHighAccuracy: false,
    },
  );

  return Geolocation.watchPosition(
    onChange,
    (error) => {
      console.warn(error);
    },
    {
      distanceFilter: 50,
      enableHighAccuracy: false,
      useSignificantChanges: false,
    },
  );
}

function onLocationUpdate(location: GeolocationResponse): Thunk {
  return async (dispatch, getState) => {
    dispatch({ type: 'Locations.Push', location });
    await sendUpdateToTheServer(location);
  };
}

export function settingsLocationTrackingChange(activate: boolean): Thunk {
  return async (dispatch, getState) => {
    dispatch({ type: 'Settings.LocationTracking.Change', activate });

    if (activate) {
      const watchId = await watchPosition((position) =>
        dispatch(onLocationUpdate(position)),
      );
      dispatch({ type: 'Locations.SetWatchId', watchId });
    } else {
      const { watchId } = getState();

      if (watchId) {
        Geolocation.clearWatch(watchId);
      }
    }
  };
}

async function backgroundTask(taskId: string): Promise<void> {
  console.log('[js] Received background-fetch event: ', taskId);
  const devices = await ServiceBluetooth.scanDevices();
  console.log(
    'Bluetooth devices (background task)',
    new Date().toLocaleString(),
    devices,
  );
}

export function setupBackgroundCheck(): Thunk {
  return async (dispatch, getState) => {
    await backgroundTask('init');
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,
        // Android options
        forceAlarmManager: false,
        stopOnTerminate: false,
        startOnBoot: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
        requiresCharging: false, // Default
        requiresDeviceIdle: false, // Default
        requiresBatteryNotLow: false, // Default
        requiresStorageNotLow: false, // Default
      },
      async (taskId) => {
        await backgroundTask(taskId);
        // Required: Signal completion of your task to native code
        // If you fail to do this, the OS can terminate your app
        // or assign battery-blame for consuming too much background-time
        BackgroundFetch.finish(taskId);
      },
      (error) => {
        console.log('[js] RNBackgroundFetch failed to start');
      },
    );

    // Optional: Query the authorization status.
    BackgroundFetch.status((status) => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log('BackgroundFetch restricted');
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log('BackgroundFetch denied');
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log('BackgroundFetch is enabled');
          break;
      }
    });
  };
}
