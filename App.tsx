import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SplashScreen from './src/screens/SplashScreen'
import Login from './src/screens/Login'
import Home from './src/screens/Home'
import BuyTickets from './src/screens/BuyTickets'
import Location from './src/screens/Location'
import DetailMovie from './src/screens/DetailMovie'
import Favourite from './src/screens/FavouriteMovie'
import News from './src/screens/News'
import User from './src/screens/User'
import Register from './src/screens/Register'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notification from './src/screens/Notification'
import PayMode from './src/screens/PayMode'
import PaySuccess from './src/screens/PaySuccess'
import PayLosing from './src/screens/PayLosing'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FavouriteMovie from './src/screens/FavouriteMovie'
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TimeSelect from './src/screens/TimeSelect'
import ForgotpassWord from './src/screens/ForgotpassWord'
import ForgetpassWordOtp from './src/screens/ForgetpassWordOtp'
import SubmitPassword from './src/screens/SubmitPassword'
import SeatSelect from './src/screens/SeatSelect'




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTab(){
  return(
    <Tab.Navigator 
    screenOptions={({route}) => ({
      tabBarStyle: {backgroundColor: 'black'},
      headerShown: false,
      tabBarShowLabel: false,
      // tabBarActiveTintColor: 'black',
      // tabBarInactiveTintColor: 'white',
      tabBarIcon: ({focused, color, size}) => {
        if (route.name === 'HomeTab') {
          return <MaterialCommunityIcons name="home-variant" size={size} color={focused ? 'white' : 'gray'} />;
        } else if (route.name === 'LocationTab') {
          return <MaterialCommunityIcons name="ticket-confirmation-outline" size={size} color={focused ? 'white' : 'gray'} />;
        }else if (route.name === 'FMTab') {
          return <Feather name="heart" size={size} color={focused ? 'white' : 'gray'} />;
        }else if (route.name === 'NewsTab') {
          return <Ionicons name="notifications" size={size} color={focused ? 'white' : 'gray'} />;
        }
      },
    })}>
    <Stack.Screen name="HomeTab" component={Home} options={{ headerShown: false }}/>
    <Stack.Screen name="LocationTab" component={Location} options={{ headerShown: false }}/>
    <Stack.Screen name="FMTab" component={FavouriteMovie} options={{ headerShown: false }}/>
    <Stack.Screen name="NewsTab" component={News} options={{ headerShown: false }}/>
    {/* <Stack.Screen name="forgotOTP" component={ForgetpassWordOtp} options={{ headerShown: false }}/>
    <Stack.Screen name="forgot" component={ForgotpassWord} options={{ headerShown: false }}/>
    <Stack.Screen name="SeatSelect" component={SeatSelect} options={{ headerShown: false }}/>
    <Stack.Screen name="Submid" component={SubmitPassword} options={{ headerShown: false }}/>
    <Stack.Screen name="TimeSelect" component={TimeSelect} options={{ headerShown: false }}/> */}

    </Tab.Navigator>
  )
  
}
const App = () => {
  return (

    //<Location/>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
        <Stack.Screen name="BuyTickets" component={BuyTickets}/>
        <Stack.Screen name="DetailMovie" component={DetailMovie} />
        <Stack.Screen name="FavouriteMovie" component={FavouriteMovie} />
        <Stack.Screen name="Splash" component={SplashScreen}/>
        <Stack.Screen name="Home" component={MyTab} />
        <Stack.Screen name="News" component={News}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Register" component={Register} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})