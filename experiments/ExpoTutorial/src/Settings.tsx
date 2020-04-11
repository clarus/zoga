import React from 'react';
import { Text, View, Switch } from 'react-native';
import { Dispatch } from './model';

function ToggleOption(
  props: {
    label: string,
    onToggle: null | (() => void),
    value: boolean,
  }
) {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text>{props.label}</Text>
      <Switch
        disabled={!props.onToggle}
        {...props.onToggle ? {onValueChange: props.onToggle} : {}}
        value={props.value}
      />
    </View>
  );
}

type Props = {
  dispatch: Dispatch,
  trackLocation: boolean,
};

export default function Settings(props: Props) {
  return (
    <View>
      <ToggleOption
        label="Track location"
        onToggle={() => props.dispatch({type: 'Settings.ToggleLocation'})}
        value={props.trackLocation}
      />
      <ToggleOption
        label="Track Bluetooth contacts"
        onToggle={null}
        value={false}
      />
    </View>
  );
}
