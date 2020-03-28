import React from 'react'
import { StyleSheet, Picker, View } from 'react-native';

export default function runePick() {
    return (
        <View style={styles.container}>
            <Picker style={styles.pickRune}>
                <Picker.Item label="Select the rune type" value="0" />
                <Picker.Item label="Violent" value="violent" />
                <Picker.Item label="Will" value="will" />
                <Picker.Item label="Energy" value="energy" />
                <Picker.Item label="Swift" value="swift" />
                <Picker.Item label="fuck" value="fk" />
            </Picker>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    pickRune: {
        width: "100 %"
    }

});