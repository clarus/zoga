import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

type Props = {
  onToggle: () => void;
  value: boolean;
};

export default function SicknessStatus(props: Props) {
  return (
    <View style={styles.container}>
      <Button
        onPress={props.onToggle}
        title={props.value ? 'I FEEL SICK' : 'I DO NOT FEEL SICK'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});
