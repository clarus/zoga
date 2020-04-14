import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { StackNavigationHelpers } from '@react-navigation/stack/src/types';
import { Dispatch, State } from '../model';
import Risk from './Risk';
import Separator from '../Separator';
import Settings from './Settings';
import SicknessStatus from './SicknessStatus';

type Props = {
  dispatch: Dispatch;
  navigation: StackNavigationHelpers;
  state: State;
};

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
        onToggle={() => props.dispatch({ type: 'Sickness.Toggle' })}
        value={props.state.isSick}
      />
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button
            onPress={() => props.navigation.navigate('Map')}
            title="Map"
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => props.navigation.navigate('Bluetooth')}
            title="Bluetooth"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  button: {
    flex: 1,
    margin: 10,
  },
  buttons: {
    flexDirection: 'row',
  },
});
