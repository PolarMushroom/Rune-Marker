import React from "react";

import { StyleSheet, Text, View, Button, AsyncStorage, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Runes from './components/Runes'
import { Icon } from "react-native-elements";

export default class Home extends React.Component {
    _isMounted = false;
    state = {
        newRune: "",
        // loadedRunes: false,
        runes: {},

    }
    componentDidMount = () => {
        this._loadRunes();
    }
    _deleteRune = (id) => {
        // console.log("testing")
        this.setState(prevState => {
            const runes = prevState.runes;
            delete runes[id];
            const newState = {
                ...prevState,
                ...runes
            }
            this._saveRune(newState.runes);
            return { ...newState }
        });
    }
    _goToEdit = async (id) => {
        // console.log(id);

        this.props.navigation.navigate('Reappraisal', { id: id });
    }
    _saveRune = (newRunes) => {
        const saveRune = AsyncStorage.setItem("runes", JSON.stringify(newRunes))
    }

    _loadRunes = async () => {
        try {
            // console.log("htet");

            const Runes = await AsyncStorage.getItem("runes");
            const parsedRunes = JSON.parse(Runes)

            this.setState({
                //   loadedRunes: true,
                runes: parsedRunes || {}
            });
            // const { runes } = this.state
            // console.log(runes)

        } catch (error) {
            console.log(error)
        }
    }



    render() {
        { this._loadRunes() }
        const { runes } = this.state
        return (
            <View style={styles.container} >

                <View style={styles.nav}>
                    <Text style={styles.text}>Welcome</Text>
                </View>
                <ScrollView>
                    {
                        Object.values(runes).reverse().map(runes =>
                            <Runes
                                key={runes.id}
                                {...runes}
                                deleteRune={this._deleteRune}
                                goToEdit={this._goToEdit}
                            />)
                    }
                </ScrollView>


                <View style={styles.iconContainer}>
                    <Icon name='add-circle' color="#2980b9" onPress={() => this.props.navigation.navigate('runePick')}></Icon>
                </View>
                {/* <Button title="callback" disabled={false} onPress={() => this._getRunes()}></Button> */}

                {/* <View style={styles.body}>
                    <Button style={styles.choose} title="Gem" onPress={() => this.props.navigation.navigate('Gem')} ></Button>
                    <Button style={styles.choose} title="Grindstone" onPress={() => this.props.navigation.navigate('Grindstone')}></Button>
                    <Button style={styles.choose} title="Reappraisal" onPress={() => this.props.navigation.navigate('Reappraisal')}></Button>
                </View> */}

            </View >
        );
    }
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
    },
    iconContainer: {

        position: 'absolute',
        flex: 0.1,
        left: 0,
        right: 20,
        bottom: 0,
        // backgroundColor: 'green',
        flexDirection: 'row',
        height: 80,
        justifyContent: 'flex-end',
    }
});