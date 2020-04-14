import BleManager from 'react-native-ble-manager';

function wait(timeout: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

export async function scanDevices(): Promise<string[]> {
  const scanningDuration = 5;
  await BleManager.start({ showAlert: false });
  await BleManager.enableBluetooth();
  await BleManager.scan([], scanningDuration);
  await wait(scanningDuration * 1000);
  const devices = await BleManager.getDiscoveredPeripherals();

  return devices.map(({ id }) => id);
}
