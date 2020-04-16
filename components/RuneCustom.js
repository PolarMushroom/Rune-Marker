import React from 'react'
import { StyleSheet, Text, View, Image, Button, AsyncStorage } from 'react-native';
// import PropTypes from 'prop-types'

export default class RuneCustom extends React.Component {
    state = {
        id: "",
        runeInfo: {}
    }
    componentDidMount = () => {
        this._loadRuneInfo();
    }
    _loadRuneInfo = async () => {
        try {

            // console.log("htet");
            const params = this.props.route.params;
            const id = params.id;
            // const  rune = `runes[]`
            // const { id } = this.state
            const Runes = await AsyncStorage.getItem(`runes`);
            const parsedRunes = JSON.parse(Runes)
            // console.log(par)
            // console.log(parsedRunes[id]);

            this.setState({
                //   loadedRunes: true,
                runeInfo: parsedRunes[id] || {}
            });
            const { runeInfo } = this.state
            console.log(runeInfo.runeType)

        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { runeInfo } = this.state

        // this.props.navigation.getParams.getParams('id', 'no-value')
        return (
            <View style={styles.container}>
                <View style={styles.mainInfo}>
                    <Image source={require("../images/Rune_slots.png")} />
                    <View style={styles.mainInfoText}>
                        <Text style={styles.textInfo}>Rune Type</Text>
                        <Text style={styles.text}>{runeInfo.runeType}</Text>
                        <Text style={styles.textInfo}>Rune Number</Text>
                        <Text style={styles.text}>{runeInfo.runeNum}</Text>
                    </View>
                </View>
                <Button style={styles.text} onPress={() => this._getId()} title="Edit"></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center"
    },
    mainInfo: {
        // flex: 1,
        flexDirection: "row",
        height: 240,
        width: "100%"
    },
    textInfo: {
        color: "#7f8c8d",
        fontSize: 20,
        // backgroundColor: "red"
    },
    text: {
        fontSize: 23
    }
});