import React from 'react'
import { StyleSheet, Picker, View, Button, Alert, Text, AsyncStorage, Keyboard, Image, KeyboardAvoidingView } from 'react-native';
import { v5 as uuidv5 } from 'uuid';
import { Switch, TextInput, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Unchecked from './images/Unchecked.png'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { CheckBox } from "react-native-elements"

export default class runePicker extends React.Component {
    state = {
        runeType: "0",
        runeNum: "0",
        mainOption: "HP%",
        gemPrev: "0",
        gemAfter: "0",
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
        const { showGem } = this.state
        console.log(showGem);

        if (showGem == true) {
            // console.log("kaka");

            this.setState({
                gemPrev: "",
                gemAfter: "",
            })
        }

    }
    _askGrindStone = () => {
        this.setState(prevState => {
            return {
                showGrindStone: !prevState.showGrindStone
            }
        })
        const { showGrindStone } = this.state
        if (showGrindStone == true) {
            this.setState({
                grindStone: ""
            })
        }
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
        // const { showGem, showGrindStone } = this.state
        // if (showGem == false) {
        //     this.setState({
        //         gemPrev: "",
        //         gemAfter: "",
        //     })
        // }
        // // const { showGrindStone } = this.state
        // if (showGrindStone == false) {
        //     this.setState({
        //         grindStone: ""
        //     })
        // }

        const { runeNum, runeType, mainOption, reapprisal, description, showGem, gemPrev, gemAfter, grindStone } = this.state;
        if (runeType !== "0" && runeNum !== "0") {
            // console.log(showGem);

            if (showGem == true && gemPrev == "0" && gemAfter == "0") {
                Alert.alert("Select Gem");
                return
            }

            const ID = uuidv5(`${Date.now()}`, uuidv5.DNS);
            this.setState(prevState => {
                const newToDoObject = {
                    [ID]: {
                        runeType: runeType,
                        runeNum: runeNum,
                        gemPrev: gemPrev,
                        gemAfter: gemAfter,
                        mainOption: mainOption,
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
            Alert.alert("Select Rune Type");
        } else if (runeNum == "0") {
            Alert.alert("Select Rune Number");
        }
    };

    _saveToDo = (newRunes) => {
        const saveRune = AsyncStorage.setItem("runes", JSON.stringify(newRunes))
    }

    render() {
        const { runeType, runeNum, mainOption, reapprisal, gemPrev, gemAfter, showGem, showGrindStone, grindStone } = this.state
        return (


            <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">

                <View style={styles.container}>
                    <ScrollView style={styles.container}>
                        <View style={styles.pickerContainer}>
                            <View style={styles.pickerContainerContainerMain}>
                                <View style={styles.textContainerww}>
                                    <Text style={styles.textMain}> Rune Type:</Text>
                                </View>
                                <Picker style={styles.pickRune} mode="dropdown" selectedValue={runeType}
                                    onValueChange={(itemValue, itemIndex) => {
                                        this.setState({
                                            runeType: itemValue
                                        })
                                    }}>
                                    <Picker.Item label="Select" value="0" />
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
                                    <Picker.Item label="Fight" value="fight" />
                                    <Picker.Item label="Determination" value="determination" />
                                </Picker>
                            </View>
                            <View style={styles.pickerContainerContainerMain}>
                                <View style={styles.textContainerww}>
                                    <Text style={styles.textMain}>Rune Number:</Text>
                                </View>
                                <Picker style={styles.pickRune} selectedValue={runeNum} mode="dropdown" onValueChange={(itemValue, itemIndex) => {
                                    if (itemValue == 1) {
                                        this.setState({ mainOption: "ATK+" })
                                    } else if (itemValue == 3) {
                                        this.setState({ mainOption: "DEF+" })
                                    } else if (itemValue == 5) {
                                        this.setState({ mainOption: "HP+" })
                                    }
                                    this.setState({ runeNum: itemValue })
                                }}>
                                    <Picker.Item label="Select Rune Number" value="0" />
                                    <Picker.Item label="1" value="1" />
                                    <Picker.Item label="2" value="2" />
                                    <Picker.Item label="3" value="3" />
                                    <Picker.Item label="4" value="4" />
                                    <Picker.Item label="5" value="5" />
                                    <Picker.Item label="6" value="6" />
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.pickerMainOption}>
                            <View style={styles.textContainerww}>
                                <Text style={styles.textMain}> Main Option:</Text>
                            </View>
                            <Picker style={styles.pickOption} mode="dropdown" selectedValue={mainOption} onValueChange={(itemValue, itemIndex) => this.setState({ mainOption: itemValue })}>

                                <Picker.Item label="HP%" value="HP%" />
                                <Picker.Item label="SPD" value="SPD" />
                                <Picker.Item label="DEF%" value="DEF%" />
                                <Picker.Item label="ATK%" value="ATK%" />
                                <Picker.Item label="CRI DMG" value="CRI DMG" />
                                <Picker.Item label="CRI Rate" value="CRI Rate" />
                                <Picker.Item label="ATK+" value="ATK+" />
                                <Picker.Item label="DEF+" value="DEF+" />
                                <Picker.Item label="HP+" value="HP+" />
                                <Picker.Item label="Resistance" value="Resistance" />
                                <Picker.Item label="Accuracy" value="Accuracy" />
                            </Picker>
                        </View>
                        <View style={styles.checkBoxContainer}>
                            {/* <Text style={styles.switchText}>Gem:</Text> */}
                            <CheckBox
                                title='Gem:'
                                iconRight
                                center
                                textStyle={{
                                    color: "#DFC87F",
                                    fontSize: 20,
                                }}
                                checkedColor="#FFCD1D"

                                containerStyle={styles.checkBox}
                                checked={showGem}
                                onPress={this._askGem} />
                        </View>
                        {showGem ? (
                            <View style={styles.pickerContainerContainer}>
                                {/* <View style={styles.textContainer}>
                            <Text style={styles.text}></Text>
                        </View> */}
                                <View style={styles.pickSubOptionContainer}>
                                    <Picker style={styles.pickGem} mode="dropdown" selectedValue={gemPrev} onValueChange={(itemValue, itemIndex) => this.setState({ gemPrev: itemValue })}>
                                        <Picker.Item label="From" value="0" />
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
                                {/* <View style={styles.textContainer}>
                            <Text style={styles.text}></Text>
                        </View> */}
                                <View style={styles.pickSubOptionContainer}>
                                    <Picker style={styles.pickGem} mode="dropdown" selectedValue={gemAfter} onValueChange={(itemValue, itemIndex) => this.setState({ gemAfter: itemValue })}>
                                        <Picker.Item label="to" value="0" />
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
                            </View>
                        ) : (
                                <View></View>
                            )}
                        <View style={styles.checkBoxContainer}>
                            {/* <Text style={styles.switchText}> GrindStone:</Text> */}

                            <CheckBox
                                containerStyle={styles.checkBox}
                                checked={showGrindStone}
                                title='GrindStone:'
                                iconRight
                                center
                                textStyle={{
                                    color: "#DFC87F",
                                    fontSize: 20,
                                }}
                                checkedColor="#FFCD1D"
                                onPress={this._askGrindStone} />
                        </View>

                        {/* {showGem ? (
                    <View style={styles.pickerContainerContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Gem:</Text>
                        </View>
                        <Picker style={styles.pickSubOption} selectedValue={gemPrev} onValueChange={(itemValue, itemIndex) => this.setState({ gemPrev: itemValue })}>
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
                            <Text style={styles.text}>to</Text>
                        </View>
                        <Picker style={styles.pickSubOption} selectedValue={gemAfter} onValueChange={(itemValue, itemIndex) => this.setState({ gemAfter: itemValue })}>
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
                    )} */}
                        {showGrindStone ? (
                            <View style={styles.pickeGrindStoneContainer}>
                                {/* <View style={styles.textContainer}>
                            <Text style={styles.text}>GrindStone:</Text>
                        </View> */}
                                <Picker style={styles.pickGrindStone} mode="dropdown" selectedValue={grindStone} onValueChange={(itemValue, itemIndex) => this.setState({ grindStone: itemValue })}>
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


                        <View style={styles.descriptionContainer}>
                            <TextInput
                                style={styles.description}
                                placeholder="Describe the Rune"
                                placeholderTextColor="#AC9E87"
                                // value={description}
                                // selectTextOnFocus={true}
                                // showSoftInputOnFocus={false}
                                // autoCorrect={false}
                                multiline
                                onChangeText={this._controlDescription}
                                returnKeyType={"next"}
                            // onSubmitEditing={Keyboard.removeListener("keyboardDidHide")}
                            />
                        </View>


                        {/* <View style={{ height: 60 }} /> */}

                        {/* <View style={styles.pickerContainerContainer}>
                    <Text> Reapprisal Stone:     </Text>
                    <Switch value={reapprisal} onValueChange={this._askReapprisal}></Switch>
                </View> */}
                        {/* <Button
                    title="sumbit"
                    color="#C69941"
                    titleStyle={styles.sumbit}
                    type="outline"
                    // buttonStyle={styles.sumbit}
                    onPress={() => this._addRune()}
                /> */}<View style={styles.sumbit}>
                            <TouchableOpacity onPressOut={() => this._addRune()}>
                                <Text style={styles.sumbitButton}> Sumbit </Text>

                            </TouchableOpacity>
                        </View>
                        {/* <Button title="callback" onPress={() => this._getData()}></Button> */}
                        {/* <Button title="test" onPress={() => this.getKeys()}></Button> */}
                        {/* <Text>you selected {this.state.runeType} with num {this.state.runeNum}</Text> */}
                        {/* <Text>you selected {this.state.runeType} with num {this.state.runeNum}</Text> */}
                    </ScrollView>
                </View>
                <View style={{ backgroundColor: "#372211", height: 100 }}></View>
            </KeyboardAvoidingView>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#372211",
        height: "100%"
        // flexDirection: "",
        // justifyContent: "center",
        // alignItems: "center"

        // justifyContent: "center",
        // alignItems: "flex-start"
    },
    checkBoxContainer: {
        flexDirection: "row",
        // justifyContent: "center",
        // alignContent: "center",
        // margin: 10
    },
    switchText: {
        color: "#DFC87F",
        fontSize: 20,
    },
    textMain: {
        color: "#DFC87F",
        fontSize: 20,
        fontWeight: "bold",
        margin: 10
    },
    pickerMainOption: {
        flexDirection: "row",
        width: "100%"
    },
    checkBox: {
        backgroundColor: "#372211",
        borderWidth: 0,
        marginLeft: 0
        // marginLeft: 10,
        // marginBottom"1
        // justifyContent: "center",
        // alignContent: "center",
        // backgroundColor: "#816852",
        // width: "10%",
        // height: "100%"
    },
    pickerContainerContainer: {
        // alignItems: "center",
        flexDirection: "row",

        // marginLeft: ,
        justifyContent: "space-between",
        width: "100%"
    },
    pickerContainerContainerMain: {
        // alignItems: "center",
        flex: 1,
        flexDirection: "column",
        // marginLeft: 0,
        justifyContent: "center",
        // width: "50%"
    },
    pickerContainer: {
        flexDirection: "row",
        width: "100%"
    },
    text: {
        color: "#9F8B58",
        fontSize: 20,
    },

    pickGemText: {
        flex: 1,
        fontSize: 25,
    },
    textContainer: {
        flex: 1,
        alignItems: "center",
    },
    pickOption: {
        flex: 1,
        margin: 10,
        color: "#1e272e",
        backgroundColor: "#D7C58D",
        borderWidth: 1,
        borderRadius: 10,
        // overflow: 'hidden',
        fontSize: 20,
        transform: [
            { scaleX: 1.1 },
            { scaleY: 1.1 },
        ],
        // borderWidth: 2,
        width: "80%"
    },

    pickRune: {
        flex: 1,
        // backgroundColor: "red",
        // height: 100,
        margin: 10,
        color: "#1e272e",
        backgroundColor: "#D7C58D",
        borderWidth: 1,
        borderRadius: 10,
        // overflow: 'hidden',
        fontSize: 20,
        transform: [
            { scaleX: 1.1 },
            { scaleY: 1.1 },
        ],
        // borderWidth: 2,
        width: "90%"
    },
    pickeGrindStoneContainer: {
        width: "100%",

        alignItems: "center",
    },
    pickGrindStone: {
        flex: 1,
        padding: 5,
        width: "95%",
        color: "#1e272e",
        backgroundColor: "#D7C58D",
        // borderWidth: 2,
    },
    pickSubOptionContainer: {
        // marginLeft: 16,
        // justifyContent: "space-around",
        // alignContent: "center",
        // backgroundColor: "red",
        // flexDirection: "row", 
        // justifyContent: "center",
        // alignContent: "center",
        width: "50%"
    },
    pickGem: {

        flex: 1,
        color: "#1e272e",
        fontSize: 20,
        backgroundColor: "#D7C58D",
        // borderWidth: 0,
        transform: [
            { scaleX: 1.1 },
            { scaleY: 1.1 },
        ],
        // backgroundColor: "red",
        // height: 100,
        width: "88%",
        margin: 16
    },
    descriptionContainer: {
        width: "100%",
        // justifyContent: "center",
        alignItems: "center",
    },
    description: {
        padding: 5,
        marginTop: 8,
        width: "95%",
        borderColor: "#34495e",
        backgroundColor: "#F7E6CC",
        borderWidth: 0,
        // borderWidth: 0,
        alignItems: "center",
        fontSize: 25,
        borderWidth: 2,
        ...Platform.select({
            android: {
                elevation: 1

            },
            ios: {
                // shadowColor: "rgb(50,50,50)",
                shadowOpacity: 0.5,
                shadowRadius: 10,
                shadowOffset: {
                    height: -1,
                    width: 0
                }
            }
        })

    },
    sumbit: {
        justifyContent: "center",
        alignItems: "center",
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 10
    },
    sumbitButton: {
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