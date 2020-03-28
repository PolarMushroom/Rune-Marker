import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Reappraisal() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Reappraisal page</Text>
            <Image source={require("../images/Rune_slots.png")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "#2c2c2c",
        fontSize: 23,


    }
});