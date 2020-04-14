import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';

type Props = {
  label: string;
  onChange: null | ((value: boolean) => void);
  value: boolean;
};

export default function SettingsOption(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <Switch
        disabled={!props.onChange}
        {...(props.onChange ? { onValueChange: props.onChange } : {})}
        value={props.value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  label: {
    flex: 1,
  },
});
