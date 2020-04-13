import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  isTitle: boolean;
  latitude: string;
  longitude: string;
  radius: string;
  rank: string;
};

export default function MapItem(props: Props) {
  const cellStyle = [styles.cell, ...(props.isTitle ? [styles.cellTitle] : [])];

  return (
    <View style={styles.container}>
      <Text style={cellStyle}>{props.rank}</Text>
      <Text style={cellStyle}>{props.latitude}</Text>
      <Text style={cellStyle}>{props.longitude}</Text>
      <Text style={cellStyle}>{props.radius}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  cellTitle: {
    fontWeight: 'bold',
  },
});
