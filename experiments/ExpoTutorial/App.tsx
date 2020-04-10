import React, { Component } from 'react';
import { StyleSheet, Text, View, Switch, Button, ActivityIndicator, PermissionsAndroid } from 'react-native';
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
  watchId: null | number,
};

const initialState: State = {
  isSick: false,
  location: null,
  risk: null,
  trackLocation: false,
  watchId: null,
};

async function requestLocationPermission(): Promise<void> {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message:
          "We need your permission to get access to your location.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );

    switch (granted) {
      case PermissionsAndroid.RESULTS.GRANTED:
        console.log("We can get the location");
        break;
      default:
        console.log("We cannot get the location");
    }
  } catch (err) {
    console.warn(err);
  }
}

function watchPosition(onChange: (location: GeolocationResponse) => void): number {
  Geolocation.getCurrentPosition(onChange);
  return Geolocation.watchPosition(
    location => {
      console.log('Got location');
      console.log(location);
      onChange(location);
      fetch(
        'http://coq.io:8080/?lat=' +
        location.coords.latitude +
        "&lng=" +
        location.coords.longitude
      );
    },
    error => {
      console.warn(error);
    },
    {
      distanceFilter: 50,
      enableHighAccuracy: false,
      useSignificantChanges: false,
    }
  );
}

function App(props: {setState: (state: Partial<State>) => void, state: State}) {
  // const [state, setState] = useState(initialState);
  const {setState, state} = props;
  // Geolocation.getCurrentPosition(info => console.log(info));

  return (
    <View style={styles.container}>
      <Text>Zoga</Text>
      <View>
        <ToggleOption
          label="Track location"
          onChange={value => {
            (async () => {
              if (value) {
                await requestLocationPermission();
                const watchId = watchPosition(location => setState({location}));
                console.log('watchId', watchId);
                setState({trackLocation: true, watchId});
              } else {
                if (state.watchId !== null) {
                  Geolocation.clearWatch(state.watchId);
                }
                setState({trackLocation: false, watchId: null});
              }
            })();
          }}
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

  onChange = (state: Partial<State>): void => {
    this.setState(state as any);
  };

  componentDidMount(): void {
    console.log('Application started');
  }

  render() {
    return (
      <App
        setState={this.onChange}
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
