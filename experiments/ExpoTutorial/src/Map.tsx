import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { GeolocationResponse } from '@react-native-community/geolocation';
import MapView, { Heatmap } from 'react-native-maps';
import MapItem from './MapItem';

type Props = {
  locations: GeolocationResponse[],
};

const defaultLocation = {
  latitude: 48.866667,
  longitude: 2.333333,
};

const dataPoints =
  [...Array(100)].map((_, index) => ({
    latitude: defaultLocation.latitude + 0.001 * (index % 10),
    longitude: defaultLocation.longitude + 0.001 * Math.round(index / 10),
    weight: index % 2,
  }));

export default function Map(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location history</Text>
      {/* {props.locations.length
        ?
          <ScrollView>
            <MapItem
              isTitle
              latitude="Latitude"
              longitude="Longitude"
              rank="Rank"
              radius="Radius"
            />
            {props.locations.map((location, index) => {
              const rank = props.locations.length - index;

              return (
                <MapItem
                  isTitle={false}
                  key={rank}
                  latitude={String(location.coords.latitude)}
                  longitude={String(location.coords.longitude)}
                  rank={`(${rank})`}
                  radius={`${location.coords.accuracy}m`}
                />
              );
            })}
          </ScrollView>
        : <Text>Unknown locations</Text>
      } */}
      {/* <View style={styles.mapContainer}>
        <MapView
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
        />
      </View> */}
      {/* <View style={{flex: 1}}> */}
      <MapView
        region={{
          latitude:
            props.locations.length !== 0
              ? props.locations[0].coords.latitude
              : 37.78825,
          longitude:
            props.locations.length !== 0
              ? props.locations[0].coords.longitude
              : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        style={{flex: 1}}
      >
        <Heatmap
          gradient={{
            colors: ['green', 'red'],
            startPoints: [0, 1],
            colorMapSize: 256,
          }}
          opacity={0.5}
          points={[
            {latitude: 48.866667, longitude: 2.333333, weight: 0.5},
            {latitude: 48.8669, longitude: 2.355333, weight: 1},
            {latitude: 49.866667, longitude: 1.333333, weight: 0.1},
            {latitude: 20.866667, longitude: -2.333333, weight: 0.9},
            ...dataPoints,
          ]}
          radius={10}
          style={{flex: 1}}
        />
      </MapView>
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
