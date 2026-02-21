import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


                  // estrutura do app

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>base code</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  texto: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});