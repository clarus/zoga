import React from 'react';
import { Text, View, Switch } from 'react-native';
import * as Controller from './controller';
import { Dispatch } from './model';

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

type Props = {
  dispatch: Dispatch,
  trackLocation: boolean,
};

export default function Settings(props: Props) {
  return (
    <View>
      <ToggleOption
        label="Track location"
        onChange={value => props.dispatch(Controller.settingsLocationTrackingChange(value))}
        value={props.trackLocation}
      />
      <ToggleOption
        label="Track Bluetooth contacts"
        onChange={null}
        value={false}
      />
    </View>
  );
}
