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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FavouriteMovie from './src/screens/FavouriteMovie'
import { UserProvider } from './src/context/UserContext'
import Feather from 'react-native-vector-icons/Feather';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: 'black' },
        headerShown: false,
        tabBarShowLabel: false,
        // tabBarActiveTintColor: 'black',
        // tabBarInactiveTintColor: 'white',
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'HomeTab') {
            return <MaterialCommunityIcons name="home-variant" size={size} color={focused ? 'white' : 'gray'} />;
          } else if (route.name === 'LocationTab') {
            return <MaterialCommunityIcons name="ticket-confirmation-outline" size={size} color={focused ? 'white' : 'gray'} />;
          } else if (route.name === 'FMTab') {
            return <Feather name="heart" size={size} color={focused ? 'white' : 'gray'} />;
          } else if (route.name === 'NewsTab') {
            return <Ionicons name="notifications" size={size} color={focused ? 'white' : 'gray'} />;
          }
        },
      })}>
      <Stack.Screen name="HomeTab" component={Home} options={{ headerShown: false }} ></Stack.Screen>
      <Stack.Screen name="LocationTab" component={Location} options={{ headerShown: false }} />
      <Stack.Screen name="FMTab" component={FavouriteMovie} options={{ headerShown: false }} />
      <Stack.Screen name="NewsTab" component={News} options={{ headerShown: false }} />
    </Tab.Navigator>
  )

}
const App = () => {
  return (

    //<Location/>
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator >
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={MyTab} options={{ headerShown: false }} />
          <Stack.Screen name="BuyTickets" component={BuyTickets} options={{ headerShown: false }} />
          <Stack.Screen name="News" component={News} options={{ headerShown: false }} />
          <Stack.Screen name="DetailMovie" component={DetailMovie} options={{ headerShown: false }} />
          <Stack.Screen name="User" component={User} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  )
}

export default App

const styles = StyleSheet.create({})