import BleManager from 'react-native-ble-manager';
import { Thunk } from '../model';

function wait(timeout: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

export function scanDevices(): Thunk {
  return async (dispatch, getState) => {
    const scanningDuration = 5;
    dispatch({ type: 'Bluetooth.Scanning.Start' });
    await BleManager.start({ showAlert: false });
    await BleManager.enableBluetooth();
    await BleManager.scan([], scanningDuration);
    await wait(scanningDuration * 1000);
    const devices = await BleManager.getDiscoveredPeripherals();
    dispatch({
      type: 'Bluetooth.Scanning.Success',
      devices: devices.map(({ id }) => id),
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
