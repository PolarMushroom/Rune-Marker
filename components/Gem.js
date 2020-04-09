import React from 'react'
import { StyleSheet, View, Button, AsyncStorage, Alert, Text } from 'react-native';
import { Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { v5 as uuidv5 } from 'uuid';


export default class Gem extends React.Component {
    state = {
        lala: "",
        tata: ""
    }
    _getData = async () => {
        console.log("testing1");
        try {

            const value = await AsyncStorage.getItem("type");
            if (value !== null) {
                // We have data!!
                // console.log(value);
                this.setState({ lala: value })
                Alert.alert(value)
                // const test = "heelo"
                // return value
            }
        } catch (error) {
            // Error retrieving data
            // return "hello"
            Alert.alert("error")
        }
    }
    _getTest = () => {

        const ID = uuidv5(`${Date.now()}`, uuidv5.DNS);
        this.setState({ tata: ID })

    }

    render() {
        const { tata } = this.state
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text>{tata}</Text>

                </ScrollView>
                <View style={styles.iconContainer}>
                    <Icon name='add-circle' color="#2980b9" onPress={() => this.props.navigation.navigate('runePick')}></Icon>
                </View>
                <Text></Text>
                <Button title="callback" onPress={() => this._getTest()}></Button>
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
    // text: {
    //     color: "#2c2c2c",
    //     fontSize: 23,
    // },
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