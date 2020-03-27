import React from 'react';
import Loading from './Loading';
import Home from "./Home";
import Gem from './Gem'
import { NavigationContainer } from 'react-navigation';
// import { createStackNavigator } from "react-native-stack"


// const Navigator = createStackNavigator({
//   Home: { screen: Home },
//   Gem: { screen: Gem }
// });
// const Stack = createStackNavigator();

export default class extends React.Component {
  state = {
    isLoading: false

  }


  render() {
    const { isLoading } = this.state
    return isLoading ? <Loading /> : <Home />
  }

}


