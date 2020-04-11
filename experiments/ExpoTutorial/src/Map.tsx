import React from 'react';
import { Text, View } from 'react-native';
import { GeolocationResponse } from '@react-native-community/geolocation';

type Props = {
  locations: GeolocationResponse[],
};

export default function Map(props: Props) {
  return (
    props.locations.length
      ?
        <>
          {props.locations.map((location, index) =>
            <Text key={props.locations.length - 1 - index}>
              {location.coords.latitude}, {location.coords.longitude}
            </Text>
          )}
        </>
      : <Text>Unknown locations</Text>
  );
}
