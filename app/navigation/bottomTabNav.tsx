import React from "react";
import {View, Text, StyleSheet} from 'react-native'; 



export default function Home (){
    return(
    <View style={styles.container} >
        <Text>
            Olá Bottom Tab 
        </Text>
        <View style={styles.containerNav}></View>
    </View>
)};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    containerNav:{
        width: 50,
        height: 50,
        borderWidth: 2,
        borderColor: "#000",
    },
});