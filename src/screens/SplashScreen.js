import { Image, ImageBackground, StyleSheet, Text, View,} from 'react-native'
import React, { useEffect } from 'react';

const SplashScreen = (props) => {
    const {navigation} = props;

    useEffect(() => {
        setTimeout(() => {
          navigation.navigate('Login');
        }, 1000); // Chuyển đến màn hình Login sau 3 giây
      }, []);
  return (
    <View style = {styles.imgBackground}>
       <Image style = {styles.logo}
        source={{uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/logoSplash.png?alt=media&token=1ed723d7-8096-4ef5-b53e-26dacf21644a'}} 
        />
        <Text style = {styles.txtTitle}>CinematicVoyage</Text>
        <Text style = {styles.txtContent}>PHIM NHƯ SỐNG | SỐNG NHƯ PHIM</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    imgBackground:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CF9B9B',
    },

    logo:{
      width:  '100%',
      height: '30%',
    },

    txtTitle:{
        color: '#D65555',
        fontSize: 34,
        fontFamily: 'Kanit',
        fontWeight: 'bold',
    },

    txtContent:{
        color: '#D65555',
        fontSize: 14,
        fontFamily: 'Kanit',
        fontWeight: 'bold',
    },
})