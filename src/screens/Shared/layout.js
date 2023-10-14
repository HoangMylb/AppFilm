import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Location from '../Location'
import Home from '../Home'
import FavouriteMovie from '../FavouriteMovie'
const Tabs = createBottomTabNavigator();

const layout = () => {
    return (
            <Tabs.Navigator>
            <Tabs.Screen name="a" component={Home} options={{ headerShown: false }}/>
            <Tabs.Screen name="b" component={Location} options={{ headerShown: false }} />
            <Tabs.Screen name="c" component={FavouriteMovie} options={{}} />
            </Tabs.Navigator>
    )
}

export default layout

