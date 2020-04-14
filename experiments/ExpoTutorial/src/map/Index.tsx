import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dispatch, State } from '../model';
import Locations from './Locations';
import MapContent from './MapContent';

type Props = {
  dispatch: Dispatch;
  state: State;
};

export default function Map(props: Props) {
  const { locations } = props.state;

  return (
    <View style={styles.container}>
      <MapContent location={locations.length !== 0 ? locations[0] : null} />
      <Locations locations={locations} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
