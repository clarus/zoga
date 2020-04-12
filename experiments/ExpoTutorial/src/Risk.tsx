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

function riskIcon(risk: null | Risk): string {
  if (!risk) {
    return '❓';
  }

  switch (risk) {
    case 'Avoid':
      return '💥';
    case 'Cautious':
      return '🌊';
    case 'Safe':
      return '✔️';
  }
}

export default function RiskStatus(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{riskIcon(props.risk)}</Text>
      <Text style={styles.label}>{riskMessage(props.risk)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 3,
    justifyContent: 'center',
  },
  icon: {
    fontSize: 50,
  },
  label: {
    fontSize: 20,
  },
});
