import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SplashScreen from './src/screens/SplashScreen'
import Login from './src/screens/Login'
import Home from './src/screens/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TimeSelect from './src/screens/TimeSelect'
import ForgotpassWord from './src/screens/ForgotpassWord'
import ForgetpassWordOtp from './src/screens/ForgetpassWordOtp'
import SubmitPassword from './src/screens/SubmitPassword'
import SeatSelect from './src/screens/SeatSelect'




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
    <TimeSelect/>
    //<ForgotpassWord/>
    //<ForgetpassWordOtp/>
    //<SubmitPassword/>
    //<SeatSelect/>
  )
}

export default App

const styles = StyleSheet.create({})