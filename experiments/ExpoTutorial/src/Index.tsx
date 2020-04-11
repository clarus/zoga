import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Dispatch, State } from './model';
import Map from './Map';
import Risk from './Risk';
import Settings from './Settings';
import SicknessStatus from './SicknessStatus';
import TitleBar from './TitleBar';

type Props = {
  dispatch: Dispatch,
  state: State,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    marginTop: StatusBar.currentHeight,
    padding: 10,
  },
});

function Index(props: Props) {
  return (
    <View style={styles.container}>
      <TitleBar />
      <Settings
        dispatch={props.dispatch}
        trackLocation={props.state.trackLocation}
      />
      <Map location={props.state.location} />
      <Risk risk={props.state.risk} />
      <SicknessStatus
        onToggle={() => props.dispatch({type: 'Sickness.Toggle'})}
        value={props.state.isSick}
      />
    </View>
  );
}

export default connect((state: State) => ({state}))(Index);
