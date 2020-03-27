import * as React from 'react';
import { Button, View, Text } from 'react-native';
import Loading from './Loading';
import Home from "./Home";
import Gem from './Gem'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Grindstone from './Grindstone';
import Reappraisal from './Reappraisal';
// import { NavigationContainer } from 'react-navigation';
// import { createStackNavigator } from "react-native-stack"


// const Navigator = createStackNavigator({
//   Home: { screen: Home },
//   Gem: { screen: Gem }
// });
function Apap({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20 }}>Have you?</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Papa')}
      />
    </View>
  );
}
function Papa({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20 }}>Hod rune today!!!?</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Apapa')}
      />
    </View >
  );
}


const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Gem" component={Gem} />
        <Stack.Screen name="Grindstone" component={Grindstone} />
        <Stack.Screen name="Reappraisal" component={Reappraisal} />
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
