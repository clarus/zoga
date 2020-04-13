import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { StackNavigationHelpers } from '@react-navigation/stack/src/types';
import BleManager from 'react-native-ble-manager';
import { Dispatch, State } from '../model';
import Risk from './Risk';
import Separator from '../Separator';
import Settings from './Settings';
import SicknessStatus from './SicknessStatus';

type Props = {
  dispatch: Dispatch,
  navigation: StackNavigationHelpers,
  state: State,
};

function wait(timeout: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

async function startBle(): Promise<void> {
  await BleManager.start({showAlert: false});
  console.log('BLE initialized');
  await BleManager.enableBluetooth();
  await BleManager.scan([], 5);
  await wait(4 * 1000);
  const visibleDevices = await BleManager.getDiscoveredPeripherals();
  console.log('visibleDevices', visibleDevices.map(({id}) => id));
}

startBle();

export default function Home(props: Props) {
  return (
    <View style={styles.container}>
      <Settings
        dispatch={props.dispatch}
        trackLocation={props.state.trackLocation}
      />
      <Separator />
      <Risk risk={props.state.risk} />
      <SicknessStatus
        onToggle={() => props.dispatch({type: 'Sickness.Toggle'})}
        value={props.state.isSick}
      />
      <Button
        onPress={() => props.navigation.navigate('Map')}
        title="Go to map"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    flex: 1,
    padding: 10,
  },
});
