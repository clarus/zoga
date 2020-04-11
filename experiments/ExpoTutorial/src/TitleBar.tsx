import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TitleBar() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌞 Zoga</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
  },
});
