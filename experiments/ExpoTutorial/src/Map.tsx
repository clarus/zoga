import React from 'react';
import { Text, View } from 'react-native';
import { GeolocationResponse } from '@react-native-community/geolocation';

type Props = {
  location: null | GeolocationResponse,
};

export default function Map(props: Props) {
  return (
    props.location
      ? <Text>{props.location.coords.latitude}, {props.location.coords.longitude}</Text>
      : <Text>Unknown location</Text>
  );
}
