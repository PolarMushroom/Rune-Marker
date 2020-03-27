import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function Grindstone() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Grindstone page</Text>

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