import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, StatusBar } from 'react-native';
import BleManager from 'react-native-ble-manager';
import { State } from './model';
import Map from './Map';
import Risk from './Risk';
import Separator from './Separator';
import Settings from './Settings';
import SicknessStatus from './SicknessStatus';
import TitleBar from './TitleBar';

type Props = {
  dispatch: any,
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

function Index(props: Props) {
  return (
    <View style={styles.container}>
      <TitleBar />
      <Separator />
      <Settings
        dispatch={props.dispatch}
        trackLocation={props.state.trackLocation}
      />
      <Separator />
      <Map locations={props.state.locations} />
      {/* <Separator />
      <Risk risk={props.state.risk} /> */}
      <SicknessStatus
        onToggle={() => props.dispatch({type: 'Sickness.Toggle'})}
        value={props.state.isSick}
      />
    </View>
  );
}

export default connect((state: State) => ({state}))(Index);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    marginTop: StatusBar.currentHeight,
    padding: 10,
  },
});
