import React from "react";
import { View, Text, StyleSheet, Image, } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Olá Bottom Tab</Text>
      <View style={{ flex: 1 }}></View>

      <View style={styles.containerNav}>
        <Image source={require('../assets/icons/home.png')} style={styles.iconBar}/>
         <Image source={require('../assets/icons/time.png')} style={styles.iconBar}/>
          <Image source={require('../assets/icons/cog.png')} style={styles.iconBar}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  containerNav: {
    width: "102%",
    height: 70,
    borderWidth: 2,
    borderColor: "#000",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-around",
  },

  iconBar: {
    width: 50,
    height: 50,
  },
});
