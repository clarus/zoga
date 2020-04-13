import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { GeolocationResponse } from '@react-native-community/geolocation';
import MapView from 'react-native-maps';

type Props = {
  location: null | GeolocationResponse,
};

const defaultLocation = {
  latitude: 48.866667,
  longitude: 2.333333,
};

export default function MapContent(props: Props) {
  const {latitude, longitude} =
    props.location
      ? props.location.coords
      : defaultLocation;

  return (
    <MapView
      region={{
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      showsUserLocation
      style={styles.map}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    margin: 5,
  },
});
