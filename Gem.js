import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function Gem() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Gem page</Text>

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