import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const PayMode = () => {
    return (
        <SafeAreaView style={styles.savContainer}>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <Image
                        style={styles.albIcon}
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/PayMode%2FArrow%20Left%20Button.png?alt=media&token=91c4d260-60fa-4c5d-a89e-abe32366220d&_gl=1*1cjwjmx*_ga*MzE0OTk3MTQxLjE2OTcyNzI0ODQ.*_ga_CW55HF8NVT*MTY5Nzg3NjQ1OS4zLjEuMTY5Nzg3NzI0MS42MC4wLjA.' }}>
                    </Image>
                    <Text style={styles.titleLabel}>Summary Transactions</Text>
                </View>
                <View style={styles.contentContainer}>
                    <Image
                        style={styles.logoCV}
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/PayMode%2FLogoCV.png?alt=media&token=6bb7b504-fd7b-4968-8aac-ebecfb435d63&_gl=1*jhw16y*_ga*MzE0OTk3MTQxLjE2OTcyNzI0ODQ.*_ga_CW55HF8NVT*MTY5Nzg3NjQ1OS4zLjEuMTY5Nzg3ODUxMy42MC4wLjA.' }}>
                    </Image>
                    <Text style={styles.cvLabel}>CinematicVoyage</Text>
                    <Text style={styles.payLabel}>Thanh toán 07-06-2023</Text>
                    <Text style={styles.priceLabel}>200.000đ</Text>
                </View>
                <View style={styles.footerContainer}>
                    <Text style={styles.choosePaymentLabel}>Chọn hình thức thanh toán</Text>
                    <View style={styles.paymentContainer}>
                        <Image
                            style={styles.zaloPayIcon}
                            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/PayMode%2FZaloPayIcon.png?alt=media&token=5653f82c-af69-4ff5-a00a-bdee0ec8a791&_gl=1*8p6l59*_ga*MzE0OTk3MTQxLjE2OTcyNzI0ODQ.*_ga_CW55HF8NVT*MTY5Nzg3NjQ1OS4zLjEuMTY5Nzg3OTg2NS42MC4wLjA.' }}>
                        </Image>

                        <View style={{ marginLeft: 13, marginVertical: 22.5 }}>
                            <Text style={styles.zaloPayLabel}>ZaloPay</Text>
                            <Text style={styles.price}>200.000đ</Text>
                        </View>
                        <Image
                            style={styles.dropDownIcon}
                            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/PayMode%2FDropDown.png?alt=media&token=6e5228c4-ce51-4108-873f-a31415ea0ea6&_gl=1*199fq2s*_ga*MzE0OTk3MTQxLjE2OTcyNzI0ODQ.*_ga_CW55HF8NVT*MTY5Nzg4MjQyNC40LjEuMTY5Nzg4MzE0Ny4xMC4wLjA.' }}>
                        </Image>
                    </View>
                    <TouchableOpacity style={styles.paymentButton}>
                        <Text style={styles.labelButton}>Thanh toán</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PayMode

const styles = StyleSheet.create({
    labelButton: {
        color: '#D9D9D9',
        fontSize: 17,
        fontWeight: '600',
    },

    paymentButton: {
        width: '85%',
        height: 60,
        backgroundColor: '#E38025',
        marginHorizontal: 29,
        borderRadius: 5,
        marginTop: 19,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24
    },

    dropDownIcon: {
        width: 32,
        height: 32,
        position: 'absolute',
        top: 33,
        right: 24.13
    },

    price: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 0.24,

    },

    zaloPayLabel: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '600',
        letterSpacing: -0.2,
        marginBottom: 1
    },

    zaloPayIcon: {
        width: 44,
        height: 44,
        borderColor: 50,
        marginLeft: 21,
        marginTop: 26
    },

    paymentContainer: {
        width: '85%',
        height: 95,
        backgroundColor: '#757575',
        borderRadius: 20,
        marginHorizontal: 31,
        marginTop: 33,
        flexDirection: 'row',
        position: 'relative'
    },

    choosePaymentLabel: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '600',
        letterSpacing: -0.2,
        marginTop: 22,
        marginLeft: 38
    },

    footerContainer: {
        width: '100%',
        backgroundColor: '#62656A',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },

    priceLabel: {
        color: '#FFF',
        fontSize: 36,
        fontWeight: '500',
        letterSpacing: 0.54,
        marginTop: 43,
        marginBottom: 126
    },

    payLabel: {
        color: '#976504',
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: -0.16
    },

    cvLabel: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: '600',
        letterSpacing: -0.24,
        marginTop: 19
    },

    logoCV: {
        width: 164,
        height: 169,
        marginTop: 23
    },

    contentContainer: {
        width: '100%',
        alignItems: 'center'
    },

    titleLabel: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '600',
        letterSpacing: -0.2,
        marginTop: 20,
        marginLeft: 22
    },

    albIcon: {
        width: 44,
        height: 44,
        borderRadius: 50,
        marginVertical: 11,
        marginLeft: 21
    },

    headerContainer: {
        width: '100%',
        flexDirection: 'row'
    },

    savContainer: {
        flex: 1,
        backgroundColor: '#18191A'
    }
})