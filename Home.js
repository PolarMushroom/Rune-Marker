import React from "react";

import { StyleSheet, Text, View, Button, AsyncStorage, Alert } from 'react-native';
import { ScrollView, FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Runes from './components/Runes'
import { SearchBar, Icon } from 'react-native-elements';

function Item({ id, runeType, runeNum, mainOption, gemPrev, gemAfter, grindStone, goToEdit, deleteRune }) {

    return (

        <View style={styles.itemContainer}>
            <View style={styles.runeDescription}>
                <TouchableOpacity onPressOut={() => goToEdit(id)}>
                    <Text style={styles.runeType}> {runeType.charAt(0).toUpperCase() + runeType.slice(1)} ({runeNum}) {mainOption}{checkGem(gemAfter)}{checkGrindStone(grindStone, gemAfter)}</Text>
                    {/* <Text style={styles.runeType}></Text> */}
                    {/* <Text style={styles.runeType}>{checkGem(gemAfter)}{checkGrindStone(grindStone)}</Text> */}
                    {/* <Text style={styles.text}></Text> */}
                </TouchableOpacity>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPressOut={() => deleteRune(id)}>
                    <View style={styles.actionContainer}>
                        {/* <Text style={styles.actionText}>s</Text> */}
                        <Icon
                            name='trash'
                            type='font-awesome'
                            iconStyle={styles.actionText}
                            color='#DFC87F'
                        />

                        {/* <i class="far fa-trash-alt"></i> */}
                    </View>
                </TouchableOpacity>
                {/* <TouchableOpacity onPressOut={() => { () => deleteRune(id) }}>
                    <View style={styles.actionContainer}  >
                        <Text style={styles.actionText}>❌</Text>
                    </View>
                </TouchableOpacity> */}
            </View>
        </View>
    );
}
//check gemAfter is exist True:return value / False:return null
function checkGem(input) {
    // console.log(input);
    if (input !== "0") {
        const grindStone = input
        return `\n Gem: ${grindStone}`
    } else {
        return ""
    }
}
function checkGrindStone(input, checkGem) {
    // console.log(input);

    if (input !== "" && checkGem !== "") {
        const gemAfter = input
        return ` Grindstone: ${gemAfter}`
    } else if (input !== "" && checkGem == "") {
        const gemAfter = input
        return `\n Grindstone: ${gemAfter}`
    } else {
        return ""
    }
}
export default class Home extends React.Component {
    // _isMounted = false;
    state = {
        newRune: "",
        // loadedRunes: false,
        runes: {},
        runeSearch: {},
        search: "",
        searchRuneList: []
    }
    _updateSearch = async (searcht) => {
        const searching = searcht.toLowerCase();

        await this.setState({
            search: searcht
        });
        const { search } = this.state
        console.log(`after ${searcht}`);

        if (search == "") {
            console.log("empty~~");
        } else {
            console.log(search);

            this._getSearch()
        }

    };
    componentDidMount = () => {
        this._loadRunes();
    }
    _getSearch = async () => {
        const { runes, search } = this.state;
        console.log(search);

        // const tss = Object.values(runes)[0]
        // tss.shift();
        // use str includes and array faor each
        // console.log(searchTest.includes(search));
        // search.toLowerCase();
        const ww = Object.values(Object.values(runes))
        // console.log(ww);
        // console.log("=====================================================");

        let runeIdList = []
        console.log(ww);

        // const iterator = ww.values();
        // var results = [];
        for (var i = 0; i < ww.length; i++) {
            let tested = []
            let ss = search
            tested = Object.values(ww[i])
            ss = Object.values(ww[i])
            // console.log(ss[0]);
            // console.log("=====================================================");

            tested.pop()
            tested.pop()
            tested.pop()


            console.log(tested);
            //check search result and add on runes
            tested.forEach(element => {
                if (element.toLowerCase().includes(search.toLowerCase()) == true) {


                    //add ID to the array List
                    runeIdList.push(ss[7]);
                    // console.log(ss);


                    // console.log(element.includes(search))
                } else {
                    // console.log("nope");
                }

            });
            // console.log(runeIdList);
            // var joined = this.state.searchRuneList.concat([runeIdList]);

            // this.setState({ searchRuneList: [...runeIdList] })
            // runeIdList.forEach(element => this.setState({ searchRuneList: "hello world" }));
            await this._updateRuneList(runeIdList)
            // console.log(testing.substring(0, 3) === search);
            // testing.includes(testing)
            // console.log("=====================================================");a
            // const { searchRuneList } = this.statea
            // console.log(`actual data : ${searchRuneList}`);a

        }

        this._checking()
        // ww.shift();
        // ww.forEach(element => console.log(element.includes(search)));




        // console.log(ww[2]);
        // if(Object.values(runes)[0] == search)
        // console.log(Object.values(Object.values(runes)[0]))
    }
    _checking = async () => {
        const { runes, searchRuneList } = this.state
        let newState = {}

        // console.log(searchRuneList[0].length);
        for (let index = 0; index < searchRuneList[0].length; index++) {

            const newList = {
                [searchRuneList[0][index]]: runes[searchRuneList[0][index]]

            };

            newState = {

                ...newState,
                ...newList

            };


        }
        // console.log(newState);

        await this.setState({ runes: newState })
        // iphone = runes[searchRuneList[0][0]]
        // console.log(iphone);

    }
    _updateRuneList = async (list) => {
        //update ID list
        await this.setState({
            searchRuneList: [list]
        });


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

        this.props.navigation.navigate('RuneCustom', { id: id });
    }
    _saveRune = (newRunes) => {
        const saveRune = AsyncStorage.setItem("runes", JSON.stringify(newRunes))
    }
    _sss = () => {
        const { search } = this.state
        console.log(search);

    }

    _loadRunes = async () => {
        const { search } = this.state
        if (search == "") {
            try {
                // console.log("htet");

                const Runes = await AsyncStorage.getItem("runes");
                const parsedRunes = JSON.parse(Runes)

                this.setState({
                    //   loadedRunes: true,
                    runes: parsedRunes || {},
                    // searchRuneList: []
                });
                // const { runes } = this.stat


            } catch (error) {
                console.log(error)
            }
        } else {

        }
    }



    render() {
        { this._loadRunes() }
        const { runes, search } = this.state
        return (
            <View style={styles.container} >

                <View style={styles.nav}>
                    {/* <Text style={styles.text}>Welcome</Text> */}
                    <SearchBar
                        inputStyle={{ color: '#9F8B58', }}
                        containerStyle={{ width: "100%", backgroundColor: '#372211', borderWidth: 0, borderRadius: 5, borderTopWidth: 0, borderBottomWidth: 0 }}
                        placeholder="Type Here..."
                        onChangeText={this._updateSearch}
                        color={"#9F8B58"}
                        autoCorrect={false}
                        // noIcon={true}
                        round={true}
                        value={search}
                    // lightTheme={true}
                    />
                </View>
                {/* <Text>{runes[item].id}</Text> */}
                {/* <Runes
                        key={runes[item].id}
                        {...runes}
                        deleteRune={this._deleteRune}
                        goToEdit={this._goToEdit}
                    />} */}
                <FlatList
                    data={Object.keys(runes)}
                    renderItem={({ item }) => <Item
                        id={runes[item].id}
                        runeType={runes[item].runeType}
                        runeNum={runes[item].runeNum}
                        gemPrev={runes[item].gemPrev}
                        gemAfter={runes[item].gemAfter}
                        mainOption={runes[item].mainOption}
                        grindStone={runes[item].grindStone}
                        goToEdit={this._goToEdit}
                        deleteRune={this._deleteRune}
                    />}


                    keyExtractor={item => runes[item].id}
                />

                {/* <ScrollView>
                    {
                        Object.values(runes).reverse().map(runes =>
                            <Runes
                                key={runes.id}
                                {...runes}
                                deleteRune={this._deleteRune}
                                goToEdit={this._goToEdit}
                            />)
                    }
                </ScrollView> */}

                {/* <View style={styles.as}><Text>sds</Text></View> */}

                <View style={styles.iconContainer}>
                    <Icon name='add-circle' color="#DFC87F" onPress={() => this.props.navigation.navigate('runePick')}></Icon>
                </View>
                {/* <Button title="callback" disabled={false} onPress={() => this._sss()}></Button> */}

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
        flex: 1,
        backgroundColor: "#372211"
    },
    actionText: {
        fontSize: 24,
        fontWeight: "bold"
    },
    itemContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    },
    runeDescription: {
        flexDirection: "row",
        // backgroundColor: "red",
        justifyContent: "center"
    },
    runeType: {
        fontSize: 20,
        margin: 4,
        borderWidth: 2,
        borderRadius: 8,
        textAlign: "auto",
        color: "#DFC87F",
        // color: "#9F8B58",
        backgroundColor: "#533C21",
        borderColor: "#2B1606"
    },
    nav: {
        backgroundColor: "#372211",
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
        fontSize: 20,
        color: "#9F8B58",
        margin: 4,

    },
    actions: {
        marginRight: 10
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
        right: 25,
        bottom: 0,
        // backgroundColor: 'green',
        flexDirection: 'row',
        height: 60,
        justifyContent: 'flex-end',
    }
});