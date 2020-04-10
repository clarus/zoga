import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, Button, ActivityIndicator } from 'react-native';

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
  risk: null | Risk,
  trackLocation: boolean,
};

const initialState: State = {
  isSick: false,
  risk: null,
  trackLocation: false,
};

export default function App() {
  const [state, setState] = useState(initialState);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
