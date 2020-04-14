import React from 'react';
import { FlatList, Text, View } from 'react-native';

type Props = {
  devices: string[];
};

export default function Devices(props: Props) {
  return (
    <View>
      <FlatList
        data={props.devices}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(device) => device}
      />
    </View>
  );
}
