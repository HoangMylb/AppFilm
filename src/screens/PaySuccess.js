import {
    StyleSheet, Text, View,
    SafeAreaView, ScrollView,
    TouchableOpacity, Image
} from 'react-native'

import React,{useState,useEffect} from 'react'
import { StackActions } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
const PaySuccess = ({navigation}) => {
    const route = useRoute();
   
    const tien = route.params.tien;
    const ngay = route.params.ngay;
    const nextTo = async () => {
        navigation.dispatch(StackActions.replace('Home'));
      };
      
    return (
        <SafeAreaView style={styles.savContainer}>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <Image
                        style={styles.congratsImg}
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/PaySuccess%2FCongratulations.png?alt=media&token=c3c572b9-a7fb-4dec-a25f-a8fc99bf3801&_gl=1*59nw0n*_ga*MzE0OTk3MTQxLjE2OTcyNzI0ODQ.*_ga_CW55HF8NVT*MTY5Nzk2MzQ1Ny41LjEuMTY5Nzk2NDAxNi42MC4wLjA.' }}>
                    </Image>
                </View>
                <View style={styles.articleContainer}>
                    <Image
                        style={styles.articleImg}
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/PaySuccess%2FContent.png?alt=media&token=993fe712-8135-4cda-b646-ce73a361e53e&_gl=1*6y7f21*_ga*MzE0OTk3MTQxLjE2OTcyNzI0ODQ.*_ga_CW55HF8NVT*MTY5Nzk2MzQ1Ny41LjEuMTY5Nzk2NDMyNC41NC4wLjA.' }}>
                    </Image>
                    <View style={styles.contentContainer}>
                        <Image
                            style={styles.successImg}
                            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/PaySuccess%2FSuccess.png?alt=media&token=524cd1bf-4e2e-4800-9572-4938fb92290e&_gl=1*j46wp6*_ga*MzE0OTk3MTQxLjE2OTcyNzI0ODQ.*_ga_CW55HF8NVT*MTY5Nzk2MzQ1Ny41LjEuMTY5Nzk2NjI1Mi42MC4wLjA.' }}>
                        </Image>
                        <Text style={styles.successLabel}>Thành công !</Text>
                        <Text style={styles.paymentSuccessLabel}>Bạn đã thanh toán thành công cho CinematicVoyage</Text>
                        <Text style={styles.totalPaymentLabel}>Tổng thanh toán</Text>
                        <Text style={styles.priceLabel}>{tien}đ</Text>
                    </View>
                    <View style={styles.bottomContainer}>
                       
                        <View style={styles.bottomContent}>
                            <View style={{
                                marginTop: 10
                            }}>
                                <Text style={styles.CVLabel}>CinematicVoyage</Text>
                                <Text style={styles.paymentLabel}>Thanh toán {ngay}</Text>
                            </View>
                            
                        </View>
                        <TouchableOpacity onPress={nextTo} style={styles.doneButton}>
                            <Text style={styles.doneLabel}>Hoàn thành</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PaySuccess

const styles = StyleSheet.create({
    doneLabel: {
        color: '#D9D9D9',
        fontSize: 13,
        fontWeight: '600'
    },

    doneButton: {
        marginTop: 9,
        height: 32,
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E38025',
        borderRadius: 10,
        marginHorizontal: 25,
    },

    timeLabel: {
        position: 'absolute',
        color: '#976504',
        fontSize: 11,
        fontWeight: '400',
        lineHeight: 15.4,
        letterSpacing: -0.11,
        right: 5
    },

    paymentLabel: {
        color: '#976504',
        fontSize: 11,
        fontWeight: '400',
        lineHeight: 15.4,
        letterSpacing: -0.11
    },

    CVLabel: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
       alignSelf:'center'
    },

    CVImg: {
        width: 49,
        height: 50,
        top: 8
    },

    bottomContent: {
        width: '100%',
        height: 65,
        backgroundColor: '#C0C0C0',
        marginTop: 3,
        borderRadius: 10,
        flexDirection: 'row',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },

    paymentFor: {
        color: '#62656A',
        fontSize: 13,
        fontWeight: '600',
        lineHeight: 18.2,
        letterSpacing: -0.13,
        marginLeft: 10
    },

    bottomContainer: {
        width: '60%',
        height: 100,
        position: 'absolute',
        top: '73.5%',
    },

    priceLabel: {
        color: '#000',
        fontSize: 36,
        fontWeight: '500',
        letterSpacing: 0.54,
        marginTop: 3,
        marginBottom: 100
    },

    totalPaymentLabel: {
        color: '#62656A',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16.8,
        letterSpacing: -0.12,
        marginTop: 17
    },

    paymentSuccessLabel: {
        color: '#62656A',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16.8,
        letterSpacing: -0.12,
        marginTop: 3,
        textAlign: 'center'
    },

    successLabel: {
        color: '#000',
        fontSize: 20,
        fontWeight: '600',
        marginTop: 24
    },

    successImg: {
        width: 100,
        height: 100,
        borderRadius: 50,
    
    },

    contentContainer: {
        width: '60%',
        position: 'absolute',
        alignItems: 'center',
    },

    articleImg: {
        width: '95%',
        height: 520,
        marginHorizontal: 34,
        marginTop: -50,
        resizeMode: 'cover',
        position: 'relative'
    },

    articleContainer: {
        width: '100%',
        alignItems: 'center'
    },

    congratsImg: {
        width: '100%',
        height: 80,
        resizeMode: 'cover',
        backgroundColor: '#000000'
    },

    headerContainer: {
        width: '100%'
    },

    savContainer: {
        flex: 1,
        backgroundColor: '#0E0E0E'
    }
})