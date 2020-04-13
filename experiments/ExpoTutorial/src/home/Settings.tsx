import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Controller from '../controller';
import { Dispatch } from '../model';
import SettingsOption from './SettingsOption';

type Props = {
  dispatch: Dispatch;
  trackLocation: boolean;
};

export default function Settings(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.content}>
        <SettingsOption
          label="Track location"
          onChange={(value) =>
            props.dispatch(Controller.settingsLocationTrackingChange(value))
          }
          value={props.trackLocation}
        />
        <SettingsOption
          label="Track Bluetooth contacts"
          onChange={null}
          value={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  content: {},
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
