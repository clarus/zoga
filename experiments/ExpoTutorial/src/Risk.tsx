import React from 'react';
import { Text } from 'react-native';
import { Risk } from './model';

type Props = {
  risk: null | Risk,
};

export default function RiskStatus(props: Props) {
  if (!props.risk) {
    return <Text>Your risk is unknown</Text>;
  }

  switch (props.risk) {
    case 'Avoid':
      return <Text>Avoid this area if possible</Text>;
    case 'Cautious':
      return <Text>Be cautious</Text>;
    case 'Safe':
      return <Text>You are safe</Text>;
  }
}
