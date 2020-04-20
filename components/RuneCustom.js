import React from 'react'
import { StyleSheet, Text, View, Image, Button, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import PropTypes from 'prop-types'

function makeFirstLetterCap(text) {
    let cap
    if (text !== undefined) {
        cap = text.charAt(0).toUpperCase() + text.slice(1)
    }
    console.log(cap);

    return cap
}
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

            await this.setState({
                //   loadedRunes: true,
                runeInfo: parsedRunes[id] || {}
            });
            const { runeInfo } = this.state
            console.log(runeInfo)
            // console.log(runeInfo.runeType)

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
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={require("../images/Rune_slots.png")} />
                    </View>
                    <View style={styles.mainInfoTextContainer}>
                        <Text style={styles.textInfo}>Rune Type</Text>
                        <Text style={styles.text}>{makeFirstLetterCap(runeInfo.runeType)}</Text>
                        <Text style={styles.textInfo}>Rune Number</Text>
                        <Text style={styles.text}>{runeInfo.runeNum}</Text>
                        <Text style={styles.textInfo}>Main Option</Text>
                        <Text style={styles.text}>{runeInfo.mainOption}</Text>
                    </View>
                </View>
                <View style={styles.subInfoContainer}>
                    <Text style={styles.textInfo}>Gem</Text>
                    <Text style={styles.text}>{runeInfo.gemPrev}    to    {runeInfo.gemAfter}</Text>
                    <Text style={styles.textInfo}>GrindStone</Text>
                    <Text style={styles.text}>{runeInfo.grindStone}</Text>
                </View>
                <View style={styles.editButtonContainer}>
                    <TouchableOpacity onPressOut={() => this._addRune()}>
                        <Text style={styles.editButton}> Edit </Text>

                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#372211",
        // justifyContent: "center",
        // alignItems: "center"
    },
    mainInfo: {
        // flex: 1,
        flexDirection: "row",
        // height: 240,
        width: "100%",
        // backgroundColor: "red"
    },
    imageContainer: {
        flex: 1,
        // width: "100%",
        justifyContent: "center",
        // backgroundColor: "red",
        alignItems: "center"
    },
    image: {
        // marginLeft: 15
    },
    mainInfoTextContainer: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center"
    },
    textInfo: {
        // flex: 1,
        color: "#7f8c8d",
        fontSize: 20,
        // backgroundColor: "red"
    },
    text: {
        color: "#9F8B58",
        fontSize: 23
    },
    editButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 10
    },
    editButton: {
        color: "#F8E9AD",
        backgroundColor: "#D3AB50",
        margin: 5,
        borderWidth: 1.1,
        borderRadius: 5,
        textShadowColor: '#585858',
        textShadowOffset: { width: 1, height: 1 },
        // elevation: 3,
        textShadowRadius: 10,
        fontSize: 25
    }
});