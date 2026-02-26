import React from "react";
import {View, Text, StyleSheet} from 'react-native'; 



export default function Home (){
    return(
    <View style={styles.container} >
        <Text>
            Olá fila
        </Text>
    </View>
)};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});