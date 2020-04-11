import React from 'react';
import { Button } from 'react-native';

type Props = {
  onToggle: () => void,
  value: boolean,
};

export default function SicknessStatus(props: Props) {
  return (
    <Button
      onPress={props.onToggle}
      title={props.value ? 'I FEEL SICK' : 'I DO NOT FEEL SICK'}
    />
  )
}
