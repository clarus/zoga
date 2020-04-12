import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { GeolocationResponse } from '@react-native-community/geolocation';

type Props = {
  locations: GeolocationResponse[],
};

export default function Map(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location history</Text>
      {props.locations.length
        ?
          <ScrollView>
            {props.locations.map((location, index) => {
              const rank = props.locations.length - index;

              return (
                <Text key={rank}>
                  {location.coords.latitude}, {location.coords.longitude} ({rank})
                </Text>
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
    flex: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
