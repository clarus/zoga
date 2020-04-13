import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { GeolocationResponse } from '@react-native-community/geolocation';
import MapItem from './LocationItem';

type Props = {
  locations: GeolocationResponse[],
};

export default function Locations(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location history</Text>
      {props.locations.length
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
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
