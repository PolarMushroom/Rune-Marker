import * as React from 'react';
import { Button, View, Text, Alert } from 'react-native';
import Loading from './Loading';
import Home from "./Home";
import Gem from './components/Gem'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Grindstone from './components/Grindstone';
import RuneCustom from './components/RuneCustom';
import runePick from './runePick'
import Runes from './components/Runes';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';




const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>


        <Stack.Screen name="Home" component={Home} options={{
          headerStyle: {
            backgroundColor: '#372211',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: "#DFC87F"
          },
          title: 'Rune Marker',
          headerRight: () => (
            <TouchableOpacity onPressOut={() => { Alert.alert("Report Bug to:\nvictoriy104@gmail.com") }}>
              <Icon
                name='bug'
                type='font-awesome'
                iconStyle={{ marginRight: 10 }}
                color='#DFC87F'
              />
            </TouchableOpacity>
          )
        }} />

        <Stack.Screen name="Gem" component={Gem} />
        <Stack.Screen name="Grindstone" component={Grindstone} />
        <Stack.Screen name="RuneCustom" component={RuneCustom} options={{
          headerStyle: {
            backgroundColor: '#372211',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: "#DFC87F"
          }, title: 'Rune Page',

        }} />
        <Stack.Screen name="runePick" component={runePick} options={{
          headerStyle: {
            backgroundColor: '#372211',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: "#DFC87F",
            // color: "#9F8B58"
          }, title: 'Create Rune',

        }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default class app extends React.Component {
  state = {
    isLoading: false

  }




  render() {
    const { isLoading } = this.state
    return isLoading ? <Loading /> : <MyStack />
    // isLoading ? <Loading /> : <Home />
  }

}

