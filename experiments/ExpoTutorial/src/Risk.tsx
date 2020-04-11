import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Risk } from './model';

type Props = {
  risk: null | Risk,
};

function riskMessage(risk: null | Risk): string {
  if (!risk) {
    return 'Your risk is unknown';
  }

  switch (risk) {
    case 'Avoid':
      return 'Avoid this area if possible';
    case 'Cautious':
      return 'Be cautious';
    case 'Safe':
      return 'You are safe';
  }
}

export default function RiskStatus(props: Props) {
  return (
    <View style={styles.container}>
      <Text>{riskMessage(props.risk)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'crimson',
  },
});
