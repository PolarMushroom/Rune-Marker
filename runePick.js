import React from 'react'
import { StyleSheet, Picker, View, Button, Alert, Text, AsyncStorage, Keyboard } from 'react-native';
import { v5 as uuidv5 } from 'uuid';
import { Switch, TextInput, ScrollView } from 'react-native-gesture-handler';

//폭주:1
//#10 참고
// function sumbit( runeType, runeNum ) {
//     return Alert.alert(`you selected ${runeType} rune with number ${runeNum}`)
// }
export default class runePicker extends React.Component {
    state = {
        runeType: "0",
        runeNum: "0",
        gemPrev: "",
        gemAfter: "",
        grindStone: "",
        showGem: false,
        showGrindStone: false,
        reapprisal: false,
        description: "",
        runes: {},

    }
    componentDidMount = () => {
        this._loadRunes();
    }
    _askReapprisal = () => {
        this.setState(prevState => {
            return {
                reapprisal: !prevState.reapprisal
            }
        })
    }
    _askGem = () => {
        this.setState(prevState => {
            return {
                showGem: !prevState.showGem
            }
        })
    }
    _askGrindStone = () => {
        this.setState(prevState => {
            return {
                showGrindStone: !prevState.showGrindStone
            }
        })
    }
    _controlDescription = text => {
        this.setState({
            description: text
        })
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
    _addRune = async () => {
        const { runeNum, runeType, reapprisal, description, gemPrev, gemAfter, grindStone } = this.state;
        if (runeType !== "0" && runeNum !== "0") {
            const ID = uuidv5(`${Date.now()}`, uuidv5.DNS);
            this.setState(prevState => {
                const newToDoObject = {
                    [ID]: {
                        runeType: runeType,
                        runeNum: runeNum,
                        gemPrev: gemPrev,
                        gemAfter: gemAfter,
                        grindStone: grindStone,
                        description: description,
                        // isCompleted: false,
                        id: ID,
                        created: Date.now(),
                        reapprisal: reapprisal,
                    }
                };
                const newState = {
                    ...prevState,
                    runeType: "",
                    runeNum: "",
                    runes: {
                        ...prevState.runes,
                        ...newToDoObject
                    }
                };
                Alert.alert("Saved ");
                console.log(newState.runes);

                this._saveToDo(newState.runes);
                this.props.navigation.goBack();
                return { ...newState }
            });

        } else if (runeType == "0") {
            Alert.alert("select rune type");
        } else if (runeNum == "0") {
            Alert.alert("select rune number");
        }
    };

    _saveToDo = (newRunes) => {
        const saveRune = AsyncStorage.setItem("runes", JSON.stringify(newRunes))
    }

    render() {
        const { runeType, runeNum, reapprisal, gemPrev, gemAfter, showGem, showGrindStone, grindStone } = this.state
        return (
            <ScrollView style={styles.container}>
                <View style={styles.pickerContainer}>
                    <View style={styles.pickerContainerContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}> Rune Type:</Text>
                        </View>
                        <Picker style={styles.pickRune} selectedValue={runeType} onValueChange={(itemValue, itemIndex) => this.setState({ runeType: itemValue })}>
                            <Picker.Item label="Select rune type" value="0" />
                            <Picker.Item label="Violent" value="violent" />
                            <Picker.Item label="Will" value="will" />
                            <Picker.Item label="Swift" value="swift" />
                            <Picker.Item label="Despair" value="despair" />
                            <Picker.Item label="Blade" value="balde" />
                            <Picker.Item label="Nemesis" value="nemesis" />
                            <Picker.Item label="Endure" value="endure" />
                            <Picker.Item label="Rage" value="rage" />
                            <Picker.Item label="Destroy" value="destroy" />
                            <Picker.Item label="Focus" value="focus" />
                            <Picker.Item label="Shield" value="shield" />
                            <Picker.Item label="Fatal" value="fatal" />
                            <Picker.Item label="Revenge" value="revenge" />
                            <Picker.Item label="Guard" value="guard" />
                            <Picker.Item label="Vampire" value="vampire" />
                            <Picker.Item label="Enhance" value="enhance" />
                            <Picker.Item label="Energy" value="energy" />
                            <Picker.Item label="Tolerance" value="tolerance" />
                            <Picker.Item label="Fight" value="Fight" />
                            <Picker.Item label="Determination" value="determination" />
                        </Picker>
                    </View>
                    <View style={styles.pickerContainerContainer}>
                        <View style={styles.textContainer}>
                            <Text>Rune Number:</Text>
                        </View>
                        <Picker style={styles.pickRune} selectedValue={runeNum} onValueChange={(itemValue, itemIndex) => this.setState({ runeNum: itemValue })}>
                            <Picker.Item label="Select number Rune" value="0" />
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="6" value="6" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.switchContainer}>
                    <Text style={styles.switchText}> Gem:</Text>
                    <Switch style={styles.switchSwitch} value={showGem} onValueChange={this._askGem}></Switch>
                    <Text style={styles.switchText}> Gem:</Text>
                    <Switch style={styles.switchSwitch} value={showGrindStone} onValueChange={this._askGrindStone}></Switch>
                </View>

                {showGem ? (
                    <View style={styles.pickerContainerContainer}>
                        <View style={styles.textContainer}>
                            <Text >Gem:</Text>
                        </View>
                        <Picker style={styles.pickGem} selectedValue={gemPrev} onValueChange={(itemValue, itemIndex) => this.setState({ gemPrev: itemValue })}>
                            <Picker.Item label="select" value="0" />
                            <Picker.Item label="ATK+" value="atk+" />
                            <Picker.Item label="DEF+" value="DEF+" />
                            <Picker.Item label="HP+" value="HP+" />
                            <Picker.Item label="ATK%" value="ATK%" />
                            <Picker.Item label="DEF%" value="DEF%" />
                            <Picker.Item label="HP%" value="HP%" />
                            <Picker.Item label="SPD" value="SPD" />
                            <Picker.Item label="CRI DMG" value="CRI DMG" />
                            <Picker.Item label="CRI Rate" value="CRI Rate" />
                            <Picker.Item label="Resistance" value="Resistance" />
                            <Picker.Item label="Accuracy" value="Accuracy" />
                        </Picker>
                        <View style={styles.textContainer}>
                            <Text>to</Text>
                        </View>
                        <Picker style={styles.pickGem} selectedValue={gemAfter} onValueChange={(itemValue, itemIndex) => this.setState({ gemAfter: itemValue })}>
                            <Picker.Item label="select" value="0" />
                            <Picker.Item label="ATK+" value="ATK+" />
                            <Picker.Item label="DEF+" value="DEF+" />
                            <Picker.Item label="HP+" value="HP+" />
                            <Picker.Item label="ATK%" value="ATK%" />
                            <Picker.Item label="DEF%" value="DEF%" />
                            <Picker.Item label="HP%" value="HP%" />
                            <Picker.Item label="SPD" value="SPD" />
                            <Picker.Item label="CRI DMG" value="CRI DMG" />
                            <Picker.Item label="CRI Rate" value="CRI Rate" />
                            <Picker.Item label="Resistance" value="Resistance" />
                            <Picker.Item label="Accuracy" value="Accuracy" />
                        </Picker>
                    </View>
                ) : (
                        <View></View>
                    )}
                {showGrindStone ? (
                    <View style={styles.pickerContainerContainer}>
                        <View style={styles.textContainer}>
                            <Text>GrindStone:</Text>
                        </View>
                        <Picker style={styles.pickGrindStone} selectedValue={grindStone} onValueChange={(itemValue, itemIndex) => this.setState({ grindStone: itemValue })}>
                            <Picker.Item label="ATK+" value="0" />
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                        </Picker>
                    </View>
                ) : (
                        <View></View>
                    )}

                <TextInput
                    style={styles.description}
                    placeholder="Describe the Rune"
                    // value={description}
                    autoCorrect={false}
                    multiline
                    onChangeText={this._controlDescription}
                    returnKeyType={"next"}
                // onSubmitEditing={Keyboard.removeListener("keyboardDidHide")}
                />
                <View style={styles.pickerContainerContainer}>
                    <Text> Reapprisal Stone:     </Text>
                    <Switch value={reapprisal} onValueChange={this._askReapprisal}></Switch>
                </View>
                <Button title="sumbit" onPress={() => this._addRune()}></Button>
                {/* <Button title="callback" onPress={() => this._getData()}></Button> */}
                {/* <Button title="test" onPress={() => this.getKeys()}></Button> */}
                <Text>you selected {this.state.runeType} with num {this.state.runeNum}</Text>
                {/* <Text>you selected {this.state.runeType} with num {this.state.runeNum}</Text> */}
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: "",
        // justifyContent: "center",
        // alignItems: "center"

        // justifyContent: "center",
        // alignItems: "flex-start"
    },
    switchContainer: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    pickerContainerContainer: {
        alignItems: "center",
        flexDirection: "row",
        marginLeft: 0,
        justifyContent: "center",
        width: "100%"
    },
    pickerContainer: {
        flexDirection: "column",
        width: "100%"
    },

    pickGemText: { flex: 1 },
    textContainer: {
        flex: 1,
        alignItems: "center",
    },
    pickRune: {
        flex: 1,
        // backgroundColor: "red",
        // height: 100,
        width: "50%"
    },
    pickGrindStone: {
        flex: 1
    },
    pickGem: {
        flex: 2,
        // backgroundColor: "red",
        // height: 100,
        width: "30%"
    },
    description: {
        padding: 5,
        width: "100%",
        borderColor: "#34495e",
        backgroundColor: "#fff",
        borderWidth: 0,
        fontSize: 25,
        borderWidth: 2

    },

});