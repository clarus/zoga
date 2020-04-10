import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Switch, Button, ActivityIndicator } from 'react-native';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';

function ToggleOption(
  props: {
    label: string,
    onChange: null | ((value: boolean) => void),
    value: boolean,
  }
) {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text>{props.label}</Text>
      <Switch
        disabled={!props.onChange}
        {...props.onChange ? {onValueChange: props.onChange} : {}}
        value={props.value}
      />
    </View>
  );
}

type Risk = 'Avoid' | 'Cautious' | 'Safe';

function Map(props: {location: GeolocationResponse}) {
  const {latitude, longitude} = props.location.coords;

  return (
    <View>
      <Text>{latitude}, {longitude}</Text>
    </View>
  );
}

function RiskStatus(props: {risk: Risk}) {
  switch (props.risk) {
    case 'Avoid':
      return <Text>Avoid this area if possible</Text>;
    case 'Cautious':
      return <Text>Be cautious</Text>;
    case 'Safe':
      return <Text>You are safe</Text>;
  }
}

function SicknessStatus(props: {onToggle: () => void, value: boolean}) {
  return (
    <Button
      onPress={props.onToggle}
      title={props.value ? 'I FEEL SICK' : 'I DO NOT FEEL SICK'}
    />
  )
}

type State = {
  isSick: boolean,
  location: null | GeolocationResponse,
  risk: null | Risk,
  trackLocation: boolean,
};

const initialState: State = {
  isSick: false,
  location: null,
  risk: null,
  trackLocation: false,
};

// let setState: null | ((state: State) => void) = null;

// let state: State = initialState;

// const stateCallbacks: (() => void)[] = [];

// function setState(newState: State): void {
//   state = newState;
//   stateCallbacks.forEach(callback => callback());
// }

function App(props: {setState: (state: State) => void, state: State}) {
  // const [state, setState] = useState(initialState);
  const {setState, state} = props;
  // Geolocation.getCurrentPosition(info => console.log(info));

  return (
    <View style={styles.container}>
      <Text>Zoga</Text>
      <View>
        <ToggleOption
          label="Track location"
          onChange={value => setState({...state, trackLocation: value})}
          value={state.trackLocation}
        />
        <ToggleOption
          label="Track Bluetooth contacts"
          onChange={null}
          value={false}
        />
      </View>
      {state.location
        ? <Map location={state.location} />
        : <Text>Unknown location</Text>
      }
      <View>
        {state.risk ? <RiskStatus risk={state.risk} /> : <ActivityIndicator />}
      </View>
      <View>
        <SicknessStatus
          onToggle={() => setState({...state, isSick: !state.isSick})}
          value={state.isSick}
        />
      </View>
    </View>
  );
}

export default class AppWrapper extends Component<{}, State> {
  state: State = initialState;

  // setState = (newState: State): void => {
  //   state = newState;
  //   this.forceUpdate();
  // };

  componentDidMount(): void {
    Geolocation.watchPosition(
      location => {
        const coords = [location.coords.latitude, location.coords.longitude];
        this.setState({location});
        fetch('http://192.168.43.87:8080/?loc=' + JSON.stringify(coords));
      },
      undefined,
      {
        distanceFilter: 100,
        enableHighAccuracy: false,
        useSignificantChanges: true,
      }
    );
  }

  render() {
    return (
      <App
        setState={this.setState}
        state={this.state}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
