import * as React from 'react';
import { Button, View, Text } from 'react-native';
import Loading from './Loading';
import Home from "./Home";
import Gem from './components/Gem'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Grindstone from './components/Grindstone';
import RuneCustom from './components/RuneCustom';
import runePick from './runePick'
import Runes from './components/Runes';




const Stack = createStackNavigator();
// function sendPicker({ navigation }) {
//   return navigation.navigate('Picker')
// }
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
            color: "#9F8B58"
          }, title: 'Rune Marker',

        }} />

        <Stack.Screen name="Gem" component={Gem} />
        <Stack.Screen name="Grindstone" component={Grindstone} />
        <Stack.Screen name="RuneCustom" component={RuneCustom} options={{
          headerStyle: {
            backgroundColor: '#372211',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: "#9F8B58"
          }, title: 'Rune Page',

        }} />
        <Stack.Screen name="runePick" component={runePick} options={{
          headerStyle: {
            backgroundColor: '#372211',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: "#9F8B58"
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


// import * as React from 'react';
// import { Button, View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         title="Go to Profile"
//         onPress={() => navigation.navigate('Apap')}
//       />
//     </View>
//   );
// }


// function ProfileScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         title="Go to Notifications"
//         onPress={() => navigation.navigate('Notifications')}
//       />
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

// function NotificationsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         title="Go to Settings"
//         onPress={() => navigation.navigate('Settings')}
//       />
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

// function SettingsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

// const Stack = createStackNavigator();

// function MyStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Apap" component={Apap} />
//       <Stack.Screen name="Papa" component={Papa} />
//       <Stack.Screen name="Notifications" component={NotificationsScreen} />
//       <Stack.Screen name="Profile" component={ProfileScreen} />
//       <Stack.Screen name="Settings" component={SettingsScreen} />
//     </Stack.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyStack />
//     </NavigationContainer>
//   );
// }
