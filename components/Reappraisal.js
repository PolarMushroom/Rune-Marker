import React from 'react'
import { StyleSheet, Text, View, Image, Button, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types'

export default class Reappraisal extends React.Component {
    state = {
        id: ""
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
            console.log(parsedRunes[id]);

            // this.setState({
            //     //   loadedRunes: true,
            //     runes: parsedRunes || {}
            // });
            // const { runes } = this.state
            // console.log(runes)

        } catch (error) {
            console.log(error)
        }
    }
    static propTypes = {
        id: PropTypes.string.isRequired,
    }
    _getId = () => {
        // console.log("ss")
        const params = this.props.route.params;
        const user_name = params.id;
        console.log(user_name);

    }
    render() {
        const { id } = this.props

        // this.props.navigation.getParams.getParams('id', 'no-value')
        return (
            <View style={styles.container}>
                <Button onPress={() => this._getId()} title="test"></Button>
                <Text style={styles.text}>Reappraisal page</Text>

                <Image source={require("../images/Rune_slots.png")} />
            </View>
        );
    }
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