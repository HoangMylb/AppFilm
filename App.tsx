import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SplashScreen from './src/screens/SplashScreen'
import Login from './src/screens/Login'
import Home from './src/screens/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notification from './src/screens/Notification'
import PayMode from './src/screens/PayMode'
import PaySuccess from './src/screens/PaySuccess'
import PayLosing from './src/screens/PayLosing'



const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/>
    //     <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
    //     <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
    //   </Stack.Navigator>
    // </NavigationContainer>
    // <Notification />
    // <PayMode/>
    <PayLosing />

  )
}

export default App

const styles = StyleSheet.create({})