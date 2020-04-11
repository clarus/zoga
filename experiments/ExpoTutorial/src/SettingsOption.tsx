import React from 'react';
import { Text, View, Switch } from 'react-native';

type Props = {
  label: string,
  onChange: null | ((value: boolean) => void),
  value: boolean,
};

export default function SettingsOption(props: Props) {
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
