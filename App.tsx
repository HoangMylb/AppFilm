import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SplashScreen from './src/screens/SplashScreen'
import Login from './src/screens/Login'
import Home from './src/screens/Home'
<<<<<<< Updated upstream
import BuyTickets from './src/screens/BuyTickets'
import Location from './src/screens/Location'
=======
import User from './src/screens/User'
import Register from './src/screens/Register'
>>>>>>> Stashed changes
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();

const App = () => {
  return (

    //<Location/>
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="BuyTickets" component={BuyTickets} options={{ headerShown: false }}/>
        <Stack.Screen name="Location" component={Location} options={{ headerShown: false }}/>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="User" component={User} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})