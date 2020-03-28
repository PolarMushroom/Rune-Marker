import React from "react";

import { StyleSheet, Text, View, Button } from 'react-native';

export default function Home({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                <Text style={styles.text}>What do you need?</Text>
            </View>
            <View style={styles.body}>
                <Button style={styles.choose} title="Gem" onPress={() => navigation.navigate('Gem')} ></Button>
                <Button style={styles.choose} title="Grindstone" onPress={() => navigation.navigate('Grindstone')}></Button>
                <Button style={styles.choose} title="Reappraisal" onPress={() => navigation.navigate('Reappraisal')}></Button>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    nav: {
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center'
        // justifyContent: 'center'
    },
    body: {
        alignItems: "flex-start",
        backgroundColor: "red",

    },
    text: {
        fontSize: 20
    },
    choose: {
        flex: 1,
        backgroundColor: "red",

        justifyContent: "flex-start"
    }
});