import React from 'react'
import { StyleSheet, Text, View, } from 'react-native';
import { Icon } from 'react-native-elements'

export default function Gem({ navigation }) {
    return (
        <View style={styles.container}>

            <View style={styles.iconContainer}>
                <Icon name='add-circle' color="#2980b9" size="50" onPress={() => navigation.navigate('runePick')}></Icon>
            </View>
            {/* <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    container1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "#2c2c2c",
        fontSize: 23,
    },
    iconContainer: {
        position: 'absolute',
        flex: 0.1,
        left: 0,
        right: 20,
        bottom: -10,
        // backgroundColor: 'green',
        flexDirection: 'row',
        height: 80,
        justifyContent: 'flex-end',
    }
});