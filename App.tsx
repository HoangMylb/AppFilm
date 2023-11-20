import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import SplashScreen from './src/screens/SplashScreen'
import Login from './src/screens/Login'
import Home from './src/screens/Home'
import BuyTickets from './src/screens/BuyTickets'
import Location from './src/screens/Location'

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
import { PhimProvider } from './src/context/PhimContext'
import { ThanhToanProvider } from './src/context/ThanhToanContext'
import { TinTucProvider } from './src/context/TinTucContext'
import DetailNews from './src/screens/DetailNews'
import TicketYeuThich from './src/screens/TicketYeuThich'
import { StripeProvider } from '@stripe/stripe-react-native';

import TimeSelect from './src/screens/TimeSelect'
import SeatSelect from './src/screens/SeatSelect'
import PayLosing from './src/screens/PayLosing'
import PaySuccess from './src/screens/PaySuccess'
import Notification from './src/screens/Notification'
import DetailNotification from './src/screens/DetailNotification'
import Launching from './src/screens/Launching'
import BuyTicketsSC from './src/screens/BuyTicketsSC'
import Comings from './src/screens/Comings'
import SplashScreen2 from './src/screens/SplashScreen2'
import ForgetpassWordOtp from './src/screens/ForgetpassWordOtp'
import ForgotpassWord from './src/screens/ForgotpassWord'
import SubmitPassword from './src/screens/SubmitPassword'
import TicketYeuThichSC from './src/screens/TicketYeuThichSC'
import Test from './src/screens/Test'

