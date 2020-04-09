import * as React from 'react';
import { Button, View, Text } from 'react-native';
import Loading from './Loading';
import Home from "./Home";
import Gem from './components/Gem'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Grindstone from './components/Grindstone';
import Reappraisal from './components/Reappraisal';
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
            backgroundColor: '#fff',
          },
          headerRight: ({ navigate }) => (<Button title="Gem" onPress={() => navigation.navigate('Gem')} ></Button>),
          headerTitleStyle: {
            fontWeight: 'bold',
          }, title: 'My home'
        }} />
        {/* options={{ headerRight: () => (<Button onPress={() => navigate('Picker')} title="+" />), }} */}
        <Stack.Screen name="Gem" component={Gem} />
        <Stack.Screen name="Runes" component={Runes} />
        <Stack.Screen name="Grindstone" component={Grindstone} />
        <Stack.Screen name="Reappraisal" component={Reappraisal} />
        <Stack.Screen name="runePick" component={runePick} />
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
    return isLoading ? <Loading /> : <NavigationContainer>
      <Stack.Navigator>


        <Stack.Screen name="Home" component={Home} options={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          }, title: 'My home'
        }} />

        <Stack.Screen name="Gem" component={Gem} />
        <Stack.Screen name="Grindstone" component={Grindstone} />
        <Stack.Screen name="Reappraisal" component={Reappraisal} />
        <Stack.Screen name="runePick" component={runePick} />
      </Stack.Navigator>
    </NavigationContainer>

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
