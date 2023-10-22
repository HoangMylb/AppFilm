import {
    StyleSheet, Text, View,
    SafeAreaView, ScrollView,
    TouchableOpacity, Image
} from 'react-native'
import React from 'react'

const PayLosing = () => {
    return (
        <SafeAreaView style={styles.savContainer}>
            <ScrollView>
                <View style={styles.articleContainer}>
                    <Image
                        style={styles.articleImg}
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/PaySuccess%2FContent.png?alt=media&token=993fe712-8135-4cda-b646-ce73a361e53e&_gl=1*6y7f21*_ga*MzE0OTk3MTQxLjE2OTcyNzI0ODQ.*_ga_CW55HF8NVT*MTY5Nzk2MzQ1Ny41LjEuMTY5Nzk2NDMyNC41NC4wLjA.' }}>
                    </Image>
                    <View style={styles.contentContainer}>
                        <Image
                            style={styles.successImg}
                            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/PayLosing%2FLosing.png?alt=media&token=b2597b31-08a9-42f4-9edc-52a85eb65568&_gl=1*bwlamy*_ga*MzE0OTk3MTQxLjE2OTcyNzI0ODQ.*_ga_CW55HF8NVT*MTY5Nzk3MTM2MS43LjEuMTY5Nzk3MTQwNy4xNC4wLjA.' }}>
                        </Image>
                        <Text style={styles.successLabel}>Thất bại !</Text>
                        <Text style={styles.paymentSuccessLabel}>Bạn đã thanh toán thất bại cho CinematicVoyage</Text>
                        <Text style={styles.totalPaymentLabel}>Tổng thanh toán</Text>
                        <Text style={styles.priceLabel}>200.000đ</Text>
                    </View>
                    <View style={styles.bottomContainer}>
                        <Text style={styles.paymentFor}>Thanh toán cho</Text>
                        <View style={styles.bottomContent}>
                            <Image
                                style={styles.CVImg}
                                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/PaySuccess%2FCV.png?alt=media&token=33a5da51-c961-4a6d-b1c3-160fcd63aded&_gl=1*1vv7djk*_ga*MzE0OTk3MTQxLjE2OTcyNzI0ODQ.*_ga_CW55HF8NVT*MTY5Nzk2ODI2MC42LjAuMTY5Nzk2ODI2MC42MC4wLjA.' }}>
                            </Image>
                            <View style={{
                                marginTop: 10
                            }}>
                                <Text style={styles.CVLabel}>CinematicVoyage</Text>
                                <Text style={styles.paymentLabel}>Thanh toán 07-06-2023</Text>
                            </View>
                            <Text style={styles.timeLabel}>4:08 PM</Text>
                        </View>
                        <TouchableOpacity style={styles.doneButton}>
                            <Text style={styles.doneLabel}>Thanh toán lại</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PayLosing

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
        lineHeight: 22.4,
        letterSpacing: -0.16
    },

    CVImg: {
        width: 49,
        height: 50,
        top: 8
    },

    bottomContent: {
        width: '100%',
        height: 65,
        backgroundColor: '#757575',
        marginTop: 3,
        borderRadius: 10,
        flexDirection: 'row',
        position: 'relative'
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
        top: '67.5%',
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
        lineHeight: 28,
        letterSpacing: -0.2,
        marginTop: 24
    },

    successImg: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 60
    },

    contentContainer: {
        width: '60%',
        position: 'absolute',
        alignItems: 'center',
    },

    articleImg: {
        width: '85%',
        height: 720,
        marginHorizontal: 34,
        marginTop: -75,
        resizeMode: 'cover',
        position: 'relative'
    },

    articleContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 120
    },

    savContainer: {
        flex: 1,
        backgroundColor: '#0E0E0E'
    }
})