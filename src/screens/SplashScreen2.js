import { Image, ImageBackground, StyleSheet, Text, View,} from 'react-native'
import React, { useEffect } from 'react';
import { StackActions } from '@react-navigation/native';
const SplashScreen2 = (props) => {
    const {navigation} = props;

    useEffect(() => {
        setTimeout(() => {
         
          navigation.dispatch(StackActions.replace('Home'));
        }, 1000); // Chuyển đến màn hình Login sau 3 giây
      }, []);
  return (
    <View style = {styles.imgBackground}>
       <Image style = {styles.logo}
        source={{uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/logoSplash.png?alt=media&token=1ed723d7-8096-4ef5-b53e-26dacf21644a'}} 
        />
        <Text style = {styles.txtTitle}>Cinema Voyage</Text>
        <Text style = {styles.txtContent}>PHIM NHƯ SỐNG | SỐNG NHƯ PHIM</Text>
    </View>
  )
}

export default SplashScreen2

const styles = StyleSheet.create({
    imgBackground:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#18191A',
    },

    logo:{
      width:  '100%',
      height: '30%',
    },

    txtTitle:{
        color: '#E38025',
        fontSize: 34,
        fontFamily: 'Kanit',
        fontWeight: 'bold',
    },

    txtContent:{
        color: '#E38025',
        fontSize: 14,
        fontFamily: 'Kanit',
        fontWeight: 'bold',
    },
})