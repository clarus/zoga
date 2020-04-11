import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Controller from './controller';
import { Dispatch } from './model';
import SettingsOption from './SettingsOption';

type Props = {
  dispatch: Dispatch,
  trackLocation: boolean,
};

export default function Settings(props: Props) {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <SettingsOption
        label="Track location"
        onChange={value => props.dispatch(Controller.settingsLocationTrackingChange(value))}
        value={props.trackLocation}
      />
      <SettingsOption
        label="Track Bluetooth contacts"
        onChange={null}
        value={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange',
    flex: 1,
  },
});
