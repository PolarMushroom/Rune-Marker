import React from "react";

import { StyleSheet, Text, View, Button, AsyncStorage, Alert } from 'react-native';
import { ScrollView, FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Runes from './components/Runes'
import { SearchBar } from 'react-native-elements';
import { Icon } from "react-native-elements";
import { HitTestResultTypes } from "expo/build/AR";
import { element } from "prop-types";

function Item({ id, runeType, runeNum, gemPrev, goToEdit, deleteRune }) {

    return (

        <View style={styles.container}>
            <TouchableOpacity onPressOut={() => goToEdit(id)}>
                <Text style={styles.text}>{runeType} {gemPrev}number {runeNum}</Text>
            </TouchableOpacity>
            <View style={styles.actions}>
                <TouchableOpacity onPressOut={() => deleteRune(id)}>
                    <View style={styles.actionContainer}>
                        <Text style={styles.actionText}>❌</Text>
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
    _updateSearch = searcht => {
        this.setState({ search: searcht.toLowerCase() });
        const { search } = this.state
        if (search == "") {
            console.log("empty~~");
        } else {
            this._getSearch()
        }

    };
    componentDidMount = () => {
        this._loadRunes();
    }
    _getSearch = async () => {
        const { runes, search } = this.state;

        // const tss = Object.values(runes)[0]
        // tss.shift();
        // use str includes and array faor each
        // console.log(searchTest.includes(search));
        search.toLowerCase();
        const ww = Object.values(Object.values(runes))
        // console.log(ww);
        // console.log("=====================================================");

        let runeIdList = []

        // const iterator = ww.values();
        // var results = [];
        for (var i = 0; i < ww.length; i++) {
            let testing = []
            let ss = search
            testing = Object.values(ww[i])
            ss = Object.values(ww[i])
            // console.log(ss[0]);
            // console.log("=====================================================");

            testing.pop()
            testing.pop()
            testing.pop()


            console.log(testing);
            //check search result and add on runes
            testing.forEach(element => {
                if (element.includes(search) == true) {


                    //add ID to the array List
                    runeIdList.push(ss[6]);
                    // console.log(ss);


                    // console.log(element.includes(search))
                } else {
                    // console.log("nope");
                }

            });
            console.log(runeIdList);
            // var joined = this.state.searchRuneList.concat([runeIdList]);

            // this.setState({ searchRuneList: [...runeIdList] })
            // runeIdList.forEach(element => this.setState({ searchRuneList: "hello world" }));
            await this._updateRuneList(runeIdList)
            // console.log(testing.substring(0, 3) === search);
            // testing.includes(testing)
            console.log("=====================================================");
            const { searchRuneList } = this.state
            console.log(`actual data : ${searchRuneList}`);

        }

        this._checking()
        // ww.shift();
        // ww.forEach(element => console.log(element.includes(search)));




        // console.log(ww[2]);
        // if(Object.values(runes)[0] == search)
        // console.log(Object.values(Object.values(runes)[0]))
    }
    _checking = () => {
        const { runes, searchRuneList } = this.state
        let newState = {}
        let iphone = {}

        console.log(searchRuneList[0].length);
        for (let index = 0; index < searchRuneList[0].length; index++) {

            const newList = {
                [searchRuneList[0][index]]: runes[searchRuneList[0][index]]

            };

            newState = {

                ...newState,
                ...newList

            };


        }
        console.log(newState);

        this.setState({ runes: newState })
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
                        containerStyle={{ width: "100%" }}
                        placeholder="Type Here..."
                        onChangeText={this._updateSearch}

                        value={search}
                        lightTheme={true}
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
                    <Icon name='add-circle' color="#2980b9" onPress={() => this.props.navigation.navigate('runePick')}></Icon>
                </View>
                <Button title="callback" disabled={false} onPress={() => this._checking()}></Button>

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
    as: {
        backgroundColor: "red"
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