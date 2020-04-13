import React, { Component } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import * as Controller from './controller';
import { Dispatch, State } from '../model';
import Devices from './Devices';

type Props = {
  dispatch: Dispatch,
  state: State,
};

export default class Home extends Component<Props> {
  handleScanDevices = (): void => {
    this.props.dispatch(Controller.scanDevices());
  };

  componentDidMount(): void {
    this.props.dispatch(Controller.scanDevicesIfNeeded());
  }

  render() {
    const {bluetoothDevices} = this.props.state;

    return (
      <View style={styles.container}>
        {bluetoothDevices
          ? <Devices devices={bluetoothDevices} />
          : <ActivityIndicator />
        }
        <Button
          disabled={!bluetoothDevices}
          onPress={this.handleScanDevices}
          title={bluetoothDevices ? 'Scan devices' : 'Scanning devices...'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