import RegisterGG from './src/screens/RegisterGG'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const STRIPE_KEY =
  'pk_test_51O5zgSKMZHI0cJ8HdoYy9hJMPIGaX4yv1eX43MfhIzvwyosEg2zkZLYSappFRg3YDVpMAwitRQnhw4JRPXJdvrXI00b6A9VyqK';
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
          } else if (route.name === 'Notification') {
            return <Ionicons name="notifications" size={size} color={focused ? 'white' : 'gray'} />;
          } else if (route.name === 'FMTab') {
            return <Feather name="heart" size={size} color={focused ? 'white' : 'gray'} />;
          } else if (route.name === 'NewsTab') {
            return <MaterialCommunityIcons name="ticket-confirmation-outline" size={size} color={focused ? 'white' : 'gray'} />;
          }
        },
      })}>
      <Stack.Screen name="HomeTab" component={Home} options={{ headerShown: false }} ></Stack.Screen>
      <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
      <Stack.Screen name="FMTab" component={FavouriteMovie} options={{ headerShown: false }} />
      <Stack.Screen name="NewsTab" component={News} options={{ headerShown: false }} />
    </Tab.Navigator>
  )

}
function Yeuthich() {
  return (
    <Tab.Navigator
      initialRouteName='FMTab'
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: 'black' },
        headerShown: false,
        tabBarShowLabel: false,
        // tabBarActiveTintColor: 'black',
        // tabBarInactiveTintColor: 'white',
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'HomeTab') {
            return <MaterialCommunityIcons name="home-variant" size={size} color={focused ? 'white' : 'gray'} />;
          } else if (route.name === 'Notification') {
            return <Ionicons name="notifications" size={size} color={focused ? 'white' : 'gray'} />;
          } else if (route.name === 'FMTab') {
            return <Feather name="heart" size={size} color={focused ? 'white' : 'gray'} />;
          } else if (route.name === 'NewsTab') {
            return <MaterialCommunityIcons name="ticket-confirmation-outline" size={size} color={focused ? 'white' : 'gray'} />;
          }
        },
      })}>
      <Stack.Screen name="HomeTab" component={Home} options={{ headerShown: false }} ></Stack.Screen>
      <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
      <Stack.Screen name="FMTab" component={FavouriteMovie} options={{ headerShown: false }} />
      <Stack.Screen name="NewsTab" component={News} options={{ headerShown: false }} />
    </Tab.Navigator>
  )

}
function TinTuc() {
  return (
    <Tab.Navigator
      initialRouteName='NewsTab'
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: 'black' },
        headerShown: false,
        tabBarShowLabel: false,
        // tabBarActiveTintColor: 'black',
        // tabBarInactiveTintColor: 'white',
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'HomeTab') {
            return <MaterialCommunityIcons name="home-variant" size={size} color={focused ? 'white' : 'gray'} />;
          } else if (route.name === 'Notification') {
            return <Ionicons name="notifications" size={size} color={focused ? 'white' : 'gray'} />;
          } else if (route.name === 'FMTab') {
            return <Feather name="heart" size={size} color={focused ? 'white' : 'gray'} />;
          } else if (route.name === 'NewsTab') {
            return <MaterialCommunityIcons name="ticket-confirmation-outline" size={size} color={focused ? 'white' : 'gray'} />;
          }
        },
      })}>
      <Stack.Screen name="HomeTab" component={Home} options={{ headerShown: false }} ></Stack.Screen>
      <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
      <Stack.Screen name="FMTab" component={FavouriteMovie} options={{ headerShown: false }} />
      <Stack.Screen name="NewsTab" component={News} options={{ headerShown: false }} />
    </Tab.Navigator>
  )

}
function ThongBao() {
  return (
    <Tab.Navigator
      initialRouteName='Notification'
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: 'black' },
        headerShown: false,
        tabBarShowLabel: false,
        // tabBarActiveTintColor: 'black',
        // tabBarInactiveTintColor: 'white',
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'HomeTab') {
            return <MaterialCommunityIcons name="home-variant" size={size} color={focused ? 'white' : 'gray'} />;
          } else if (route.name === 'Notification') {
            return <Ionicons name="notifications" size={size} color={focused ? 'white' : 'gray'} />;
          } else if (route.name === 'FMTab') {
            return <Feather name="heart" size={size} color={focused ? 'white' : 'gray'} />;
          } else if (route.name === 'NewsTab') {
            return <MaterialCommunityIcons name="ticket-confirmation-outline" size={size} color={focused ? 'white' : 'gray'} />;
          }
        },
      })}>
      <Stack.Screen name="HomeTab" component={Home} options={{ headerShown: false }} ></Stack.Screen>
      <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
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

    // <PhimProvider>
    // <Test/>
    // </PhimProvider> 
    //
    <UserProvider>
      
      <PhimProvider>
        <ThanhToanProvider>
          <TinTucProvider>
            <StripeProvider publishableKey={STRIPE_KEY}>
              <NavigationContainer>
              <Stack.Screen name="Test" component={Test} options={{ headerShown: false }} />
                {isLoading ? ( // Nếu isLoading là true, hiển thị SplashScreen
                  <Stack.Screen name="Splash2" component={SplashScreen2} options={{ headerShown: false }} />
                ) : data ? ( // Nếu đã đăng nhập, hiển thị MyTab
                  <Stack.Navigator initialRouteName="Splash">
                    <Stack.Screen name="Splash2" component={SplashScreen2} options={{ headerShown: false }} />
                    <Stack.Screen name="Home" component={MyTab} options={{ headerShown: false }} />
                    <Stack.Screen name="TinTuc" component={TinTuc} options={{ headerShown: false }} />
                    <Stack.Screen name="YeuThich" component={Yeuthich} options={{ headerShown: false }} />
                    <Stack.Screen name="ThongBao" component={ThongBao} options={{ headerShown: false }} />

                    <Stack.Screen name="ForgetpassWordOtp" component={ForgetpassWordOtp} options={{ headerShown: false }} />
                    <Stack.Screen name="ForgotpassWord" component={ForgotpassWord} options={{ headerShown: false }} />
                    <Stack.Screen name="SubmitPassword" component={SubmitPassword} options={{ headerShown: false }} />
                    <Stack.Screen name="TicketYeuThichSC" component={TicketYeuThichSC} options={{ headerShown: false }} />

                    <Stack.Screen name="DetailNotification" component={DetailNotification} options={{ headerShown: false }} />
                    <Stack.Screen name="BuyTickets" component={BuyTickets} options={{ headerShown: false }} />
                    <Stack.Screen name="BuyTicketsSC" component={BuyTicketsSC} options={{ headerShown: false }} />
                    <Stack.Screen name="Location" component={Location} options={{ headerShown: false }} />
                    <Stack.Screen name="News" component={News} options={{ headerShown: false }} />
                    <Stack.Screen name="TicketsYeuThich" component={TicketYeuThich} options={{ headerShown: false }} />
                    <Stack.Screen name="Comings" component={Comings} options={{ headerShown: false }} />
                    <Stack.Screen name="Launching" component={Launching} options={{ headerShown: false }} />
                    <Stack.Screen name="DetailNews" component={DetailNews} options={{ headerShown: false }} />
                    <Stack.Screen name="User" component={User} options={{ headerShown: false }} />
                    <Stack.Screen name="PayLosing" component={PayLosing} options={{ headerShown: false }} />
                    <Stack.Screen name="PaySuccess" component={PaySuccess} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="TimeSelect" component={TimeSelect} options={{ headerShown: false }} />
                    <Stack.Screen name="SeatSelect" component={SeatSelect} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                    <Stack.Screen name="RegisterGG" component={RegisterGG} options={{ headerShown: false }} />
                  </Stack.Navigator>
                ) : ( // Nếu chưa đăng nhập, hiển thị màn hình đăng nhập
                  <Stack.Navigator
                    initialRouteName="Splash"
                  >
                    <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                    <Stack.Screen name="TinTuc" component={TinTuc} options={{ headerShown: false }} />
                    <Stack.Screen name="YeuThich" component={Yeuthich} options={{ headerShown: false }} />
                    <Stack.Screen name="ThongBao" component={ThongBao} options={{ headerShown: false }} />
                    <Stack.Screen name="Home" component={MyTab} options={{ headerShown: false }} />
                    <Stack.Screen name="Comings" component={Comings} options={{ headerShown: false }} />
                    <Stack.Screen name="Launching" component={Launching} options={{ headerShown: false }} />
                    <Stack.Screen name="PayLosing" component={PayLosing} options={{ headerShown: false }} />
                    <Stack.Screen name="DetailNotification" component={DetailNotification} options={{ headerShown: false }} />
                    <Stack.Screen name="PaySuccess" component={PaySuccess} options={{ headerShown: false }} />
                    <Stack.Screen name="Location" component={Location} options={{ headerShown: false }} />
                    <Stack.Screen name="TicketYeuThichSC" component={TicketYeuThichSC} options={{ headerShown: false }} />
                    <Stack.Screen name="TicketsYeuThich" component={TicketYeuThich} options={{ headerShown: false }} />
                    <Stack.Screen name="BuyTickets" component={BuyTickets} options={{ headerShown: false }} />
                    <Stack.Screen name="News" component={News} options={{ headerShown: false }} />
                    <Stack.Screen name="ForgetpassWordOtp" component={ForgetpassWordOtp} options={{ headerShown: false }} />
                    <Stack.Screen name="ForgotpassWord" component={ForgotpassWord} options={{ headerShown: false }} />
                    <Stack.Screen name="SubmitPassword" component={SubmitPassword} options={{ headerShown: false }} />
                    <Stack.Screen name="DetailNews" component={DetailNews} options={{ headerShown: false }} />
                    <Stack.Screen name="TimeSelect" component={TimeSelect} options={{ headerShown: false }} />
                    <Stack.Screen name="SeatSelect" component={SeatSelect} options={{ headerShown: false }} />
                    <Stack.Screen name="User" component={User} options={{ headerShown: false }} />
                    <Stack.Screen name="BuyTicketsSC" component={BuyTicketsSC} options={{ headerShown: false }} />
                    <Stack.Screen name="RegisterGG" component={RegisterGG} options={{ headerShown: false }} />
                  </Stack.Navigator>
                )}
              </NavigationContainer>
            </StripeProvider>
          </TinTucProvider>
        </ThanhToanProvider>
      </PhimProvider>
    </UserProvider>
  )
}

export default App

const styles = StyleSheet.create({})