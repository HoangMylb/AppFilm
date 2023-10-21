import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
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
import AsyncStorage from '@react-native-async-storage/async-storage'

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
  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Biến tạm thời
  useEffect(() => {
    // Trong một hàm useEffect để thực hiện lấy giá trị từ AsyncStorage khi màn hình được tải
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('keepLogedIn');
        if (storedData !== null) {
          const parsedData = storedData === 'true';
          setData(parsedData); // Gán giá trị từ AsyncStorage cho state data
        }
      } catch (error) {
        // Xử lý lỗi nếu cần
      } finally {
        setIsLoading(false); // Đã tải xong dữ liệu từ AsyncStorage
      }

    };

    fetchData(); // Gọi hàm fetchData để lấy dữ liệu từ AsyncStorage khi màn hình được tải
  }, []);
  console.log("dataApp: " + data);
  return (


    //<Location/>
    <UserProvider>
      <NavigationContainer>
        {isLoading ? ( // Nếu isLoading là true, hiển thị SplashScreen
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        ) : data ? ( // Nếu đã đăng nhập, hiển thị MyTab
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={MyTab} options={{ headerShown: false }} />
            <Stack.Screen name="BuyTickets" component={BuyTickets} options={{ headerShown: false }} />
            <Stack.Screen name="News" component={News} options={{ headerShown: false }} />
            <Stack.Screen name="DetailMovie" component={DetailMovie} options={{ headerShown: false }} />
            <Stack.Screen name="User" component={User} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          </Stack.Navigator>
        ) : ( // Nếu chưa đăng nhập, hiển thị màn hình đăng nhập
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={MyTab} options={{ headerShown: false }} />
            <Stack.Screen name="BuyTickets" component={BuyTickets} options={{ headerShown: false }} />
            <Stack.Screen name="News" component={News} options={{ headerShown: false }} />
            <Stack.Screen name="DetailMovie" component={DetailMovie} options={{ headerShown: false }} />
            <Stack.Screen name="User" component={User} options={{ headerShown: false }} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </UserProvider>
  )
}

export default App

const styles = StyleSheet.create({})