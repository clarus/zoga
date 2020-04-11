import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { GeolocationResponse } from '@react-native-community/geolocation';

type Props = {
  locations: GeolocationResponse[],
};

export default function Map(props: Props) {
  return (
    <ScrollView style={styles.container}>
      {props.locations.length
        ?
          <>
            {props.locations.map((location, index) =>
              <Text key={props.locations.length - 1 - index}>
                {location.coords.latitude}, {location.coords.longitude}
              </Text>
            )}
          </>
        : <Text>Unknown locations</Text>
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    flex: 1,
  },
});
