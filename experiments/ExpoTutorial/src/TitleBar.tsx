import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TitleBar() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌞 Zoga</Text>
      <Text style={styles.subTitle}>Navigate safely</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  subTitle: {
    fontSize: 14,
    fontStyle: 'italic',
    marginRight: 16,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
