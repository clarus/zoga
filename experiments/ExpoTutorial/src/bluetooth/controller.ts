import { Thunk } from '../model';
import * as ServiceBluetooth from '../service/bluetooth';

export function scanDevices(): Thunk {
  return async (dispatch, getState) => {
    dispatch({ type: 'Bluetooth.Scanning.Start' });
    const devices = await ServiceBluetooth.scanDevices();
    dispatch({
      type: 'Bluetooth.Scanning.Success',
      devices,
    });
  };
}

export function scanDevicesIfNeeded(): Thunk {
  return async (dispatch, getState) => {
    const { bluetoothDevices } = getState();

    if (!bluetoothDevices) {
      await scanDevices()(dispatch, getState);
    }
  };
}
