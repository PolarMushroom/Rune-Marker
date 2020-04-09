import React from 'react';
import { View, StyleSheet, Text, Dimensions, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types'
const { width } = Dimensions.get("window");

export default class Runes extends React.Component {
    state = {
        isCompleted: false
    }

    static propTypes = {
        runeType: PropTypes.string.isRequired,
        runeNum: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
        gemPrev: PropTypes.string.isRequired,
        goToEdit: PropTypes.func.isRequired,
        // uncompleteToDo: PropTypes.func.isRequired,
        deleteRune: PropTypes.func.isRequired,
        // completeToDo: PropTypes.func.isRequired,
        // updateToDo: PropTypes.func.isRequired
    }

    _toggleComplete = () => {

        this.setState(prevState => {

            return {

                isCompleted: !prevState.isCompleted
            }

        })
    }
    render() {
        const { runeType, runeNum, deleteRune, id, gemPrev, goToEdit } = this.props;
        const { isCompleted } = this.state
        return <View style={styles.container}>
            <View style={styles.column}>
                <TouchableOpacity onPress={this._toggleComplete}>
                    <View style={[styles.raido, isCompleted ? styles.completedRadio : styles.unCompletedRaido]}></View>
                </TouchableOpacity>
                <TouchableOpacity onPressOut={() => goToEdit(id)}>
                    <Text style={[styles.text, isCompleted ? styles.completedText : styles.unCompletedText]}>{runeType} {gemPrev}number {runeNum}ss</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPressOut={() => Alert.alert("dasda")}>
                    <View style={styles.actionContainer}>
                        <Text style={styles.actionText} >✏️</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { deleteRune(id) }}>
                    <View style={styles.actionContainer}  >
                        <Text style={styles.actionText}>❌</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: "#fff",
        flexDirection: "row",
        // borderBottomWidth: StyleSheet.hairlineWidth,
        alignItems: "center",
        // justifyContent: "space-between"
    },
    column: {
        flex: 1,

        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-between",
        width: width / 2
        // justifyContent: "space-between",

    },
    raido: {
        width: 30,
        height: 30,
        borderRadius: 15,

        borderWidth: 3,
        marginRight: 20
    },
    completedRadio: {
        borderColor: "#bbb"
    },
    unCompletedRaido: {
        borderColor: "#F23657"
    },
    actions: {

        flexDirection: "row",

    },
    actionContainer: {

        marginVertical: 10,
        marginHorizontal: 8
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    unCompletedText: {

    },
});